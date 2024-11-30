import { useState } from "react";

interface ModalProps {
  onClose: () => void;
  selectedDate: string;
  handleSave: (title: string, selectedDate: string) => void;
}

function Modal({ onClose, selectedDate, handleSave }: ModalProps) {
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
          <button
            onClick={() => {
              if (title.trim()) {
                handleSave(title, selectedDate);
                setTitle(""); // Inputni tozalash
              }
            }}>
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
