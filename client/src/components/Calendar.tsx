import {
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Event as Task,
  SlotInfo,
  Views,
  stringOrDate
} from "react-big-calendar";
import TaskList from '../features/tasks/TaskList';
import { createTask, removeTask, TaskResource, updateTask } from '../features/tasks/tasksSlice';
import withDragAndDrop, { 
  withDragAndDropProps
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

// construccts necessary for calendar and timekeeping
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

export interface heightProp {
  height: number
}

//Calendar Page
export default function Calendar(prop: heightProp) {
  const dispatch = useAppDispatch();
  const [selectedEvent, setSelectedEvent] = useState<Task>();

  const deleteEvent = (task: Task) => {
    dispatch(removeTask(task));
  };

  const handleSelectSlot = useCallback(
    ({ start }: SlotInfo) => {
      const end = addHours(start, 1);
      const title = String(window.prompt("New Task name"));
      dispatch(createTask({ 
        title,
        start,
        end,
        resource: {
          isComplete: false
        },
        allDay: false
      }));
    },
    []
  );

  // const handleSelectEvent = useCallback(
  //   (event: Event) => {
  //     setOpen(true);
  //   }, [updateEvent]
  // );

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { event, start, end } = data;
    dispatch(updateTask({cur: event, start: new Date(start), end: new Date(end)}));
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const { event, start, end } = data;
    dispatch(updateTask({cur: event, start: new Date(start), end: new Date(end)}));
  };

  const { views } = useMemo(
    () => ({
      views: {
        week: true,
        month: true
      },
    }),
    []
  );
  
  const tasks = TaskList();

  return (
      <CalendarComponent
        localizer={localizer}
        defaultView={Views.MONTH}
        views={views}
        events={tasks}
        onSelectSlot={handleSelectSlot}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        selectable
        resizable
        style={{ height: prop.height, margin: 50 }}
        step={5}
        timeslots={12}
        defaultDate={new Date(2022, 9, 20)}
      />
  );
}
  