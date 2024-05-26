import Task from "./components/task";
import AddTask from "./components/addTask";
import axios from "axios";
import { useState } from "react";

function App() {
  const [editTask, setEditTask] = useState(null);

  const [refresh, setRefresh] = useState(false);
  const handleTaskUpdated = () => {
    setRefresh(!refresh);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  return (
    <div className="App h-screen bg-gray-200 w-full">
      <AddTask
        axios={axios}
        editTask={editTask}
        setEditTask={setEditTask}
        handleTaskUpdated={handleTaskUpdated}
      ></AddTask>
      <Task
        axios={axios}
        handleEditTask={handleEditTask}
        refresh={refresh}
      ></Task>
    </div>
  );
}

export default App;
