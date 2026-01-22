
"use client";

import { useState } from "react";
import TwitchPlayer from "./TwitchPlayer";
import TwitchChat from "./TwitchChat";

const streamers = ["loud_coringa", "loud_brabox", "gabepeixe"];

export default function AutoLayout() {
  const [chat, setChat] = useState("loud_coringa");

  return (
    <div className="auto-root">
      <div className="auto-players">
        {streamers.map((s) => (
          <TwitchPlayer key={s} channel={s} />
        ))}
      </div>

      <div className="auto-chat">
        <div className="chat-selector">
          {streamers.map((s) => (
            <button
              key={s}
              className={chat === s ? "active" : ""}
              onClick={() => setChat(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <TwitchChat channel={chat} />
      </div>
    </div>
  );
}
