import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import TasksList from "../../features/tasks/TaskList";
import { Project, ImportantDate } from "../../vite-env";
import Progress from "../../components/Progress";
import { projects } from "../../features/api/projects";
import ProjectContainer from "../../components/ProjectContainer";

export default function Projects() {
  return (
    <div className="p-4 grid grid-cols-3 h-fit">
      {projects.map((project) => (
        <ProjectContainer project={project} />
      ))}
    </div>
  );
}
