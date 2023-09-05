import React from "react";
import Todo from "./todo";
import "./App.css";
import { TodoProvider } from "./context/TodoProvider";

function App() {
  return (
    <TodoProvider>
      <div className="bg-slate-200 min-h-screen p-4 App">
        <Todo />
      </div>
    </TodoProvider>
  );
}

export default App;
