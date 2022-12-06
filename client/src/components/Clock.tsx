import { useEffect, useState } from "react";

export default function Clock({ n_minutes }: { n_minutes: number }) {
  const [minutes, setMinutes] = useState<number>(n_minutes);
  const [seconds, setSeconds] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [stopped, setStopped] = useState<boolean>(true);

  function setClock() {
    if (seconds === 0) {
      if (minutes === 0) {
        setComplete(true);
        return;
      }
      setSeconds(59);
      setMinutes(minutes - 1);
    } else setSeconds(seconds - 1);
  }

  useEffect(() => {
    if (!stopped && !complete) {
      setTimeout(() => setClock(), 1000);
    }
  }, [seconds]);

  return (
    <div className="grid grid-cols-2 bg-slate-600 bg-gradient-to-r from-gray-500 p-2 rounded-md shadow-lg font-mono">
      <div className="col-span-2 border-slate-400 border-2 text-8xl text-white bg-blue-400 m-2 py-1 px-6 h-24 font-extrabold grid grid-cols-5 rounded-md shadow-sm">
        <div className="col-span-2 text-center">
          {minutes < 10 ? `0${minutes}` : minutes}
        </div>
        <div className="col-span-1 text-center">:</div>
        <div className="col-span-2 text-center">
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>
      <button
        className="flex-row bg-green-600 shadow-lg text-4xl text-white font-extrabold font-serif p-4 rounded-md text-center m-2"
        type="submit"
        onClick={() => {
          if (stopped) {
            setClock();
            setStopped(false);
          }
        }}
      >
        START
      </button>
      <button
        className="flex-col bg-red-700 shadow-lg text-4xl text-white font-extrabold font-serif p-4 rounded-md text-center m-2"
        onClick={() => setStopped(true)}
      >
        STOP
      </button>
    </div>
  );
}
