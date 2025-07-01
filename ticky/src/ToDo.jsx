import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa6";
import illustration from "./assets/material/undraw_to-do-list_eoia.svg";

const PRIORITY_CLASSES = {
  high: "priority-border-high",
  medium: "priority-border-medium",
  low: "priority-border-low",
};

export default function ToDo() {
  const [isdark, setIsdark] = useState(true);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      { text: input, completed: false, id: Date.now(), priority },
    ]);
    setInput("");
    setPriority("medium");
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  const mainBg = isdark ? "bg-[#2a2e2e]" : "bg-[white]";
  const textColor = isdark ? "text-[white]" : "text-[black]";
  const inputBg = isdark
    ? "bg-[#232626] text-white border-gray-600"
    : "bg-white text-black";
  const selectBg = inputBg;
  const taskBg = isdark ? "bg-[#232626] text-white" : "bg-gray-100 text-black";
  const emptyText = isdark ? "text-gray-400" : "text-gray-500";

  return (
    <main
      className={`flex flex-col items-center w-full max-w-[25rem] h-[35rem] mx-auto p-6 ${mainBg}`}
    >
      <div className="flex justify-between items-center w-full mb-6">
        <h1 className={`text-2xl font-extrabold text-center ${textColor}`}>
          لیست کارهای روزانه
        </h1>
        <button
          onClick={() => setIsdark(!isdark)}
          className="bg-neon-green p-3 rounded-full btn hover:cursor-pointer transition duration-300 hover:shadow-[0_0_15px_#39FF14]"
        >
          {isdark ? (
            <FaSun className="text-md" />
          ) : (
            <FaMoon className="text-md" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between w-full mb-4">
        <input
          type="text"
          placeholder="کار جدید ..."
          className={`text-md w-[58%] p-2 rounded-md border border-black outline-none transition ${inputBg}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <select
          className={`w-[25%] p-2 rounded-md border outline-none hover:cursor-pointer transition ${selectBg}`}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">بالا</option>
          <option value="medium">متوسط</option>
          <option value="low">پایین</option>
        </select>
        <button
          className="p-3 rounded-md bg-neon-green btn hover:cursor-pointer"
          onClick={handleAddTask}
        >
          <FaPlus className="w-4 h-4 font-semibold text-black" />
        </button>
      </div>
      <ul className="w-full flex-1 overflow-y-auto space-y-2">
        {tasks.length === 0 && (
          <li
            className={`flex flex-col items-center gap-2 text-center text-lg mt-8 ${emptyText}`}
          >
            هیچ کاری اضافه نشده است!
            <img src={illustration} alt="illustration" className="w-24" />
          </li>
        )}
        {tasks
          .slice()
          .sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          })
          .map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-2 rounded-md group relative task-transition animate-fade-in ${taskBg} ${
                task.completed ? "opacity-60 line-through" : ""
              } ${PRIORITY_CLASSES[task.priority]}`}
            >
              <span
                className="text-md max-w-[60%] w-full cursor-pointer select-none break-words pr-2"
                onClick={() => handleToggleTask(task.id)}
              >
                {task.text}
              </span>
              <div className="flex gap-x-2 min-w-[90px] justify-end">
                <button
                  className="p-2 rounded btn btn-delete hover:bg-red-500/80 transition hover:cursor-pointer"
                  onClick={() => handleDeleteTask(task.id)}
                  title="حذف"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
                <button
                  className={`p-2 rounded btn hover:bg-green-500/80 transition ${
                    task.completed ? "bg-green-500" : "bg-gray-300"
                  } hover:cursor-pointer`}
                  onClick={() => handleToggleTask(task.id)}
                  title="تکمیل"
                >
                  <FaCheck
                    className={`w-4 h-4 ${
                      task.completed ? "text-white" : "text-green-700"
                    }`}
                  />
                </button>
              </div>
            </li>
          ))}
      </ul>
      <p className={`text-xs ${isdark ? "text-white" : "text-black"}`}>
        made by Ali Shabani
      </p>
    </main>
  );
}
