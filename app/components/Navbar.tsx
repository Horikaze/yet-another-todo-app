"use client";

import { useRef, useState, useTransition } from "react";
import { FaSync } from "react-icons/fa";
import { FiCloud } from "react-icons/fi";
import { syncWithDb } from "../lib/actions";
import { useCardStateStore, useUserStore } from "../lib/zustand";
import Modal from "./Modal";

export default function Navbar() {
  const { cards } = useCardStateStore();
  const { user } = useUserStore();
  const [isPending, startTransition] = useTransition();
  const [syncChanged, setSyncChanged] = useState(false);
  useCardStateStore.subscribe((state) => setSyncChanged(true));

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const syncWithCloud = async () => {
    try {
      startTransition(async () => {
        await syncWithDb({
          cards: cards,
          userId: user!,
        });
      });
      setSyncChanged(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-16 fixed top-0 left-0 border-b border-white/20 bg-neutral-900">
      <div className="size-full container flex gap-4 items-center justify-end select-none md:px-10 px-2">
        {user ? (
          <button
            onClick={syncWithCloud}
            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
          >
            <span>{syncChanged ? "*Sync to cloud" : "Sync to cloud"}</span>
            <FaSync
              className={`${isPending ? "animate-spin" : "animate-none"}`}
            />
          </button>
        ) : null}
        <button
          onClick={openDialog}
          className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
        >
          <span>Save in cloud</span>
          <FiCloud />
        </button>
        {/* <div className="flex gap-x-1 hover:opacity-80">
          <label
            className="text-sm cursor-pointer font-semibold"
            htmlFor="saveLocal"
          >
            Save to local storage
          </label>
          <input
            checked={isLocal}
            onChange={changeLocal}
            type="checkbox"
            id="saveLocal"
            className="cursor-pointer accent-secondary"
          />
        </div> */}
        <Modal dialogRef={dialogRef} />
      </div>
    </div>
  );
}
