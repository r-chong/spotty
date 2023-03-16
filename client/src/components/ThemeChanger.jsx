import React, { useState } from "react";
import "./index.css";

export default function ThemeChanger({ setTheme }) {
  // const themeOptions = ["light", "dark", "city_lights", "spotify_green"];

  return (
    <div className="bg-gray-100 py-4 px-8 flex flex-col items-center">
      <p className="text-gray-800 mb-2 text-lg font-semibold">Theme Changer</p>
      <div className="flex justify-center items-center gap-4">
        <button
          className="px-4 py-2 rounded-md bg-white text-gray-800 shadow-md hover:bg-gray-200 focus:outline-none"
          onClick={() => setTheme("light")}
        >
          Default
        </button>
        <button
          className="px-4 py-2 rounded-md bg-gray-800 text-white shadow-md hover:bg-gray-700 focus:outline-none"
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
        <button
          className="px-4 py-2 rounded-md bg-gray-700 text-white shadow-md hover:bg-gray-600 focus:outline-none"
          onClick={() => setTheme("city_lights")}
        >
          City Lights
        </button>
        <button
          className="px-4 py-2 rounded-md bg-green-500 text-white shadow-md hover:bg-green-600 focus:outline-none"
          onClick={() => setTheme("spotify_green")}
        >
          Spotify Green
        </button>
      </div>
    </div>
  );
}
