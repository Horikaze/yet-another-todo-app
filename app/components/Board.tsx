import React from "react";
import Column from "./Column";
import DeleteCard from "./DeleteCard";

export default function Board() {
  return (
    <div className="flex size-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
      />
      <Column title="TODO" column="todo" headingColor="text-yellow-200" />
      <Column title="In progress" column="doing" headingColor="text-blue-200" />
      <Column title="Complete" column="done" headingColor="text-emerald-200" />
      <DeleteCard />
    </div>
  );
}
