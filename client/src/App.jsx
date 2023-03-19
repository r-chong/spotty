import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/index.css";
import Login from "./components/Login";
import { themes } from "./theme";
import ThemeChanger from "./components/ThemeChanger";
import Dashboard from "./components/Dashboard";
import ThemeMenu from "./components/ThemeMenu";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  // const [theme, setTheme] = useState("light");
  const [theme, setTheme] = useState(themes.light);

  const handleThemeChange = (newTheme) => {
    if (theme === newTheme) {
      console.log("theme is already " + newTheme);
    } else {
      console.log("theme changed to " + newTheme);
      setTheme(newTheme);
    }
  };

  return code ? (
    <div
      style={{
        backgroundColor: theme.primaryColor,
        color: theme.textColor,
        background: theme.backgroundGradient,
      }}
    >
      <nav
        className="fixed top-0 left-0 lg:w-1/5 hidden sm:block h-screen"
        aria-label="Sidenav"
      >
        <div
          className="overflow-y-auto py-5 px-3 h-full overflow-x-hidden"
          style={{
            backgroundColor: theme.warningColor,
          }}
        >
          <ThemeMenu handleThemeChange={handleThemeChange} />
        </div>
      </nav>
      <main>
        <Dashboard code={code} theme={theme} />
      </main>
    </div>
  ) : (
    <Login />
  );
}

export default App;
