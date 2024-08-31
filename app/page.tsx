"use client"
import Head from "next/head";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div>
      <main>
        <TodoList />
      </main>

      <style jsx>{`
        main {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #e0e0e0;
        }
      `}</style>
    </div>
  );
}
