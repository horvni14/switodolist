import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setTodos(todos);
    }
    getTodos();
  }, [])

  /* update bez refresh stránky */
  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3){
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({todo: content}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos,newTodo]);
    }
  }

  return (
    <main className="container">
      <h1 className="title">To Do List</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input 
        type="text" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Enter a new ToDo..." 
        className="form__input"
        required />
        <button className="form__button" type="submit">Create ToDo</button>
      </form>
      <div className="todos">
        {(todos.length > 0) && todos.map((todo) => (
          <Todo key={todo._id} todo = {todo} setTodos={setTodos}/>
        ))}
      </div>
    </main>
  );
}

