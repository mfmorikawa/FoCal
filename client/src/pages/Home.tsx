import Calendar from "./Calendar";
import Modal from "../components/Modal";

export default function Home() {
  function handleAddTask() {
    return <Modal />;
  }
  return (
    <div className="min-h-full grid pt-2 place-items-end">
      <button type="button" className="btn-blue" onClick={ handleAddTask }>
        {"Add Task"}
      </button>
      <main className="calendar-container">
        <Calendar />
      </main>
    </div>
  );
}
