import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/index.css";
import Login from "./components/Login";
import ThemeChanger from "./components/ThemeChanger";
import Dashboard from "./components/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = (newTheme) => {
    if (theme === newTheme) {
      console.log("theme is already " + newTheme);
    } else {
      console.log("theme changed to " + newTheme);
      setTheme(newTheme);
    }
  };

  return code ? (
    <div className="">
      <Dashboard code={code} theme={theme} />
      <ThemeChanger theme={theme} setTheme={handleThemeChange} />
    </div>
  ) : (
    <Login />
  );
}

export default App;
