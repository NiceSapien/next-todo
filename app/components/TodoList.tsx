"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
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
              {todo.text}
              <button onClick={() => removeTodo(todo.id)} className="remove-btn">
                ✖️
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border-radius: 10px;
          background: #f0f0f0;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .input-container {
          display: flex;
          gap: 10px;
        }
        input {
          flex: 1;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #005bb5;
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
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          background-color: white;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #ff0000;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
