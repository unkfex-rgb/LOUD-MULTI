
"use client";

export default function Chat({ streamer }) {
  return (
    <iframe
      src={`https://www.twitch.tv/embed/${streamer}/chat?parent=loud-multi.vercel.app`}
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
    ></iframe>
  );
}
