import React, { useState } from "react";
import "../style/btn.css";

const ButtonC: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedButton(event.target.value);
  };

  return (
    <div className="genral">
      <div className="btn1">
        <label htmlFor="">
          {selectedButton === "Afridi" ? "Afridi 1" : "Afridi"}
        </label>
        <input
          type="radio"
          name="btn"
          value="Afridi"
          onChange={handleRadioChange}
        />
      </div>

      <div className="btn2">
        <label htmlFor="">
          {selectedButton === "Babar" ? "Babar 1" : "Babar"}
        </label>
        <input
          type="radio"
          name="btn"
          value="Babar"
          onChange={handleRadioChange}
        />
      </div>

      <div className="btn3">
        <label htmlFor="">
          {selectedButton === "Shaheen" ? "Shaheen 1" : "Shaheen"}
        </label>
        <input
          type="radio"
          name="btn"
          value="Shaheen"
          onChange={handleRadioChange}
        />
      </div>
      <button>Cast Vote</button>
    </div>
  );
};

export default ButtonC;
