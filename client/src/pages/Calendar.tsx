import { useState, useMemo, useCallback } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Event,
  SlotInfo,
  stringOrDate,
  Views,
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
import Modal from "../components/Modal";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


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
const FullCalendar = withDragAndDrop(BigCalendar);
// events and background events
const testEvents = [
  {
    title: "Operating Systems",
    start: new Date(2022, 8, 28, 11, 30),
    end: new Date(2022, 8, 28, 12, 50),
  },
  {
    title: "Python Programming",
    start: new Date(2022, 8, 28, 18),
    end: new Date(2022, 8, 28, 19, 50),
  },
  {
    title: "Software Engineering",
    start: new Date(2022, 8, 29, 15),
    end: new Date(2022, 8, 29, 16, 50),
  },
];
const timeblocks: Event[] = [
  {
    title: "Avalabilty",
    start: new Date(2022, 8, 30, 9, 30),
    end: new Date(2022, 8, 30, 10, 30)
  }
];

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>(testEvents);

  const createEvent = (id=0, title="No title", start = new Date(), end = new Date(), isAllDay=false) => {
    const newEvent = {
      id: id,
      title: title, 
      start: start,
      end: end,
      isAllDay: isAllDay
    }
    setEvents((prev: Event[]) => [...prev, newEvent]);
  }

  const handleSelectSlot = useCallback(
    ({ start, end }: SlotInfo) => {
      const title = String(window.prompt('New Task name'));
      createEvent(1, title, start, end);
    },
    [createEvent]
  );

  const handleSelectEvent = useCallback(
    (task: Event) => console.table({...task}),
    []
  );


  const updateEvent = (event: Event, start: stringOrDate, end: stringOrDate) => {
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
    updateEvent(event, start, end);
  };
  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const { event, start, end } = data;
    updateEvent(event, start, end);
  };


  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      views: {
        week: true,
        month: true
      },
    }), []
  );

  return (
    <>
      <Modal />
      <FullCalendar
        backgroundEvents={timeblocks}
        localizer={localizer}
        defaultView={Views.WEEK}
        views={ views }
        events={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        selectable
        resizable
        style={{ height: 600, margin: 50 }}
        step={5}
        timeslots={6}
      />
    </>
  );
}
