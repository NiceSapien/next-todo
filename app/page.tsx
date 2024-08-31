"use client"
import Head from "next/head";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div>
      <Head>
        <title>To-Do List App</title>
        <meta name="description" content="A simple and beautiful to-do list app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
