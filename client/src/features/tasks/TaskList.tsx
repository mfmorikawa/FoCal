import { useAppSelector } from "../../app/hooks";
import { selectTasks } from "./tasksSlice";
import { Event as Task } from "react-big-calendar";

export default function TasksList() {
    const tasks: Task[] = useAppSelector(selectTasks);
    return tasks;
};
