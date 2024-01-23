import { useEffect } from "react";
import { useState } from "react";
import AddForm from "../components/AddForm";
import NumbersList from "../components/NumbersList";
import Filter from "../components/Filter";
import { fetchData, addPerson, deleteEntry } from "../api";

const Notification = ({ notification, setNotification }) => {
  if (notification.message === null) {
    return null;
  }
  return (
    <div className={`${notification.success ? "success-msg" : "error-msg"}`}>
      <p>{notification.message}</p>
      <div
        onClick={() => setNotification({ success: true, message: null })}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          color: "red",
          fontWeight: "700",
        }}
      >
        X
      </div>
    </div>
  );
};

function App() {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [notification, setNotification] = useState({
    success: true,
    message: null,
  });

  if (!persons) {
    return null;
  }

  /* function handleAddPerson() {
    if (!checkDuplicates()) {
      setPersons((prevState) => {
        return [...prevState, { name: newName, number: newNumber }];
      });
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to the phonebook.`);
    }
  } */

  function filterPhonebook(filt) {
    setFilteredList(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filt.toLowerCase())
      )
    );
  }

  useEffect(() => {
    fetchData()
      .then((data) => setPersons(data))
      .catch((error) => {
        console.log(error);
      });
  }, [persons]);

  return (
    <div>
      {" "}
      <h2>Phonebook</h2>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Filter filterPhonebook={filterPhonebook} />
      <h3>add a new</h3>
      <AddForm
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        setPersons={setPersons}
        persons={persons}
        setNotification={setNotification}
      />
      <h3>Numbers</h3>
      <NumbersList
        filteredList={filteredList}
        setFilteredList={setFilteredList}
        persons={persons}
        deleteEntry={deleteEntry}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
}

export default App;
