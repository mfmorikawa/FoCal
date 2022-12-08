import Calendar from "../../components/Calendar";
import { View, Views } from "react-big-calendar";
import Projects from "../Projects";
import Avatar from "../../components/Avatar";
import { ImageDescriptorProps } from "../../vite-env";
import Clock from "../../components/Clock";

export default function Home() {
  // calendar props
  const height = 500;
  const defaultView: View = Views.DAY;

  const image: ImageDescriptorProps = {
    url: "https://github.com/DByoyoer/FoCal/raw/main/client/src/assets/king_bob.jpg",
    alt_text: "IMG",
  };

  return (
    <>
      <div className="sticky z-10 top-0 h-screen order-b bg-slate-100 py-4">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container mb-4">
          <h5 hidden className="text-2xl text-gray-700 block">
            Dashboard
          </h5>
        </div>
        <hr />
        <div className="mt-2 grid grid-cols-2 pt-2">
        <section className="sm:w-full sm:h-1/3 h-1/2 ">
            <h5 hidden className="text-2xl text-center text-indigo-500 font-bold block">
              Today's Schedule
            </h5>
            <div className="rounded-lg mx-2 pt-2 calendar-container border-gray-100 border-4">
              <Calendar height={height} defaultView={defaultView} />  
            </div>
          </section>
          <section className="sm:w-full sm:h-1/3 h-1/2 ">
            <h5 hidden className="text-2xl text-center font-bold text-indigo-500 block">
              Current Projects
            </h5>
            <div className="rounded-lg mx-2 pt-2 calendar-container border-gray-100 border-4">
              <Projects />
            </div>
          </section>
          <section className="sm:w-full sm:h-1/3 h-1/2 ">
            <h5 hidden className="text-2xl text-center font-bold text-indigo-500 block">
              Start a Timer!
            </h5>
            <div className="rounded-lg mx-2 p-10 calendar-container border-gray-100 border-4">
              <Clock n_minutes={5}/>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
