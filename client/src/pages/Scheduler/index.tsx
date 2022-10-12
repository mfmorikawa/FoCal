import Calendar, {
  heightProp
} from "../../components/Calendar";
import Modal from "../../components/Modal";

export default function Scheduler(prop: heightProp) {
  function handleAddTask() {
    return <Modal />;
  }
  return (
    <div className="min-h-full grid pt-2 place-items-end">
      <button type="button" className="btn-blue" onClick={ handleAddTask }>
        {"Add Task"}
      </button>
      <main className="calendar-container">
        <Calendar height={prop.height} />
      </main>
    </div>
  );
}