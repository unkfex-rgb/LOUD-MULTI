
"use client";

export default function ModeMenu({ mode, setMode }) {
  return (
    <div className="mode-menu">
      <button className="menu-btn">☰</button>

      <div className="menu-dropdown">
        <span onClick={() => setMode("grid")}>Grid</span>
        <span onClick={() => setMode("focus")}>Foco</span>
        <span onClick={() => setMode("auto")}>Auto</span>
      </div>
    </div>
  );
}
