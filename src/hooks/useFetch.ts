import { useState, useEffect } from "react";

export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

export function useFetch<T>(url: string): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
        const json = (await res.json()) as T;
        if (!cancelled) setState({ status: "success", data: json });
      } catch (err) {
        if (!cancelled) setState({ status: "error", error: (err as Error).message });
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
