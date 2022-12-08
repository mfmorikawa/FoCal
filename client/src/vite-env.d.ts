/// <reference types="vite/client" />
import { Event, View } from "react-big-calendar";

// taskSlice types
export type TaskResource = {
  taskID?: string;
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

// Prop types
export interface SchedulerProps extends ReactProps {
  height: number;
  defaultView: View;
}

export type ImageDescriptorProps = {
  url: string;
  alt_text: string;
};

export type User = {
  username: string;
  password?: string;
  isLoggedIn: boolean;
}

// ProjectSlice types
export type ImportantDate = {
  name: string;
  date: Date | string;
}

export type Project = {
  projectID?: string;
  name: string;
  username: string;
  tasks: Task[];
  deadline?: Date | string;
  importantDates: Array<ImportantDate>;
  progress: number
};

export type ProjectSliceState = {
  projects: Project[];
};
