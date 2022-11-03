import { useAppSelector } from "../../app/hooks";
import { Task, selectTasks } from "./tasksSlice";

export default function TasksList() {
    const tasks: Task[] = useAppSelector(selectTasks);
    return tasks;
};
