import { useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Event,
  stringOrDate,
} from "react-big-calendar";
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

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Task from "../vite-env";
type Task = typeof Task;

const locales = {
  "en-US": enUS,
};

const t1 = {
  title: 'title',
  start: new Date(),
  end: new Date(),
  ObjectID: "ID",
  isComplete: false,
  description: "this is the description."
};

function createTask(task: Task){
  
}

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
const FullCalendar = withDragAndDrop(BigCalendar);

const testEvents = [
  {
    title: "Operating Systems",
    start: new Date(2022, 8, 19, 11, 30),
    end: new Date(2022, 8, 19, 12, 50),
  },
  {
    title: "Python Programming",
    start: new Date(2022, 8, 19, 18),
    end: new Date(2022, 8, 19, 19, 50),
  },
  {
    title: "Software Engineering",
    start: new Date(2022, 8, 20, 15),
    end: new Date(2022, 8, 20, 16, 50),
  },
];

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>(testEvents);
  const moveEvent = (event: Event, start: stringOrDate, end: stringOrDate) => {
    setEvents((currentEvents: Event[]) => {
      const index = currentEvents.indexOf(event);
      currentEvents.splice(index, 1);
      const updatedEvent = {
        title: event.title,
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, updatedEvent];
    });
  };
  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { event, start, end } = data;
    moveEvent(event, start, end);
  };
  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const { event, start, end } = data;
    moveEvent(event, start, end);
  };
  return (
    <>
      <FullCalendar
        localizer={localizer}
        events={events}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: 600, margin: 50 }}
      />
    </>
  );
}
