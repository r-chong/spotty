import React, { useState } from "react";
import ThemeMenu from "./ThemeMenu";

export default function Sidenav({ theme, handleThemeChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`fixed top-0 left-0 lg:w-1/5 h-screen transform transition-transform duration-300 ease-in-out ${
        isCollapsed ? "-translate-x-full" : ""
      }`}
      aria-label="Sidenav"
    >
      <div
        className="overflow-y-auto py-5 px-3 h-full overflow-x-hidden"
        style={{
          backgroundColor: theme.warningColor,
        }}
      >
        <div className="text-white cursor-pointer" onClick={toggleCollapse}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <ThemeMenu handleThemeChange={handleThemeChange} />
      </div>
    </nav>
  );
}
