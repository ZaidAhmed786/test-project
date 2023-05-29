import "./App.css";

import data from "./data.json";
import {  useRef, useState } from "react";

function App() {
  const checkboxParentEleRef = useRef(null);
  const [resultData, setResultData] = useState({
    applicable_items: [],
    applied_to: "",
    name: "",
    rate: 0,
  });

  // handlers
  const handleClickOnItem = (e, item) => {
    if (e.target.checked) {
      if (!resultData.applicable_items.find((it) => it.id === item.id)) {
        setResultData((prevData) => {
          return {
            ...prevData,
            applicable_items: [...prevData.applicable_items, item.id],
          };
        });
      }
    } else {
      setResultData((prevData) => {
        prevData.applicable_items = prevData.applicable_items.filter(
          (it) => it !== item.id
        );
        return { ...prevData };
      });
    }
    // const
  };
  const handleApplyForRadioOnChange = (e) => {
    const type = e.target.value;
    setResultData((prevData) => {
      prevData.applied_to = type;
      return prevData;
    });
    if (type === "all" && checkboxParentEleRef.current) {
      const itemsEle = checkboxParentEleRef.current.querySelectorAll(
        "input[type=checkbox]"
      );
      Array.from(itemsEle).forEach((item) => {
        if (!item.checked) {
          item.click();
        }
      });
    }
  };
  const handleChangeOnTaxInputs = (e) => {
    setResultData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const handleClickOnAddTaxBtn = () => {
    console.log(resultData);
  };

  return (
    <div className="App">
      <h1>Add tax</h1>
      <div className="tax-container">
        <input
          type="text"
          className="tax-name"
          placeholder="name"
          name="name"
          onChange={handleChangeOnTaxInputs}
        />
        <div className="tax-bar">
          <input
            type="number"
            placeholder="tax"
            name="rate"
            onChange={handleChangeOnTaxInputs}
          />
          <span>%</span>
        </div>
      </div>
      <div className="conditions">
        <input
          type="radio"
          id="firstCheckbox"
          name="applyFor"
          value="all"
          onChange={handleApplyForRadioOnChange}
          disabled={!resultData.name || !resultData.rate ? true : false}
        />
        <label htmlFor="firstCheckbox">
          Apply for all items in collections
        </label>
      </div>
      <div className="conditions" style={{ marginBottom: "18px" }}>
        <input
          type="radio"
          id="SecondCheckbox"
          name="applyFor"
          value="some"
          onChange={handleApplyForRadioOnChange}
          disabled={!resultData.name || !resultData.rate ? true : false}
        />
        <label htmlFor="SecondCheckbox">Apply to specific items</label>
      </div>
      <hr />
      <div>
        <input type="text" placeholder="Search items" className="search" />
      </div>
      <ul ref={checkboxParentEleRef} style={{ marginBottom: "48px" }}>
        {data.map((item, i) => {
          return (
            <li key={i.toString()}>
              <input
                id={item.id}
                type="checkbox"
                onChange={(e) => handleClickOnItem(e, item)}
                disabled={!resultData.name || !resultData.rate ? true : false}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </li>
          );
        })}
      </ul>
      <hr />
      <button onClick={handleClickOnAddTaxBtn} style={{ marginTop: "18px" }}>
        Add Tax to {resultData.applicable_items.length} item(s)
      </button>
    </div>
  );
}

export default App;
