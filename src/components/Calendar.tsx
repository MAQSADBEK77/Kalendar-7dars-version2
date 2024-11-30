import { useState } from "react";
import Modal from "./Modal";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // localStorage'dan saqlangan voqealarni olish
  const saveEvents: { title: string; selectedDate: string }[] = JSON.parse(
    localStorage.getItem("eventDate") || "[]"
  );

  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const daysInMonth = [];
  const totalDays = endOfMonth.getDate();

  for (let i = 1; i <= totalDays; i++) {
    daysInMonth.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
    );
  }

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
  }

  function handleSave(title: string, selectedDate: string) {
    setModalOpen(false);
    const localDate = JSON.parse(localStorage.getItem("eventDate") || "[]");
    const eventDateArray = [...localDate, { title, selectedDate }];
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
          const eventsForDay = saveEvents.filter(
            (event) => event.selectedDate === dateString
          );

          return (
            <div key={dateString} className="calendar-day">
              <span>{day.getDate()}</span>
              <div className="events">
                {eventsForDay.map((event, index) => (
                  <div key={index} className="event">
                    {event.title}
                  </div>
                ))}
              </div>
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
