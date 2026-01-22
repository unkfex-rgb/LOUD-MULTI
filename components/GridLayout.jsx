
"use client";

import { useState } from "react";
import TwitchPlayer from "./TwitchPlayer";
import TwitchChat from "./TwitchChat";

export default function GridLayout() {
  const [chatWidth, setChatWidth] = useState(360);
  const [resizing, setResizing] = useState(false);

  const startResize = () => setResizing(true);
  const stopResize = () => setResizing(false);

  const resize = (e) => {
    if (!resizing) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 280 && newWidth < 520) {
      setChatWidth(newWidth);
    }
  };

  return (
    <div
      className="grid-root"
      onMouseMove={resize}
      onMouseUp={stopResize}
      onMouseLeave={stopResize}
    >
      {/* Players */}
      <div className="grid-players">
        <div className="main-player">
          <TwitchPlayer channel="loud_coringa" />
        </div>

        <div className="side-players">
          <TwitchPlayer channel="loud_brabox" />
          <TwitchPlayer channel="gabepeixe" />
        </div>
      </div>

      {/* Resizer */}
      <div
        className="chat-resizer"
        onMouseDown={startResize}
      />

      {/* Chat */}
      <div className="grid-chat" style={{ width: chatWidth }}>
        <TwitchChat channel="loud_coringa" />
      </div>
    </div>
  );
}
