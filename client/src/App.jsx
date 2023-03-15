import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import ThemeChanger from "./ThemeChanger";
import Dashboard from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const themeOptions = ["light", "dark", "city_lights", "spotify_green"];
  const [theme, setTheme] = useState("light");

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return code ? <Dashboard code={code} theme={theme} /> : <Login />;
}

export default App;
