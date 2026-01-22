"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import ModeMenu from '../components/ModeMenu';
import Player from '../components/Player';
import Chat from '../components/Chat';
import { useState } from 'react';

export default function Page() {
  const [mode, setMode] = useState('grid');
  const [mainStreamer, setMainStreamer] = useState('loud_coringa');
  const [chatStreamer, setChatStreamer] = useState('loud_coringa');

  const streamers = [
    { name: 'loud_coringa', twitch: 'https://www.twitch.tv/loud_coringa' },
    { name: 'loud_brabox', twitch: 'https://www.twitch.tv/loud_brabox' },
    { name: 'gabepeixe', twitch: 'https://www.twitch.tv/gabepeixe' },
  ];

  return (
    <>
      <Header />
      <div style={{ position: 'absolute', top: '15px', right: '20px', zIndex: 101 }}>
        <ModeMenu mode={mode} setMode={setMode} />
      </div>
      
      <main>
        {mode === 'grid' && (
          <div className="grid-layout-wrapper">
            {/* Main Stream */}
            <div className="main-stream-area">
              <Player streamer={mainStreamer} />
            </div>
            
            {/* Side Streams */}
            <div className="side-streams-area">
              <Player streamer={streamers[1].name} height="calc(50% - 5px)" />
              <Player streamer={streamers[2].name} height="calc(50% - 5px)" />
            </div>
            
            {/* Chat */}
            <div className="chat-area">
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}

        {mode === 'focus' && (
          <div className="grid-layout-wrapper">
            <div className="main-stream-area">
              <Player streamer={mainStreamer} />
            </div>
            <div className="chat-area">
              <div className="focus-buttons" style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
                {streamers.map((s) => (
                  <button 
                    key={s.name} 
                    onClick={() => setMainStreamer(s.name)}
                    style={{ 
                      flex: 1, 
                      padding: '5px', 
                      background: s.name === mainStreamer ? '#00ff7f' : 'rgba(255,255,255,0.1)',
                      color: s.name === mainStreamer ? '#000' : '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      cursor: 'pointer'
                    }}
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
          <div className="grid-layout-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px' }}>
            <Player streamer={streamers[0].name} />
            <Player streamer={streamers[1].name} />
            <Player streamer={streamers[2].name} />
            <div className="chat-area" style={{ width: '100%' }}>
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
