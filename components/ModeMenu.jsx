"use client";

export default function ModeMenu({ mode, setMode }) {
  return (
    <div className="mode-menu">
      <button 
        className={mode === 'grid' ? 'active' : ''} 
        onClick={() => setMode('grid')}
      >
        Grid
      </button>
      <button 
        className={mode === 'focus' ? 'active' : ''} 
        onClick={() => setMode('focus')}
      >
        Foco
      </button>
      <button 
        className={mode === 'auto' ? 'active' : ''} 
        onClick={() => setMode('auto')}
      >
        Auto
      </button>
    </div>
  );
}
