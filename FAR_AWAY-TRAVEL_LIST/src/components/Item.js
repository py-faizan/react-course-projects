export default function Item({ item, deleteItem, handleToggle }) {
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
