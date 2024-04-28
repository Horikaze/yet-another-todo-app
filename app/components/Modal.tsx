import { RefObject, useTransition } from "react";
import { FaSync } from "react-icons/fa";
import { FiCopy, FiUser, FiX } from "react-icons/fi";
import { createNewUser, getCardsFromDb } from "../lib/actions";
import { useCardStateStore, useUserStore } from "../lib/zustand";

type ModalProps = {
  dialogRef: RefObject<HTMLDialogElement>;
};

export default function Modal({ dialogRef }: ModalProps) {
  const { setUser, user } = useUserStore();
  const { setCards } = useCardStateStore();
  const [isPending, startTransition] = useTransition();
  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const generateUser = async () => {
    try {
      if (user) {
        return;
      }
      const res = await createNewUser();
      if (!res) {
        return;
      }
      setUser(res.userId);
    } catch (error) {
      console.log(error);
    }
  };

  const getCards = async (formData: FormData) => {
    try {
      startTransition(async () => {
        const input = formData.get("userId") as string;
        if (input.length !== 5) {
          return;
        }
        setUser(input);
        const res = await getCardsFromDb(formData);
        if (!res) return;
        const cards = JSON.parse(res.cards);
        console.log(cards);
        setCards(cards);
      });
    } catch (error) {
      console.log(error);
    }
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
          className="max-w-sm w-full flex flex-col rounded border border-neutral-700 bg-neutral-800 p-3 z-10"
        >
          <p className=" mb-1 text-sm text-center">Generate ID</p>
          <div className="flex gap-1 h-7">
            <input
              type="text"
              disabled
              value={user ? user : "Click generate"}
              className="w-full text-neutral-400 cursor-text select-text h-full px-2 rounded border border-neutral-700 bg-neutral-800 text-sm  placeholder-violet-300 focus:outline-0"
            />
            <button
              disabled={!!!user}
              onClick={() => {
                navigator.clipboard.writeText(user!);
              }}
              className="flex disabled:bg-neutral-300 items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <FiCopy />
            </button>
            <button
              onClick={generateUser}
              disabled={!!user}
              className="flex items-center disabled:bg-neutral-400 gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Generate</span>
              <FiUser />
            </button>
          </div>
          <div className="w-full h-px bg-neutral-400 my-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-neutral-800 text-sm px-2">OR</span>
            </div>
          </div>
          <p className=" mb-1 text-sm text-center">Paste your ID</p>
          <form action={getCards} className="flex gap-1 h-7">
            <input
              type="text"
              name="userId"
              id="userId"
              placeholder="00000"
              className="w-full text-white cursor-text select-text h-full px-2 rounded border border-neutral-700 bg-neutral-800 text-sm placeholder-neutral-400 focus:outline-0"
            />
            <button
              onClick={generateUser}
              type="submit"
              className="flex items-center whitespace-nowrap disabled:bg-neutral-400 gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Sync from cloud</span>
              <FaSync
                className={`${isPending ? "animate-spin" : "animate-none"}`}
              />
            </button>
          </form>
          <div className="text-neutral-400 text-sm  text-center justify-center items-center my-auto">
            <p>Save your generated code to acces your TODOs on any device!</p>
          </div>
          <div className="flex justify-end">
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
