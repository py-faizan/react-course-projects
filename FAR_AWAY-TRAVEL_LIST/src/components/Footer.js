export default function Footer({ items }) {
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
