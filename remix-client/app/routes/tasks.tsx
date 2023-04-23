import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    taskListItems: await db.task.findMany({
      orderBy: { createdAt: "asc"},
      select: { id: true, title: true },
      take: 5,
    }),
  });
};

export default function TasksRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="container">
      <header className="card">
        <div className="container">
          <h1>
            <Link to="/" title="Tasks" aria-label="Tasks">
              <span>Home</span>
            </Link>
          </h1>
        </div>
      </header>
      <h1>Tasks:</h1>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.taskListItems.map(({ id, title }) => (
                <li key={id}>
                  <Link to={id}>{title}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <article>
            <Outlet />
          </article>
        </div>
      </main>
    </div>
  );
}
