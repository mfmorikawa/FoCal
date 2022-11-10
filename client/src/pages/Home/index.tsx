import Calendar from "../../components/Calendar";
import { View, Views } from "react-big-calendar";

export default function Home() {
// calendar props
  const height = 400;
  const defaultView: View = Views.DAY;
  return (
    <>
      <div className="h-screen grid col-span-2 pt-2 bg-indigo-100">
        <section className="sm:w-full md:w-1/2 sm:h-1/3 md:h-1/2">
          <div className="mx-2 pt-2 calendar-container">
          <Calendar 
            height={height}
            defaultView={defaultView}
          />
          </div>
        </section>
      </div>
    </>
  );
}
