"use client";

export default function Footer() {
  return (
    <footer>
      <span
        className="dev"
        onClick={() =>
          window.open("https://www.instagram.com/corintia420/", "_blank")
        }
      >
        Dev by Corintia420
      </span>
    </footer>
  );
}
