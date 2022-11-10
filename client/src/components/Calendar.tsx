import { useMemo, useCallback } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  SlotInfo,
} from "react-big-calendar";
import TaskList from "../features/tasks/TaskList";
import currentTask from "../features/tasks/selectedTask";
import { Task } from "../vite-env";
import {
  createTask,
  removeTask,
  updateTask,
  setSelected,
} from "../features/tasks/tasksSlice";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";
// default styles for DnD Calendar
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppDispatch } from "../app/hooks";
import { nanoid } from "@reduxjs/toolkit";
/* 
  constructs necessary for calendar and timekeeping
*/
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 1);
const CalendarComponent = withDragAndDrop(BigCalendar);
/*
  Calendar Container Component
  TODO: Add information, create, and delete modals (or combine into one?)
  TODO: Type the props
*/
export default function Calendar(props: any) {
  // props & state constants
  const { height, defaultView } = props;
  const dispatch = useAppDispatch();
  const task = currentTask();
  const tasks = TaskList();
  // TODO: refactor so that these come from props
  const { views } = useMemo(
    () => ({
      views: {
        day: true,
        week: true,
        month: true,
      },
    }),
    []
  );
  // calendar event handlers
  const handleSelectSlot = useCallback(({ start }: SlotInfo) => {
    const end = addHours(start, 1);
    const title = String(window.prompt("New Task name"));
    dispatch(
      createTask({
        title,
        start,
        end,
        resource: {
          ObjectID: nanoid(8),
          projectID: "0000",
          isComplete: false,
        },
        allDay: false,
      })
    );
  }, []);
  const handleSelectEvent = useCallback(
    (task: Task) => {
      dispatch(setSelected(task));
    },
    [task]
  );
  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { event, start, end } = data;
    dispatch(
      updateTask({ cur: event, start: new Date(start), end: new Date(end) })
    );
  };
  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const { event, start, end } = data;
    dispatch(
      updateTask({ cur: event, start: new Date(start), end: new Date(end) })
    );
  };
  // rendered components
  return (
    <CalendarComponent
      localizer={localizer}
      defaultView={defaultView}
      views={views}
      events={tasks}
      onSelectSlot={handleSelectSlot}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      onSelectEvent={handleSelectEvent}
      selectable
      resizable
      style={{ height: height, margin: 20 }}
      step={5}
      timeslots={12}
      defaultDate={new Date(2022, 9, 26)}
      popup={true}
    />
  );
}
