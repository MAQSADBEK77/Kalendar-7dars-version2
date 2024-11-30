import { useState } from "react";

function Modal({ onClose, selectedDate, handleSave }) {
  const [title, setTitle] = useState("");
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Ma'lumot qo'shish</h3>
        <p>Sana: {selectedDate}</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nomni kiriting"
        />
        <div className="modal-actions">
          <button onClick={onClose}>Bekor qilish</button>
          <button onClick={() => handleSave(title, selectedDate)}>Saqlash</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
