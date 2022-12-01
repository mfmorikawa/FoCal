import { useMemo, useState } from "react";

export default function Progress({
  done
}: {
  done: number;
}) {
  return (
    <div className="h-5 mb-2 rounded-sm bg-slate-400 z-0 text-center text-white">
      <div
        className="bg-green-700 bg-gradient-to-r from-green-300 h-full z-10 rounded-md font-mono font-extrabold"
        style={{width: `${done}%`}}
      >
        {done}%
      </div>
    </div>
  );
}
