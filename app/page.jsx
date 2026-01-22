"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import ModeMenu from '../components/ModeMenu';
import Player from '../components/Player';
import Chat from '../components/Chat';
import { useState, useEffect, useRef } from 'react';

export default function Page() {
  const [mode, setMode] = useState('grid');
  const [mainStreamer, setMainStreamer] = useState('loud_coringa');
  const [chatStreamer, setChatStreamer] = useState('loud_coringa');
  const [chatWidth, setChatWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const isResizingRef = useRef(false);

  const streamers = [
    { name: 'loud_coringa', twitch: 'https://www.twitch.tv/loud_coringa' },
    { name: 'loud_brabox', twitch: 'https://www.twitch.tv/loud_brabox' },
    { name: 'gabepeixe', twitch: 'https://www.twitch.tv/gabepeixe' },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 200 && newWidth <= 600) {
        setChatWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startResizing = (e) => {
    e.preventDefault();
    isResizingRef.current = true;
    setIsResizing(true);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  const handleChatChange = (name) => {
    setChatStreamer(name);
    if (mode === 'focus') {
      setMainStreamer(name);
    }
  };

  const ChatSelector = () => (
    <div className="chat-selector" style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
      {streamers.map((s) => (
        <button 
          key={s.name} 
          onClick={() => handleChatChange(s.name)}
          className={`futuristic-btn ${s.name === chatStreamer ? 'active' : ''}`}
          style={{ flex: 1, padding: '6px 4px', fontSize: '0.6rem' }}
        >
          {s.name.split('_')[1] || s.name}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <Header />
      <div className="mode-menu-container" style={{ position: 'absolute', top: '15px', right: '20px', zIndex: 101 }}>
        <ModeMenu mode={mode} setMode={setMode} />
      </div>
      
      <main>
        {/* Overlay invisível para capturar o mouse durante o redimensionamento e evitar que o iframe "roube" o evento */}
        {isResizing && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            cursor: 'ew-resize'
          }} />
        )}

        {mode === 'grid' && (
          <div className="layout-wrapper">
            {/* Quadro Principal */}
            <div className="grid-main-area">
              <Player streamer={mainStreamer} />
            </div>
            
            {/* Quadro Lateral com Players Empilhados */}
            <div className="grid-side-area">
              <div style={{ flex: 1, height: '50%', display: 'flex', flexDirection: 'column' }}>
                <Player streamer={streamers[1].name} />
              </div>
              <div style={{ flex: 1, height: '50%', display: 'flex', flexDirection: 'column' }}>
                <Player streamer={streamers[2].name} />
              </div>
            </div>
            
            {/* Quadro do Chat */}
            <div className="chat-area" style={{ width: `${chatWidth}px` }}>
              <div className="chat-resizer" onMouseDown={startResizing}></div>
              <ChatSelector />
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}

        {mode === 'focus' && (
          <div className="layout-wrapper">
            <div className="focus-main-area">
              <Player streamer={mainStreamer} />
            </div>
            
            <div className="chat-area" style={{ width: `${chatWidth}px` }}>
              <div className="chat-resizer" onMouseDown={startResizing}></div>
              <ChatSelector />
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}

        {mode === 'auto' && (
          <div className="layout-wrapper">
            <div className="auto-players-area">
              {streamers.map((s) => (
                <Player key={s.name} streamer={s.name} />
              ))}
            </div>
            
            <div className="chat-area" style={{ width: `${chatWidth}px` }}>
              <div className="chat-resizer" onMouseDown={startResizing}></div>
              <ChatSelector />
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
