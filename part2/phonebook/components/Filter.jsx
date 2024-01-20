import React from "react";

const Filter = ({ filterPhonebook }) => {
  return (
    <div>
      filter shown with
      <input
        type="text"
        id="filter"
        onChange={(e) => filterPhonebook(e.target.value)}
      ></input>
    </div>
  );
};

export default Filter;
