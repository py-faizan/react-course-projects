import { useState } from "react";
import Item from "./App";

export default function ItemList({
  initialItems,
  deleteItem,
  handleToggle,
  clearAll,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = initialItems;
  else if (sortBy === "ascending") {
    sortedItems = initialItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems = initialItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
    console.log(sortedItems);
  }

  return (
    <div className="List">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            deleteItem={deleteItem}
            handleToggle={handleToggle}
          />
        ))}
      </ul>
      <div className="sort">
        <form>
          <select
            name="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option name="input" value="input">
              Input Order
            </option>
            <option name="ascending" value="ascending">
              Ascending Order
            </option>
            <option name="packed" value="packed">
              Packed Status
            </option>
          </select>
        </form>
        <button className="clearbutton" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
}
