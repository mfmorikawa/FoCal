/// <reference types="vite/client" />
import { TaskAbortError } from "@reduxjs/toolkit";
import Event from "react-big-calendar";

export type ImageDescriptorProps = {
    url: string;
    alt_text: string;
}

export interface Task extends Event {
    ObjectID: string,
    isComplete: boolean,
    description: string
}