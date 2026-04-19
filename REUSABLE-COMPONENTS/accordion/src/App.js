import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App() {
  return (
    <div className="accordion">
      <Accordion items={faqs} />
    </div>
  );
}

function Accordion({ items }) {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          onOpen={setCurOpen}
          curOpen={curOpen}
          title={item.title}
          number={i}
        >
          {item.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ title, desc, number, onOpen, curOpen, children }) {
  // const [isOpen, setIsOpen] = useState(false);
  let isOpen = number === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : number);
  }
  return (
    <div className={isOpen ? "item open" : "item"} onClick={handleToggle}>
      <p className="number">
        {number < 9 ? `0${number + 1}` : `${number + 1}`}
      </p>
      <h3 className="title">{title}</h3>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="description">{children}</div>}
    </div>
  );
}
export default App;
