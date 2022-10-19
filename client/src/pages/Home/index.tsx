import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Scheduler from "../Scheduler";

export default function Home() {
  const height = 400;
  function handleAddTask() {
    return <Modal />;
  }
  return (
    <div className="min-h-full grid col-span-2 pt-2 ">
      <section className="sm:w-full md:w-1/2 sm:h-1/3 md:h-1/2">
        <Scheduler height={height} />
      </section>
      <section className="sm:w-full md:w-1/2 sm:h-1/3 md:h-1/2">
        <Input/>
      </section>
    </div>
  );
}
