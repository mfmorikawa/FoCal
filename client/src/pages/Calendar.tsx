import { useState, useMemo, useCallback, useRef, Fragment, useEffect } from "react";
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
// import Modal from "../components/Modal";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

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
const timeblocks: Event[] = [
  {
    title: "Avalabilty",
    start: new Date(2022, 8, 30, 9, 30),
    end: new Date(2022, 8, 30, 10, 30)
  }
];

const indexOfUUID = new Map();
//Calendar Page
export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  // modal state logic
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState({
    title: "None",
    start: new Date(),
    end: new Date()
  });
  const createEvent = (newEvent: Event) => {
    setEvents((prev: Event[]) => [...prev, newEvent]);
  }

  const updateEvent = (event: Event, start: stringOrDate, end: stringOrDate) => {
    if (events)
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

  const deleteEvent = (event: Event) => {
    if (events)
    setEvents((currentEvents: Event[]) => {
      const index = currentEvents.indexOf(event);
      currentEvents.splice(index, 1);
      return [...currentEvents];
    });
  };

  const handleSelectSlot = useCallback(
    ({ start, end }: SlotInfo) => {
      const title = String(window.prompt('New Task name'));
      createEvent({title, start, end, allDay:false});
    },
    [updateEvent]
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      setOpen(true);
    }, [updateEvent]
  );

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
      defaultDate: new Date(2022, 8, 30, 12),
      views: {
        week: true,
        month: true,
        day: true
      },
    }), []
  );
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Delete Task?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this Task?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={
                      () => {
                        deleteEvent(selectedEvent)
                        setOpen(false);
                      }
                    }
                  >
                    Delete Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      </Transition.Root>
      <FullCalendar
        backgroundEvents={timeblocks}
        localizer={localizer}
        defaultView={Views.DAY}
        views={ views }
        events={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        selectable
        resizable
        style={{ height: 700, margin: 50 }}
        step={2}
        timeslots={30}
      />
    </>
  );

                  }