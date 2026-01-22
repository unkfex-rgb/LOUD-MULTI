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
      <ModeMenu mode={mode} setMode={setMode} />
      <main>
        {mode === 'grid' && (
          <div className="grid-container">
            <div className="grid-main">
              <Player streamer={mainStreamer} />
            </div>
            <div className="grid-side">
              <Player streamer={streamers[1].name} height="48%" />
              <Player streamer={streamers[2].name} height="48%" />
            </div>
            <div className="chat-container">
              <div className="chat-resize"></div>
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}

        {mode === 'focus' && (
          <div className="focus-container">
            <Player streamer={mainStreamer} big />
            <div className="focus-buttons">
              {streamers.map((s) => (
                <button key={s.name} onClick={() => setMainStreamer(s.name)}>
                  {s.name}
                </button>
              ))}
            </div>
            <div className="chat-container">
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}

        {mode === 'auto' && (
          <div className="auto-container">
            {streamers.map((s) => (
              <Player key={s.name} streamer={s.name} />
            ))}
            <div className="chat-container">
              <div className="chat-buttons">
                {streamers.map((s) => (
                  <button key={s.name} onClick={() => setChatStreamer(s.name)}>
                    {s.name}
                  </button>
                ))}
              </div>
              <Chat streamer={chatStreamer} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
