
export default function TwitchPlayer({ channel }) {
  return (
    <div className="player-wrapper">
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}&muted=true`}
        allowFullScreen
        frameBorder="0"
      />
    </div>
  );
}
