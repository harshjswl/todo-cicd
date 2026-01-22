import { useEffect, useState } from "react";
import api from "./api";
import { motion, AnimatePresence } from "framer-motion";
import "./style.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔊 Voice
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1;
    msg.pitch = 1.1;
    window.speechSynthesis.speak(msg);
  };

  const load = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const add = async () => {
    if (!title.trim()) return;
    await api.post("/todos", { title, description: "", completed: false });
    speak("Task added");
    setTitle("");
    load();
  };

  const remove = async (id) => {
    await api.delete(`/todos/${id}`);
    speak("Task deleted");
    load();
  };

  const update = async (todo) => {
    await api.put(`/todos/${todo.id}`, {
      title: editText,
      description: todo.description || "",
      completed: todo.completed,
    });
    speak("Task updated");
    setEditId(null);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="title"
      >
        ⚡ TODO
      </motion.h1>

      <motion.div
        className="add-box"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type new task..."
        />
        <button onClick={add}>ADD</button>
      </motion.div>

      <AnimatePresence>
        {todos.map((t, i) => (
          <motion.div
            key={t.id}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.04 }}
          >
            {editId === t.id ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button className="save" onClick={() => update(t)}>💾</button>
              </>
            ) : (
              <>
                <span
                  onDoubleClick={() => {
                    setEditId(t.id);
                    setEditText(t.title);
                  }}
                >
                  {t.title}
                </span>

                <div className="actions">
                  <button
                    onClick={() => {
                      setEditId(t.id);
                      setEditText(t.title);
                    }}
                  >
                    ✏️
                  </button>
                  <button onClick={() => remove(t.id)}>❌</button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
