import React, { useState } from "react";

export default function ThemeChanger({ setTheme }) {
  // const themeOptions = ["light", "dark", "city_lights", "spotify_green"];

  return (
    <div>
      <p>theme changer</p>
      <button onClick={() => setTheme("light")}>Default</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("city_lights")}>City Lights</button>
      <button onClick={() => setTheme("spotify_green")}>Spotify Green</button>
    </div>
  );
}
