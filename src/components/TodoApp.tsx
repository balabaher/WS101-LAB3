import { useState } from "react";
import { useTodoReducer } from "../hooks/todoReducer";

function TodoApp() {
  const { state, dispatch, filteredTodos } = useTodoReducer();
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch({ type: "ADD", payload: input.trim() });
    setInput("");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>useReducer Todo</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          style={{ padding: "8px", width: "70%", marginRight: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add
        </button>
      </form>

      <div style={{ margin: "12px 0" }}>
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
            style={{
              margin: "0 4px",
              fontWeight: state.filter === f ? "bold" : "normal",
              background: state.filter === f ? "#2563eb" : "#e5e7eb",
              color: state.filter === f ? "#fff" : "#000",
              border: "none",
              padding: "4px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ padding: "8px 0", borderBottom: "1px solid #e5e7eb" }}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: "TOGGLE", payload: todo.id })}
              />
              {" "}
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </span>
            </label>
            <button
              onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
              style={{
                marginLeft: "8px",
                color: "#dc2626",
                cursor: "pointer",
                border: "none",
                background: "none",
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
