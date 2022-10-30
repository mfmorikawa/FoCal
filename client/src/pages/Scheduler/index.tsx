import { addHours } from "date-fns";
import { useCallback } from "react";
import { View, Views } from "react-big-calendar";
import { useAppDispatch } from "../../app/hooks";
import Calendar from "../../components/Calendar";
import { createTask } from "../../features/tasks/tasksSlice";

export default function Scheduler() {
  const height = 700;
  const defaultView: View = Views.WEEK;
  const dispatch = useAppDispatch();
  const handleAddTask = useCallback(
      () => {
        const start = new Date(String(window.prompt("Start Date:")));
        console.log(start);
        const end = addHours(start, 1);
        const title = String(window.prompt("New Task name"));
        dispatch(createTask({ title, start, end, allDay: false }));
      },
      []
  );
  return (
    <>
      <div className="min-h-full grid pt-2 place-items-end">
        <button type="button" className="btn-blue" onClick={ (e) => {
          e.preventDefault();
          handleAddTask 
        }}>
          {"Add Task"}
        </button>
        <main className="calendar-container">
          <Calendar 
            height={height}
            defaultView={defaultView} 
          />
        </main>
      </div>
    </>
  );
}