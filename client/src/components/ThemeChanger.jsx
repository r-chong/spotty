import React, { useState } from "react";
import { themes } from "../theme";
import "./index.css";

export default function ThemeChanger({ setTheme }) {
  // const themeOptions = ["light", "dark", "city_lights", "spotify_green"];

  return (
    <div className="py-4 px-8 flex flex-col items-center">
      <p className="mb-2 text-white font-semibold">Theme Changer</p>
      <div className="flex flex-col justify-center items-center gap-4">
        <button
          className="px-4 py-2 rounded-md bg-white text-gray-800 shadow-md hover:bg-gray-200 focus:outline-none"
          onClick={() => setTheme(themes.light)}
        >
          Default
        </button>
        <button
          className="px-4 py-2 rounded-md bg-gray-800 text-white shadow-md hover:bg-gray-700 focus:outline-none"
          onClick={() => setTheme(themes.dark)}
        >
          Dark
        </button>
        <button
          className="px-4 py-2 rounded-md bg-gray-700 text-white shadow-md hover:bg-gray-600 focus:outline-none"
          onClick={() => setTheme(themes.city_lights)}
        >
          City Lights
        </button>
        <button
          className="px-4 py-2 rounded-md bg-green-500 text-white shadow-md hover:bg-green-600 focus:outline-none"
          onClick={() => setTheme(themes.spotify_green)}
        >
          Spotify Green
        </button>
      </div>
    </div>
  );
}
