"use client";
import React, { useState } from "react";
import Board from "./Board";

export default function Kanban() {
  const [cards, setCards] = useState([]);
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
}
