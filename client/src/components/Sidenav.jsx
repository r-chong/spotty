import React, { useState } from "react";
import ThemeMenu from "./ThemeMenu";

export default function Sidenav({ theme, handleThemeChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`fixed top-0 left-0 h-screen lg:w-1/5 transform transition-transform duration-300 ease-in-out ${
        isCollapsed ? "-translate-x-full" : ""
      }`}
      aria-label="Sidenav"
    >
      <div
        className="overflow-y-auto py-5 px-3 h-full overflow-x-hidden"
        style={{
          backgroundColor: theme.SidenavBackgroundColor,
        }}
      >
        {/* <div className="text-white cursor-pointer" onClick={toggleCollapse}>
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
        </div> */}
        <button
          className="absolute right-0 top-0 -mr-14 mt-11 p-2 cursor-pointer"
          onClick={toggleCollapse}
          style={{ backgroundColor: theme.backgroundGradient }}
        >
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <ThemeMenu handleThemeChange={handleThemeChange} />
      </div>
    </nav>
  );
}
