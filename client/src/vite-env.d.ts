/// <reference types="vite/client" />
import { Event, View } from "react-big-calendar";

export type ImageDescriptorProps = {
  url: string;
  alt_text: string;
};

export type TaskResource = {
  ObjectID?: string;
  projectID?: string;
  isComplete: boolean;
};

export interface Task extends Event {
  resource?: TaskResource;
}

export type TaskSliceState = {
  tasks: Task[];
  selected?: Task;
};

// Prop Typyings
export interface SchedulerProps extends ReactProps {
  height: number;
  defaultView: View;
}

export type ImportantDate = {
  name: string;
  dateId: string;
  projectID: string;
  date: Date | string;
}

export type Project = {
  projectID: string;
  name: string;
  taskList: Task[];
  deadline: Date | string;
  importantDates: Array<ImportantDate>;
};

export type ProjectSliceState = {
  projects: Project[];
};
