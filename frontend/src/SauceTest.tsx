import { useEffect, useState } from "react";

type Todo = { id: number; text: string; done: boolean };

const STORAGE_KEY = "sauce-test-todos";

const SauceTest = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTodo = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  const isDark = theme === "dark";
  const bg = isDark ? "#1a1a1a" : "#f5f5f7";
  const fg = isDark ? "#f5f5f7" : "#1a1a1a";
  const card = isDark ? "#2a2a2a" : "#ffffff";
  const border = isDark ? "#3a3a3a" : "#e0e0e0";
  const accent = "#ff3366"; // pink

  const btn: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: 6,
    border: `1px solid ${border}`,
    background: card,
    color: fg,
    cursor: "pointer",
    marginRight: 8,
    fontSize: 14,
  };

  const card_style: React.CSSProperties = {
    background: card,
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    border: `1px solid ${border}`,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: fg,
        padding: 24,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      data-testid="app-root"
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h1 style={{ margin: 0, fontSize: 28 }}>Sauce Test Sandbox</h1>
          <button
            data-testid="theme-toggle"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            style={btn}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </header>

        <section style={card_style}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Browser info</h2>
          <div
            style={{ fontSize: 13, fontFamily: "monospace", lineHeight: 1.6 }}
          >
            <div data-testid="user-agent">UserAgent: {navigator.userAgent}</div>
            <div data-testid="viewport">
              Viewport: {window.innerWidth} x {window.innerHeight}
            </div>
            <div data-testid="language">Language: {navigator.language}</div>
            <div data-testid="platform">Platform: {navigator.platform}</div>
          </div>
        </section>

        <section style={card_style}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Counter</h2>
          <div
            data-testid="counter-value"
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: accent,
              marginBottom: 12,
            }}
          >
            {count}
          </div>
          <button
            data-testid="counter-inc"
            onClick={() => setCount((c) => c + 1)}
            style={btn}
          >
            +1
          </button>
          <button
            data-testid="counter-dec"
            onClick={() => setCount((c) => c - 1)}
            style={btn}
          >
            -1
          </button>
          <button
            data-testid="counter-reset"
            onClick={() => setCount(0)}
            style={btn}
          >
            Reset
          </button>
        </section>

        <section style={card_style}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Todo list</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
            style={{ display: "flex", gap: 8, marginBottom: 16 }}
          >
            <input
              data-testid="todo-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs doing?"
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                border: `1px solid ${border}`,
                background: bg,
                color: fg,
                fontSize: 14,
              }}
            />
            <button
              data-testid="todo-add"
              type="submit"
              style={{ ...btn, marginRight: 0 }}
            >
              Add
            </button>
          </form>

          {todos.length === 0 ? (
            <div
              data-testid="todo-empty"
              style={{ opacity: 0.5, fontStyle: "italic" }}
            >
              No todos yet. Add one above.
            </div>
          ) : (
            <ul
              data-testid="todo-list"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {todos.map((t) => (
                <li
                  key={t.id}
                  data-testid={`todo-item-${t.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 0",
                    gap: 12,
                    borderBottom: `1px solid ${border}`,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTodo(t.id)}
                    data-testid={`todo-check-${t.id}`}
                  />
                  <span
                    style={{
                      flex: 1,
                      textDecoration: t.done ? "line-through" : "none",
                      opacity: t.done ? 0.5 : 1,
                    }}
                  >
                    {t.text}
                  </span>
                  <button
                    onClick={() => removeTodo(t.id)}
                    style={{ ...btn, marginRight: 0, padding: "4px 10px" }}
                    data-testid={`todo-remove-${t.id}`}
                    aria-label={`Remove ${t.text}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {todos.length > 0 && (
            <div style={{ marginTop: 12, fontSize: 13, opacity: 0.7 }}>
              <span data-testid="todo-count">
                {todos.filter((t) => !t.done).length} of {todos.length}{" "}
                remaining
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SauceTest;
