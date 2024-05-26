import { useEffect, useState } from "react";

export default function AddTask({
  axios,
  editTask,
  setEditTask,
  handleTaskUpdated,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.Title);
      setDescription(editTask.Description);
      setDate(editTask._Date);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
    }
  }, [editTask]);

  const handleSubmit = () => {
    const task = {
      Title: title,
      Description: description,
      _Date: date,
    };

    if (editTask) {
      axios
        .put(`http://localhost:3000/api/data/${editTask.id}`, task)
        .then((response) => {
          setEditTask(null); // Formu sıfırla
          handleTaskUpdated();
        })
        .catch((error) => console.error("Error updating data:", error));
    } else {
      axios
        .post("http://localhost:3000/api/data", task)
        .then((response) => {
          setEditTask(null); // Formu sıfırla
          handleTaskUpdated(); // Yeni task eklendi bilgisini ilet
        })
        .catch((error) => console.error("Error adding data:", error));
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full items-start justify-center">
      <div>{editTask ? "Görev Düzenle" : "Görev Ekle"}</div>
      <div className="flex flex-col gap-4 w-1/4 items-start">
        <div className="flex gap-4 items-start justify-center">
          <div>Görev:</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex gap-4 items-start justify-center">
          <div>Açıklama:</div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="flex gap-4 items-start justify-center">
        <div>Tarih:</div>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
      </div>
      <div>
        <button
          className="bg-green-500 p-2 px-3 rounded-xl"
          onClick={handleSubmit}
        >
          {editTask ? "Görev Güncelle" : "Görev Ekle"}
        </button>
      </div>
    </div>
  );
}
