import { useState } from "react";
import "./styles.css";

function App() {
  const [bill, setBill] = useState("");
  const [personVal, setPersonVal] = useState(0);
  const [friendVal, setFriendVal] = useState(0);

  function handleBillChange(e) {
    setBill(Number(e.target.value));
  }
  let totallTip = (bill * (personVal + friendVal)) / 2 / 100;

  const totalbill = bill + totallTip;

  console.log(totalbill);

  function handleClear() {
    const clear = window.confirm("Do you want to clear?");
    if (clear) {
      setBill("");
      setPersonVal(0);
      setFriendVal(0);
    }
  }
  function handlePersonChange(e) {
    setPersonVal(Number(e.target.value));
  }
  function handleFriendChange(e) {
    setFriendVal(Number(e.target.value));
  }

  return (
    <div>
      <Bill bill={bill} onbillChange={handleBillChange} />
      <Person onPersonChange={handlePersonChange} personVal={personVal} />
      <Friend onFriendChange={handleFriendChange} friendVal={friendVal} />
      <Description bill={bill} totallbill={totalbill} totallTip={totallTip} />
      <Clear onClear={handleClear} totallbill={totalbill} />
    </div>
  );
}

function Bill({ bill, onbillChange }) {
  return (
    <div className="bill">
      <label>Enter your Bill: </label>
      <input
        onChange={onbillChange}
        value={bill}
        type="number"
        placeholder="Enter amount..."
      />
    </div>
  );
}

function Person({ onPersonChange, personVal }) {
  return (
    <div className="person">
      <label>How much you like the services: </label>
      <select onChange={onPersonChange} value={personVal}>
        <option value={0}>Disatisfied(0%)</option>
        <option value={5}>It was ok(5%)</option>
        <option value={10}>It was good(10%)</option>
        <option value={20}>Absolutely Amazing(20%)</option>
      </select>
    </div>
  );
}
function Friend({ friendVal, onFriendChange }) {
  return (
    <div className="friend">
      <label>How much your friend liked the services: </label>
      <select value={friendVal} onChange={onFriendChange}>
        <option value={0}>Disatisfied(0%)</option>
        <option value={5}>It was ok(5%)</option>
        <option value={10}>It was good(10%)</option>
        <option value={20}>Absolutely Amazing(20%)</option>
      </select>
    </div>
  );
}
function Description({ bill, totallTip, totallbill }) {
  return (
    bill > 0 && (
      <div className="desc">
        {
          <h3>
            Your bill is {totallbill} ({bill} + {totallTip})
          </h3>
        }
      </div>
    )
  );
}
function Clear({ onClear, totallbill }) {
  return (
    totallbill > 0 && (
      <div className="clearButton">
        <button onClick={onClear}>Clear</button>
      </div>
    )
  );
}

export default App;
