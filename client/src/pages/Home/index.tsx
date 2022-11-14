import Calendar from "../../components/Calendar";
import { View, Views } from "react-big-calendar";

export default function Home() {
  // calendar props
  const height = 500;
  const defaultView: View = Views.DAY;
  return (
    <>
      <div className="h-screen grid col-span-2 pt-2 bg-indigo-100">
        <section className="sm:w-full md:w-1/3 sm:h-1/3 h-1/2 ">
          <div className="rounded-md mx-2 pt-2 calendar-container">
            <Calendar height={height} defaultView={defaultView} />
          </div>
        </section>
      </div>
    </>
  );
}
