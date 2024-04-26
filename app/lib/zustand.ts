import { create } from "zustand";

interface CardState {
  cards: CardType[];
  setCards: (newCards: CardType[]) => void;
}

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

export const useCardStateStore = create<CardState>((set, get) => ({
  cards: [],
  setCards: (newCards) => {
    set({ cards: newCards });
    localStorage.setItem("cards", JSON.stringify(newCards));
  },
}));

const storedCards = localStorage.getItem("cards");
if (storedCards) {
  const parsedCards = JSON.parse(storedCards);
  useCardStateStore.setState({ cards: parsedCards });
}
