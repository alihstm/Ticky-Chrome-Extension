import { useState } from "react";
import "./App.css";
import ToDo from "./ToDo";

function App() {
  return (
    <>
      <div className="w-[400px] min-h-screen flex items-start justify-center">
        <ToDo />
      </div>
    </>
  );
}

export default App;
