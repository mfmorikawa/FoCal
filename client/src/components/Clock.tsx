import { useState } from "react";

export default function Clock({ n_minutes }: { n_minutes: number }) {
  const [minutes, setMinutes] = useState<number>(n_minutes);
  const [seconds, setSeconds] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const startClock = () =>
    setTimeout(() => {
      if (!complete) {
        if (seconds === 0) {
          if (minutes === 0) {
            setComplete(true);
            return;
          }
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          setSeconds(seconds - 1);
        }
      } else return;
    }, 1000);
  startClock();
  return (
    <div className="grid grid-cols-2 bg-slate-800 bg-gradient-to-r from-black p-2 rounded-md shadow-2xl">
      <div className="col-span-2 text-7xl text-white bg-indigo-400 bg-gradient-to-r from-blue-400 m-2 py-2 px-10 h-24 font-extrabold grid grid-cols-5 rounded-md">
        <div className="col-span-2 text-right">
          {minutes < 10 ? `0${minutes}` : minutes}
        </div>
        <div className="col-span-1 text-center">:</div>
        <div className="col-span-2 text-left">
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>
      <button
        className="flex-row bg-green-600 text-3xl text-white font-bold p-4 rounded-md text-center m-2"
        onClick={() => {
          setComplete(false);
          startClock();
        }}
      >
        START
      </button>
      <button
        className="flex-col bg-red-700 text-3xl text-white font-bold p-4 rounded-md text-center m-2"
        onClick={() => setComplete(true)}
      >
        STOP
      </button>
    </div>
  );
}
