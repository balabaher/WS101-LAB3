import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import TodoList from "./components/TodoList";
import TodoApp from "./components/TodoApp";
import "./App.css";

function ThemedApp() {
  const { theme, toggleTheme } = useTheme();

  const styles: React.CSSProperties = {
    background: theme === "dark" ? "#1f2937" : "#ffffff",
    color: theme === "dark" ? "#f9fafb" : "#111827",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "system-ui, sans-serif",
    transition: "background 0.2s, color 0.2s",
  };

  return (
    <div style={styles}>
      <button onClick={toggleTheme} style={{ marginBottom: "20px", padding: "8px 16px" }}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <h1>WS101 — Week 3 Lab</h1>

      <section style={{ marginBottom: "40px" }}>
        <h2>useFetch with API</h2>
        <TodoList />
      </section>

      <hr style={{ margin: "40px 0" }} />

      <section style={{ marginBottom: "40px" }}>
        <h2>useReducer</h2>
        <TodoApp />
      </section>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
