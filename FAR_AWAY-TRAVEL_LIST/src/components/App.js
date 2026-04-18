import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import ItemList from "./ItemList";
import Footer from "./Footer";

function App() {
  const [initialItems, setInitialItems] = useState([]);
  const clearAll = function () {
    let confirm = window.confirm("Do you want to clear the list?");
    console.log(confirm);
    if (confirm) setInitialItems([]);
  };
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
      <Logo />
      <Form addItem={addItem} />
      <ItemList
        initialItems={initialItems}
        deleteItem={deleteItem}
        handleToggle={handleToggle}
        clearAll={clearAll}
      />
      <Footer items={initialItems} />
    </div>
  );
}
export default App;
