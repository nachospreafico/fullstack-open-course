import { useEffect } from "react";
import { useState } from "react";
import AddForm from "../components/AddForm";
import NumbersList from "../components/NumbersList";
import Filter from "../components/Filter";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  function handleAddPerson() {
    if (!checkDuplicates()) {
      setPersons((prevState) => {
        return [...prevState, { name: newName, number: newNumber }];
      });
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to the phonebook.`);
    }
  }

  function checkDuplicates() {
    return persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
  }

  function filterPhonebook(filter) {
    setFilteredList(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }

  function fetchData() {
    return fetch("http://localhost:3000/persons")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching data.");
        }
        return res.json();
      })
      .then((data) => data)
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchData().then((data) => setPersons(data));
  }, []);

  return (
    <div>
      {" "}
      <h2>Phonebook</h2>
      <Filter filterPhonebook={filterPhonebook} />
      <h3>add a new</h3>
      <AddForm
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
        handleAddPerson={handleAddPerson}
      />
      <h3>Numbers</h3>
      <NumbersList filteredList={filteredList} persons={persons} />
    </div>
  );
}

export default App;
