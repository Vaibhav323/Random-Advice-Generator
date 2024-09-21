import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(() => getAdvice(), []);

  return (
    <>
      <div className="advice-container">
        <h1 className="advice-text">{advice}</h1>
        <button onClick={getAdvice} className="advice-button">
          Get Advice
        </button>
        <Message count={count} />
      </div>
      <DarkModeToggle />
    </>
  );
}

function Message({ count }) {
  return (
    <p className="advice-info">
      You have read <strong className="advice-count">{count}</strong>{" "}
      {count === 1 ? "piece" : "pieces"} of advice.
    </p>
  );
}
function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function toggleDarkMode() {
    setIsDarkMode((prevMode) => !prevMode);
  }
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  return (
    <div className="dark-mode-toggle">
      <input
        type="checkbox"
        id="toggle-dark-mode"
        className="toggle-checkbox"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label for="toggle-dark-mode" className="toggle-label">
        <span className="toggle-inner"></span>
        <span className="toggle-switch"></span>
      </label>
    </div>
  );
}
