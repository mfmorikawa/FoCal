import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import TasksList from "../../features/tasks/TaskList";
import { Project, ImportantDate } from "../../vite-env";
import Progress from "../../components/Progress";

export default function Projects() {
  const Tasks = TasksList();
  const project: Project = {
    projectID: nanoid(8),
    name: "No Projects",
    username: "oscisn93",
    taskList: Tasks,
    importantDates: new Array<ImportantDate>(),
    deadline: "none",
  };

  function calculateCompleted(): number {
    let totalCompleted = 1;
    for (const task of Tasks) {
      if (task.resource && task.resource.isComplete) totalCompleted++;
    }
    return totalCompleted;
  }
  console.log(Tasks.length);
  const [taskProgress, setTaskProgress] = useState((): number => {
    return Math.floor((calculateCompleted() / Tasks.length)*100);
  });
  const [showMilestones, setShowMilestones] = useState(false);
  const [showTasks, setShowTasks] = useState(true);

  return (
    <div className="p-4 grid grid-cols-3 h-fit">
      <div className="p-4 rounded-md text-white bg-slate-700 shadow-2xl">
        <h2 className="font-bold text-center mb-2">{project.name}</h2>
        <section>
          <h3 className="mb-1">Progress</h3>
          <Progress done={taskProgress} />
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
              {Tasks.map((task) => {
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
    </div>
  );
}
