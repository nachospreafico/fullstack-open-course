import React from "react";

const NumbersList = ({ persons, filteredList }) => {
  return (
    <div>
      {filteredList.length > 0
        ? filteredList.map((person, index) => {
            return (
              <p key={index}>
                {person.name} {person.number}
              </p>
            );
          })
        : persons.map((person, index) => {
            return (
              <p key={index}>
                {person.name} {person.number}
              </p>
            );
          })}
    </div>
  );
};

export default NumbersList;
