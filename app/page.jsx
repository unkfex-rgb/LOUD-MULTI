
"use client";

import { useState } from "react";
import GridLayout from "../components/GridLayout";
import FocusLayout from "../components/FocusLayout";
import AutoLayout from "../components/AutoLayout";
import ModeMenu from "../components/ModeMenu";

export default function Home() {
  const [mode, setMode] = useState("grid");

  return (
    <>
      <ModeMenu mode={mode} setMode={setMode} />

      {mode === "grid" && <GridLayout />}
      {mode === "focus" && <FocusLayout />}
      {mode === "auto" && <AutoLayout />}
    </>
  );
}
