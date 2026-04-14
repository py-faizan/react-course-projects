import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [initialItems, setInitialItems] = useState([]);

  const addItem = (newItem) => {
    setInitialItems((initialItems) => [...initialItems, newItem]);
  };
  const deleteItem = (id) => {
    const afterFiter = initialItems.filter((item) => item.id !== id);
    setInitialItems((initialItems) => [...afterFiter]);
  };
  const handleToggle = function (id) {
    setInitialItems((initialItems) =>
      initialItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  };

  return (
    <div>
      <Header />
      <Form addItem={addItem} />
      <ItemList
        initialItems={initialItems}
        deleteItem={deleteItem}
        handleToggle={handleToggle}
      />
      <Footer items={initialItems} />
    </div>
  );
}
function Header() {
  return (
    <div className="header">
      <h1>FAR AWAY</h1>
    </div>
  );
}

function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (description === "") return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    addItem(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need 😍 for your trip</h3>
        <select
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item ......"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button>ADD</button>
      </form>
    </div>
  );
}
function ItemList({ initialItems, deleteItem, handleToggle }) {
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
      <div>
        <form className="sort">
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
          <button className="clearbutton">Clear All</button>
        </form>
      </div>
    </div>
  );
}
function Item({ item, deleteItem, handleToggle }) {
  return (
    <li>
      <input
        className="checkbox"
        type="checkbox"
        checked={item.packed}
        onChange={() => handleToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}

function Footer({ items }) {
  if (!items.length) return <h1 className="footer">Please add some items</h1>;
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  console.log(percentage);
  return (
    <h1 className="footer">
      {percentage === 100
        ? "You've everything ready to go ✈️"
        : `We have ${numItems} items in the list and we have alreay packed ${numPacked} 
      (${percentage})%`}
    </h1>
  );
}
export default App;
