"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomModal from "./CustomModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Todo {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState<string>("#0070f3");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedColor = localStorage.getItem("primaryColor");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    if (savedColor) {
      setPrimaryColor(savedColor);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  const addTodo = () => {
    if (newTodoTitle.trim() && newTodoDescription.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: newTodoTitle,
        description: newTodoDescription,
        timestamp: new Date().toLocaleString(),
      };
      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
      setNewTodoDescription("");
      setIsModalOpen(false);
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>My To-Do List</h1>
          <p>Here is the list of all your to-dos.</p>
        </div>
        <button className="settings-btn" onClick={() => setIsSettingsOpen(true)}>
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
      <div className="button-container">
        <button onClick={() => setIsModalOpen(true)}>Add New Task</button>
      </div>
      <ul>
        <AnimatePresence>
          {todos.map(todo => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="todo-item"
            >
              <div className="todo-content">
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
              </div>
              <div className="todo-time">
                <small>{todo.timestamp}</small>
                <button onClick={() => removeTodo(todo.id)} className="remove-btn">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTodo}
      >
        <h2>Add New Task</h2>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Task Title"
        />
        <textarea
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          placeholder="Task Description"
        ></textarea>
      </CustomModal>

      <CustomModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSubmit={() => setIsSettingsOpen(false)}
      >
        <h2>Settings</h2>
        <label htmlFor="primaryColor">Primary Color</label>
        <input
          type="color"
          id="primaryColor"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </CustomModal>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border-radius: 10px;
          background: #f0f0f0;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        h1 {
          margin: 0;
          color: black;
        }
        .settings-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: ${primaryColor};
        }
        .button-container {
          text-align: center;
          margin-bottom: 20px;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: ${primaryColor};
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: ${primaryColor}CC;
        }
        ul {
          margin-top: 20px;
          list-style: none;
          padding: 0;
        }
        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          color: black;
        }
        .todo-content {
          max-width: 70%;
        }
        h2 {
          margin: 0 0 5px;
          font-size: 18px;
          color: black;
        }
        p {
          margin: 0;
          font-size: 14px;
          color: #555;
        }
        .todo-time {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        small {
          font-size: 12px;
          color: #999;
        }
        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #ff0000;
          font-size: 18px;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          color: black;
        }
        textarea {
          resize: none;
          height: 100px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          color: black;
        }
        #primaryColor {
          width: 100%;
          height: 40px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
