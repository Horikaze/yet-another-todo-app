import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];

interface SettingsState {
  isLocal: boolean;
  changeLocal: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      isLocal: true,
      changeLocal: () => {
        set((state) => ({ isLocal: !state.isLocal }));
      },
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

interface CardState {
  cards: CardType[];
  setCards: (newCards: CardType[]) => void;
}

export const useCardStateStore = create<CardState>()(
  persist(
    (set, get) => ({
      cards: [],
      setCards: (newCards) => {
        set({ cards: newCards });
      },
    }),
    {
      name: "cards",
      storage:
        useSettingsStore.getState().isLocal == true
          ? createJSONStorage(() => sessionStorage)
          : undefined,
    }
  )
);
