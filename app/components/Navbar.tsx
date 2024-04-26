"use client";

import { ChangeEvent } from "react";
import { useSettingsStore } from "../lib/zustand";

export default function Navbar() {
  const { isLocal, changeLocal } = useSettingsStore();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeLocal();
  };

  return (
    <div className="w-full h-16 absolute top-0 left-0 border-b border-white/20 bg-neutral-900">
      <div className="size-full container flex items-center justify-end select-none">
        <div className="flex gap-x-1 hover:opacity-80">
          <label
            className="text-sm cursor-pointer font-semibold"
            htmlFor="saveLocal"
          >
            Save in to local storage
          </label>
          <input
            checked={isLocal}
            onChange={changeLocal}
            type="checkbox"
            id="saveLocal"
            className="cursor-pointer accent-secondary"
          />
        </div>
      </div>
    </div>
  );
}
