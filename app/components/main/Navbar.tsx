export default function Navbar() {
  return (
    <div className="w-full h-16 absolute top-0 left-0 border-b border-text/10 bg-background">
      <div className="size-full container flex items-center justify-end select-none">
        <div className="flex gap-x-1 hover:opacity-80">
          <label className="text-sm cursor-pointer font-semibold" htmlFor="saveLocal">
            Save in to local storage
          </label>
          <input type="checkbox" id="saveLocal" className="cursor-pointer accent-secondary" />
        </div>
      </div>
    </div>
  );
}
