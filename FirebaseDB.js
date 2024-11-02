import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "./firebase";

function App() {
  const [todo, setTodo] = useState("");

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  // Write
  const writeData = () => {
    set(ref(db, "/"), {
      todo,
    });
    setTodo("");
  };

  return (
    <div className="App">
      <input type="text" value={todo} onChange={handleTodoChange}></input>
      <button onClick={writeData}>Submit</button>
    </div>
  );
}
export default App;
