import { useFetch } from "../hooks/useFetch";
import type { Todo } from "../types/api";

function TodoList() {
  const state = useFetch<Todo[]>("https://jsonplaceholder.typicode.com/todos");

  switch (state.status) {
    case "idle":
    case "loading":
      return <p style={{ textAlign: "center", padding: "20px" }}>Loading todos...</p>;
    case "error":
      return (
        <div style={{ color: "#dc2626", padding: "20px" }}>
          <h3>Error</h3>
          <p>{state.error}</p>
        </div>
      );
    case "success":
      return (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {state.data.slice(0, 20).map((todo) => (
            <li
              key={todo.id}
              style={{
                padding: "8px 12px",
                margin: "4px 0",
                background: todo.completed ? "#d1fae5" : "#fef3c7",
                borderRadius: "6px",
              }}
            >
              <input type="checkbox" checked={todo.completed} readOnly />
              {" "}
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      );
  }
}

export default TodoList;
