/// <reference types="vite/client" />
import { Event, View } from "react-big-calendar";

export type ImageDescriptorProps = {
    url: string;
    alt_text: string;
}

export type TaskResource = {
  ObjectID: string | undefined;
  projectID: string | undefined;
  isComplete: boolean;
};

export interface Task extends Event {
  resource?: TaskResource
};

export type TaskSliceState = {
  tasks: Task[];
  selected?: Task;
};

// Prop Typyings
export interface SchedulerProps extends ReactProps {
  height: number,
  defaultView: View
}