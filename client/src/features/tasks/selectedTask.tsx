import { useAppSelector } from "../../app/hooks";
import { selectedTask } from "./tasksSlice";
import { Task } from "../../vite-env";

export default function currentTask() {
  const task: Task | undefined = useAppSelector(selectedTask);
  return task;
}
