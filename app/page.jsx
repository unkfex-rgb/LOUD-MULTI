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
  const isResizing = useRef(false);

  const streamers = [
    { name: 'loud_coringa', twitch: 'https://www.twitch.tv/loud_coringa' },
    { name: 'loud_brabox', twitch: 'https://www.twitch.tv/loud_brabox' },
    { name: 'gabepeixe', twitch: 'https://www.twitch.tv/gabepeixe' },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 200 && newWidth <= 600) {
        setChatWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
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
    isResizing.current = true;
    document.body.style.cursor = 'ew-resize';
  };

  return (
    <>
      <Header />
      <div className="mode-menu-container" style={{ position: 'absolute', top: '15px', right: '20px', zIndex: 101 }}>
        <ModeMenu mode={mode} setMode={setMode} />
      </div>
      
      <main>
        {mode === 'grid' && (
          <div className="grid-layout-wrapper">
            <div className="main-stream-area">
              <Player streamer={mainStreamer} />
            </div>
            
            <div className="side-streams-area">
              <Player streamer={streamers[1].name} height="calc(50% - 5px)" />
              <Player streamer={streamers[2].name} height="calc(50% - 5px)" />
            </div>
            
            <div className="chat-area" style={{ width: `${chatWidth}px` }}>
              <div className="chat-resizer" onMouseDown={startResizing}></div>
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}

        {mode === 'focus' && (
          <div className="grid-layout-wrapper">
            <div className="main-stream-area">
              <Player streamer={mainStreamer} />
            </div>
            <div className="chat-area" style={{ width: '320px' }}>
              <div className="focus-buttons" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {streamers.map((s) => (
                  <button 
                    key={s.name} 
                    onClick={() => setMainStreamer(s.name)}
                    className={`futuristic-btn ${s.name === mainStreamer ? 'active' : ''}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}

        {mode === 'auto' && (
          <div className="grid-layout-wrapper">
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px' }}>
              <Player streamer={streamers[0].name} />
              <Player streamer={streamers[1].name} />
              <Player streamer={streamers[2].name} />
              <div className="chat-buttons-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                {streamers.map((s) => (
                  <button 
                    key={s.name} 
                    onClick={() => setChatStreamer(s.name)}
                    className={`futuristic-btn ${s.name === chatStreamer ? 'active' : ''}`}
                  >
                    CHAT: {s.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="chat-area" style={{ width: '320px' }}>
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
