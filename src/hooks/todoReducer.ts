import { useReducer } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
}

type TodoAction =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number }
  | { type: "SET_FILTER"; payload: TodoState["filter"] };

const initialState: TodoState = {
  todos: [],
  filter: "all",
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), title: action.payload, completed: false }],
      };
    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export function useTodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  return { state, dispatch, filteredTodos };
}
