import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Project } from "../vite-env";
import Progress from "./Progress";

export default function ProjectContainer({project}: { project: Project}) {
  const { tasks } = project;

  function calculateCompleted(): number {
    let totalCompleted = 1;
    for (const task of tasks) {
      if (task.resource && task.resource.isComplete) totalCompleted++;
    }
    return totalCompleted;
  }
  const [showMilestones, setShowMilestones] = useState(false);
  const [showTasks, setShowTasks] = useState(true);

  return (
      <div className="p-4 rounded-md text-white bg-slate-700 shadow-2xl m-1">
        <h2 className="font-bold text-center mb-2">{project.name}</h2>
        <section>
          <h3 className="mb-1">Progress</h3>
          <Progress done={project.progress} />
        </section>
        <section className="grid grid-cols-3">
          <h3 className="col-span-2">Milestones</h3>
          <button className="text-right px-6">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </section>
        <section className="grid grid-cols-3">
          <h3 className="col-span-2">Tasks</h3>
          <button
            className="text-right px-6"
            onClick={() => setShowTasks(!showTasks)}
          >
            {showTasks ? (
              <FontAwesomeIcon icon={faAngleDown} />
            ) : (
              <FontAwesomeIcon icon={faAngleRight} />
            )}
          </button>
          {showTasks ? (
            <div className="col-span-3 p-2">
              {tasks.map((task) => {
                return (
                  <div className="p-2 font-bold mb-1 bg-black rounded-md">
                    {task.title}
                  </div>
                );
              })}
            </div>
          ) : (
            <br />
          )}
        </section>
      </div>
  );
}
