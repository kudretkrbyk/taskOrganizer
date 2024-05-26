import React, { useEffect, useState } from "react";

export default function Task({ axios, handleEditTask, refresh }) {
  const [data, setData] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3000/api/data/${id}`)
      .then(() => {
        setData(data.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div className="bg-gray-00 w-full p-3 flex flex-col gap-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex bg-gray-300 shadow-2xl items-center justify-between p-12"
        >
          <div>
            <h1>{item.Title}</h1>
            <p>{item.Description}</p>
            <p>{item._Date}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              className="bg-yellow-500 rounded-2xl p-2 px-3"
              onClick={() => handleEditTask(item)}
            >
              Düzenle
            </button>
            <button
              className="bg-red-500 rounded-2xl p-2 px-4"
              onClick={() => deleteTask(item.id)}
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
