/// <reference types="vite/client" />
import { Event } from "react-big-calendar";

export type ImageDescriptorProps = {
    url: string;
    alt_text: string;
}

export type Task = Event;

export type TaskResource = {
  ObjectID: string | undefined;
  projectID: string | undefined;
  isComplete: boolean;
};

export type TaskSliceState = {
  tasks: Task[];
  selected?: Task;
};