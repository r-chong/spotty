import React, { useState } from "react";

export default function ThemeChanger({ theme, handleThemeChange }) {
  return (
    <div>
      <label htmlFor="theme-select">Select theme:</label>
      <select id="theme-select" value={theme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="city_lights">City Lights</option>
        <option value="green">Green</option>
      </select>
    </div>
  );
}
