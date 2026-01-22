
export default function TwitchChat({ channel }) {
  return (
    <div className="chat-wrapper">
      <iframe
        src={`https://www.twitch.tv/embed/${channel}/chat?parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}`}
        frameBorder="0"
      />
    </div>
  );
}
