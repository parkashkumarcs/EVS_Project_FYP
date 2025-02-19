import React from "react";
import "../styles/optionMenu.css";
interface OptionsMenuProps {
  selectedOption: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  selectedOption,
  handleChange,
}) => {
  const departments = [
    "CS",
    "BBA",
    "AF",
    "B.Ed",
    "Media",
    "EE",
    "AI",
    "SE",
    "Mathematics",
    "Agree Business",
  ];

  return (
    <div className="options-menu">
      <label>Select the Department:</label>
      <select
        className="dept"
        name="department"
        value={selectedOption}
        onChange={handleChange}
      >
        <option className="opt" value="">
          Select Department
        </option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <button
        style={{
          backgroundColor: "rgb(0, 208, 194, 0.9);",
          marginTop: "10px",
          marginLeft: "1.6rem",
          borderRadius: "5px",
          width: "19.6rem",
        }}
      >
        Generate Report
      </button>
    </div>
  );
};

export default OptionsMenu;
