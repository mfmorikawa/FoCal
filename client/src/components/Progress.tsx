import { useState } from "react";

export type progressStyle = {
  opacity: number;
  width: string;
};

export default function Progress({ done }: { done: number }) {
  const [style, setStyle] = useState<progressStyle>({
    opacity: 0,
    width: "50%",
  });

  setTimeout(() => {
    const newStyle: progressStyle = {
      opacity: 1,
      width: `${done}%`,
    };
  }, 1000);

  return (
    <div className="h-5 m-5 rounded-md bg-gray-200 w-1/3 z-0 text-center text-white">
      <div className="bg-green-700 bg-gradient-to-r from-green-300 h-full z-10 w-9/12 rounded-md">
        {done}%
      </div>
    </div>
  );
}
