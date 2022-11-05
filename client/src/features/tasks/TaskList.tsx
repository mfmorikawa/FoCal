import { useAppSelector } from "../../app/hooks";
import { selectTasks } from "./tasksSlice";
import { Task } from '../../vite-env';

export default function TasksList() {
    const tasks: Task[] = useAppSelector(selectTasks);
    return tasks;
};
