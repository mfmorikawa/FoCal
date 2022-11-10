import { formatISO } from "date-fns";
import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DatePicker from "gestalt-datepicker";
import "gestalt-datepicker/dist/gestalt-datepicker.css";

const Focus = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const endDateInput = useRef(null);
  const startDateInput = useRef(null);
  const [open, setOpen] = useState<boolean>(true);
  const result: string = formatISO(startDate || new Date());

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div
                            className="h-full border-2 border-dashed border-gray-200"
                            aria-hidden="true"
                          >
                            <DatePicker
                              rangeStartDate={startDate}
                              rangeEndDate={endDate}
                              id="example-start-date"
                              label="Check In"
                              nextRef={endDateInput}
                              onChange={({ event, value }) => {
                                setStartDate(value);
                              }}
                              rangeSelector="start"
                              value={startDate}
                              ref={startDateInput}
                            />
                            <hr className=" mt-2 pb-80" />
                            <DatePicker
                              rangeStartDate={startDate}
                              rangeEndDate={endDate}
                              id="example-end-date"
                              label="Check Out"
                              nextRef={startDateInput}
                              onChange={({ event, value }) => setEndDate(value)}
                              rangeSelector="end"
                              value={endDate}
                              ref={endDateInput}
                            />
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
    </div>
  );
};

export default Focus;
