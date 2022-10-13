import { useAppSelector } from "../../app/hooks";
import { selectTasks, Task } from "./tasksSlice";

export default function TasksList() {
    const tasks: Task[] = useAppSelector(selectTasks);
    const renderableTasks = tasks.map(task => task.eventObject);
    return renderableTasks;
};
