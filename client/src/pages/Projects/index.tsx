import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import TasksList from "../../features/tasks/TaskList";
import { Project, ImportantDate } from "../../vite-env";

export default function Projects() {
  const Tasks = TasksList();
  const project: Project = {
    projectID: nanoid(8),
    name: "No Projects",
    taskList: Tasks,
    importantDates: new Array<ImportantDate>,
    deadline: "none"
  };

  function calculateCompleted(): number {
    let totalCompleted = 0;
    for (const task of Tasks) {
      if (task.resource && task.resource.isComplete)
        totalCompleted++;
    }    
    return totalCompleted;
  }
  const [taskProgress, setTaskProgress] = useState((): number =>{
    return calculateCompleted() / Tasks.length;
  });
  const [showMilestones, setShowMilestones] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  return (
    <div className="p-4 grid grid-cols-3 h-fit">
      <div className="p-4 rounded-md text-white bg-green-500 h-36 shadow-2xl">
        <h2 className="font-bold text-center mb-2">{project.name}</h2>
        <section className="grid grid-cols-3">
          <h3>Progress:</h3>
          <div className="col-span-2 text-right px-6">{taskProgress}</div>
        </section>
        <section className="grid grid-cols-3">
          <h3 className="col-span-2">
            Milestones: 
          </h3>
          <button className="text-right px-6">
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </section>
        <section className="grid grid-cols-3">
        <h3 className="col-span-2">
            Tasks: 
          </h3>
          <button className="text-right px-6">
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </section>
      </div>
    </div>
  );
}
