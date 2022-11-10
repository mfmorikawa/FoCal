import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { addHours, formatISO } from "date-fns";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { View, Views } from "react-big-calendar";
import { useAppDispatch } from "../../app/hooks";
import Calendar from "../../components/Calendar";
import { createTask } from "../../features/tasks/tasksSlice";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DatePicker from "gestalt-datepicker";

export default function Scheduler() {
  const height = 750;
  const defaultView: View = Views.WEEK;
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [showStart, setShowStart] = useState(true);
  const [showEnd, setShowEnd] = useState(false);
  const [title, setTitle] = useState<string|undefined>()
  const startDateInput = useRef(null);
  const endDateInput = useRef(null);
  const [creatOpen, setCreateOpen] = useState(false);
  const [formComplete, setFormComplete] = useState(false); 
  // const result: string = formatISO(startDate || new Date());

  useEffect(() => {
    if (!formComplete) return;
    setFormComplete(false);
    const start = startDate;
    const end = endDate;

    const sTime: string[] = startTime?.split(":");
    const sMinutes = Number(sTime[1]);
    const sHours = Number(sTime[0]);
    start.setHours(sHours, sMinutes);
    
    const eTime: string[] = endTime.split(":");
    const eMinutes = Number(eTime[1]);
    const eHours = Number(eTime[0]);
    end.setHours(eHours, eMinutes);
    console.log(startDate, endDate);
    console.log(start, end);
    
    dispatch(createTask({ title, start, end, allDay: false }));
  }, [endTime]);
  return (
    <>
      <div className="h-full">
        <Transition.Root show={creatOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setCreateOpen(false);
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <div className="h-full bg-slate-50 py-6 shadow-2xl">
                        <div className="px-4 sm:px-6">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Task Details
                          </Dialog.Title>
                          <div className="pt-4 pr-2 sm:pr-4 fixed top-0 right-0">
                            <button
                              type="button"
                              className="rounded-md font-bold hover:text-white focus:outline-none focus:ring-2 focus:ring-white text-red-600"
                              onClick={() => {
                                setCreateOpen(false);
                                setShowEnd(false);
                              }}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div
                              className="grid grid-cols-1 h-full border-2 border-dashed border-gray-200 text-right"
                              aria-hidden="true"
                            >
                              <Transition
                                show={showStart}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <div className="mb-2 p-4 font-bold">
                                  <label htmlFor="time">Title </label>
                                  <input 
                                    className="rounded-md border-blue-500" 
                                    type="text" 
                                    name="title"
                                    required={true}
                                    onChange={(e)=>{
                                      setTitle(e.target.value);
                                    }}
                                  />
                                </div>
                                <DatePicker
                                  rangeStartDate={startDate}
                                  rangeEndDate={endDate}
                                  id="example-start-date"
                                  label="Start Date"
                                  nextRef={endDateInput}
                                  onChange={({ value }) => {
                                    setStartDate(value);
                                  }}
                                  rangeSelector="start"
                                  value={startDate}
                                  ref={startDateInput}
                                />
                                <div className="mt-96 p-4 font-bold">
                                  <label htmlFor="time">Start Time </label>
                                  <input 
                                    className="rounded-md border-blue-500" 
                                    type="time" 
                                    name="time"
                                    required={true}
                                    onChange={(e)=>{
                                      setStartTime(e.target.value);
                                    }}
                                  />
                                  <button className="mx-5 rounded-md bg-blue-800 h-12 px-4 py-2 font-bold text-white hover:opacity-70"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (!title) {
                                        alert('title required');
                                        return;
                                      }
                                      setShowStart(false);
                                      setShowEnd(true);
                                    }}
                                  >
                                    Next
                                  </button>
                                </div>
                              </Transition>
                              <Transition
                                show={showEnd}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <DatePicker
                                  rangeStartDate={startDate}
                                  rangeEndDate={endDate}
                                  id="example-end-date"
                                  label="End Date"
                                  nextRef={startDateInput}
                                  onChange={({ value }) =>
                                    setEndDate(value)
                                  }
                                  rangeSelector="end"
                                  value={endDate}
                                  ref={endDateInput}
                                />
                                <div className="mt-96 p-4 font-bold">
                                  <label htmlFor="time">End Time </label>
                                  <input 
                                    className="rounded-md border-blue-500" 
                                    type="time"
                                    name="time"
                                    required={true}
                                    onChange={(e)=>{
                                      setFormComplete(true);
                                      setEndTime(e.target.value);
                                    }}
                                  />
                                  <button 
                                    className="mx-5 rounded-md bg-blue-800 h-12 px-4 py-2 font-bold text-white hover:opacity-70"
                                    type="submit"
                                    onClick={(e) => {
                                      setShowEnd(!showEnd);
                                      setCreateOpen(false);
                                    }}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </Transition>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="p-4 h-20 shadow-lg rounded-lg">
          <h1 className="text-4xl p-2 text-slate-400 ">Task Scheduler</h1>
          <button
            type="button"
            className="btn-blue"
            onClick={(e) => {
              e.preventDefault();
              setCreateOpen(true);
              setShowStart(true);
            }}
          >
            {"Add Task\n"}
            <FontAwesomeIcon icon={faCalendarPlus} />
          </button>
        </div>

        <main className="calendar-container">
          <Calendar height={height} defaultView={defaultView} />
        </main>
      </div>
    </>
  );
}
