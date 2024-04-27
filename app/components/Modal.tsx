import { User } from "@prisma/client";
import { RefObject, useRef, useState } from "react";
import { FiCopy, FiUser, FiX } from "react-icons/fi";
import { createNewUser } from "../lib/actions";

type ModalProps = {
  dialogRef: RefObject<HTMLDialogElement>;
};

export default function Modal({ dialogRef }: ModalProps) {
  const [user, setuser] = useState<User | null>(null);
  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const generateUser = async () => {
    const res = await createNewUser();
    setuser(res);
  };
  return (
    <dialog
      id="dialog"
      className="size-full relative items-center backdrop:bg-neutral-900/20 text-neutral-50 backdrop:backdrop-blur-sm bg-neutral-900/20"
      ref={dialogRef}
    >
      <div
        className="flex items-center justify-center size-full"
        onClick={closeDialog}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-sm w-full min-h-52 flex flex-col rounded border border-neutral-700 bg-neutral-800 p-3 z-10"
        >
          <div className="flex gap-1 h-7">
            <input
              type="text"
              disabled
              value={user ? user.userId : "Click generate"}
              className="w-full text-neutral-400 cursor-text select-text h-full px-2 rounded border border-neutral-700 bg-neutral-800 text-sm  placeholder-violet-300 focus:outline-0"
            />
            <button
              disabled={user ? false : true}
              onClick={() => {
                navigator.clipboard.writeText(user?.userId!);
              }}
              className="flex disabled:bg-neutral-300 items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <FiCopy />
            </button>
            <button
              onClick={generateUser}
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Generate</span>
              <FiUser />
            </button>
          </div>
          <div className="mt-auto">
            <button
              onClick={closeDialog}
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Close</span>
              <FiX />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
