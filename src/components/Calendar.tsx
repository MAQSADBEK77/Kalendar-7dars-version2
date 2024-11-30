import { useState } from "react";
import Modal from "./Modal";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  let saveEvents = JSON.parse(localStorage.getItem("eventDate"));
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
  );
  function handleOrtga() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  }
  function hundleKeyingi() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  }
  function clickAddEvent(dateString: string) {
    setSelectedDate(dateString);
    setModalOpen(true);
    console.log(dateString);
  }
  function handleSave(title: string, selectedDate: string) {
    let eventDateArray;
    setModalOpen(false);
    let localDate = JSON.parse(localStorage.getItem("eventDate"));
    console.log(localDate);

    localDate
      ? (eventDateArray = [...localDate, { title, selectedDate }])
      : (eventDateArray = [{ title, selectedDate }]);
    localStorage.setItem("eventDate", JSON.stringify(eventDateArray));
  }
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handleOrtga}>Ortga</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={hundleKeyingi}>Keyingisi</button>
      </div>
      <div className="calendar-grid">
        {daysInMonth.map((day) => {
          const dateString = day.toISOString().split("T")[0];
          saveEvents &&
            saveEvents.map((event: any) => {
              if (event.title == dateString) {
                return (
                  <div key={dateString} className="calendar-day">
                    <span>{day.getDate()}</span>
                    <div className="events">
                      <div className="event">{event.title}</div>
                      <button onClick={() => clickAddEvent(dateString)}>
                        Add Event
                      </button>
                    </div>
                  </div>
                );
              }
            });
          return (
            <div key={dateString} className="calendar-day">
              <span>{day.getDate()}</span>
              <button onClick={() => clickAddEvent(dateString)}>
                Add Event
              </button>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          selectedDate={selectedDate}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}

export default Calendar;
