import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "../style/vote.css";
import ButtonC from "../pages/btn";

const Vote: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="content">
      <div className="form">
        <p className="nam">Name: Musawer</p>
        <p className="Cms">CMS: 021-21-0038</p>
        <p className="dept">Department: Computer Science</p>
        <div className="check">
          <input
            type="checkbox"
            style={{ transform: "scale(1.5)", marginRight: "10px" }}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      <div className="btns">{isChecked && <ButtonC />}</div>
    </div>
  );
};

export default Vote;
