import { FaGithub } from "react-icons/fa";
import Board from "./components/Board";

export default function Home() {
  return (
    <main className="size-full">
      <Board />
      <a
        href="https://github.com/Horikaze/yet-another-todo-app"
        className="fixed bottom-5 right-5"
        target="_blank"
      >
        <FaGithub className="size-10" />
      </a>
    </main>
  );
}
