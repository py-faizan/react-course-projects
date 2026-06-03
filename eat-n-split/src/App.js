import { use, useState } from "react";
import "./styles.css";
import image from "./126-noel00289.jpg";

function App() {
  const [addOn, setAddOn] = useState(true);
  const [addUiOpen, setAddUiOpen] = useState(false);
  const [splitterOn, setSplitterOn] = useState(false);
  const [splitBillWith, setSplitBillWith] = useState(null);
  const [billpayer, setBillpayer] = useState("you");
  const [finalPassingAmount, setFinlPassingAmount] = useState("");
  const [splitbillClicked, setSplitbillClicked] = useState(false);

  const [profiles, setProfiles] = useState([
    {
      name: "Ahmad",
      photolink: "https://tinywebs.site/nFW900",
      selected: false,
      status: "",
    },
    {
      name: "Faizan",
      photolink: "https://tinywebs.site/nFW900",
      selected: false,
      status: "",
    },
    {
      name: "Faizan",
      photolink: "https://tinywebs.site/nFW900",
      selected: false,
      status: "",
    },
  ]);
  function handleAddFriendClick() {
    setAddOn((addOn) => !addOn);
    setAddUiOpen((addUiOpen) => !addUiOpen);
  }
  function handleAddFriendSubmitClick(name, url) {
    setProfiles((profiles) => [...profiles, { name, photolink: url }]);
    handleAddFriendClick();
  }

  function handleSelectClick(index) {
    setSplitterOn(true);
    setSplitBillWith(index);
    setProfiles((profiles) =>
      profiles.map((profile, i) => ({
        ...profile,
        selected: i === index,
      })),
    );
  }
  function handleChangeBillPayer(currBillPayer) {
    setBillpayer(currBillPayer);
  }
  function handleSplitSubmit(bill, expense, splitBillWith) {
    setSplitbillClicked(true);

    const amount = billpayer === "you" ? bill - expense : expense;

    setFinlPassingAmount(amount);

    const temp =
      billpayer === "you"
        ? `${splitBillWith} owes you ${amount}`
        : `You owe ${splitBillWith} ${amount}`;

    setProfiles((profiles) =>
      profiles.map((profile) =>
        profile.selected ? { ...profile, status: temp } : profile,
      ),
    );
  }
  return (
    <div className="main-container">
      <ProfileList
        onAddFriendSubmitClick={handleAddFriendSubmitClick}
        onAddFriendClick={handleAddFriendClick}
        profiles={profiles}
        addOn={addOn}
        addUiOpen={addUiOpen}
        onSelectClick={handleSelectClick}
        finalPassingAmount={finalPassingAmount}
        splitBillWith={splitBillWith}
        billpayer={billpayer}
        splitbillClicked={splitbillClicked}
      />
      {/* <AddFriend addUiOpen={addUiOpen} /> */}

      <Splitter
        billpayer={billpayer}
        splitterOn={splitterOn}
        splitBillWith={profiles[splitBillWith]?.name}
        onChangeBillPayer={handleChangeBillPayer}
        onSplitSubmit={handleSplitSubmit}
      />
    </div>
  );

  function ProfileList({
    billpayer,
    onAddFriendClick,
    addOn,
    profiles,
    onAddFriendSubmitClick,
    addUiOpen,
    onSelectClick,
    finalPassingAmount,
    splitBillWith,
    splitbillClicked,
  }) {
    return (
      <div className="profile-list">
        {profiles.map((profile, i) => (
          <Profile
            billpayer={billpayer}
            onSelectClick={onSelectClick}
            index={i}
            name={profile.name}
            photolink={profile.photolink}
            finalPassingAmount={finalPassingAmount}
            splitBillWith={splitBillWith}
            splitbillClicked={splitbillClicked}
            status={profile.status}
          />
        ))}
        <AddFriend
          onAddFriendSubmitClick={onAddFriendSubmitClick}
          addUiOpen={addUiOpen}
        />
        <button onClick={onAddFriendClick} className="addfriend-button">
          {addOn === true ? "Add Friend" : "close"}
        </button>
      </div>
    );
  }

  function Profile({
    billpayer,
    splitBillWith,
    finalPassingAmount,
    onSelectClick,
    index,
    photolink,
    name,
    splitbillClicked,
    status,
  }) {
    return (
      <div className="profile">
        <img src={photolink}></img>
        <div className="name-div">
          <p>{name}</p>

          <p>{status || `You and ${name} are even`}</p>
        </div>
        <button onClick={(e) => onSelectClick(index)} className="select-button">
          Select
        </button>
      </div>
    );
  }

  function AddFriend({ addUiOpen, onAddFriendSubmitClick }) {
    const [name, setName] = useState("");
    const [imgurl, setImgurl] = useState("");
    return (
      addUiOpen && (
        <div className="addimage-div">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddFriendSubmitClick(name, imgurl);
            }}
          >
            <div className="form-row">
              <label>🍴 Friend Name:</label>
              <input
                name="friend-name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label>📷 Image Url:</label>
              <input
                name="img-url"
                value={imgurl}
                type="text"
                onChange={(e) => setImgurl(e.target.value)}
              />
            </div>
            <button type="submit" className="addimage-button">
              Add
            </button>
          </form>
        </div>
      )
    );
  }
}

function Splitter({
  onSplitSubmit,
  onChangeBillPayer,
  splitBillWith,
  splitterOn,
  billpayer,
}) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  function handleBillChange(e) {
    setBill(e.target.value);
  }
  function handleExpenseChange(e) {
    setExpense(e.target.value);
  }
  return (
    splitterOn && (
      <div className="splitter-div">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 🚨 stops page reload
            onSplitSubmit(Number(bill), Number(expense), splitBillWith);
            setBill("");
            setExpense("");
          }}
        >
          <p>Split a bill with {splitBillWith}</p>
          <div className="form-row">
            <label>💰 Bill value:</label>
            <input value={bill} onChange={handleBillChange} type="number" />
          </div>
          <div className="form-row">
            <label>🤑 Your expense:</label>
            <input
              value={expense}
              onChange={handleExpenseChange}
              type="number"
            />
          </div>
          <div className="form-row">
            <p>{`${splitBillWith}'s expense: `}</p>
            <p>{expense === "" ? bill : bill - expense}</p>
          </div>
          <div className="form-row">
            <label>👥 Who's paying the bill:</label>
            <select
              value={billpayer}
              onChange={(e) => {
                e.preventDefault();
                onChangeBillPayer(e.target.value);
              }}
            >
              <option value="you">You</option>
              <option value="friend">{splitBillWith}</option>
            </select>
          </div>
          <button type="submit" className="split-bill-button">
            Split Bill
          </button>
        </form>
      </div>
    )
  );
}

export default App;
