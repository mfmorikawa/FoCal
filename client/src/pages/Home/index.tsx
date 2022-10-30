import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Calendar from "../../components/Calendar";
import { View, Views } from "react-big-calendar";

export default function Home() {
  const height = 400;
  const defaultView: View = Views.DAY;
  function handleAddTask() {
    return <Modal />;
  }
  return (
    <>
      <div className="min-h-full grid col-span-2 pt-2 ">
        <section className="sm:w-full md:w-1/2 sm:h-1/3 md:h-1/2">
          <div className="calendar-container">
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
