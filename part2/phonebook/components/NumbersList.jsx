const NumbersList = ({
  persons,
  setPersons,
  filteredList,
  deleteEntry,
  setFilteredList,
  setNotification,
}) => {
  const style = { display: "flex", flexDirection: "row", gap: "1rem" };

  function handleDelete(name, id) {
    if (
      window.confirm(`Are you sure you want to delete ${name} from your list?`)
    ) {
      deleteEntry(id)
        .then(() => {
          if (filteredList.length > 0) {
            setFilteredList((prevPersons) =>
              prevPersons.filter((person) => person.id !== id)
            );
            console.log(`Contact ${name} was successfully deleted.`);
            setNotification({
              success: true,
              message: `${name} was successfully deleted.`,
            });
            setTimeout(
              () => setNotification({ success: true, message: null }),
              5000
            );
          } else {
            setPersons((prevPersons) =>
              prevPersons.filter((person) => person.id !== id)
            );
            console.log(`Contact ${name} was successfully deleted.`);
            setNotification({
              success: true,
              message: `${name} was successfully deleted.`,
            });
            setTimeout(
              () => setNotification({ success: true, message: null }),
              5000
            );
          }
        })
        .catch((error) => {
          console.error(
            "Error deleting entry:",
            error.response?.data || error.message
          );
          setNotification({
            success: false,
            message: `${name} has already been deleted from the server.`,
          });
          setTimeout(
            () => setNotification({ success: true, message: null }),
            5000
          );
        });
    } else {
      console.log("Deletion canceled by the user.");
    }
  }

  return (
    <div>
      {filteredList.length > 0
        ? filteredList.map((person, index) => {
            return (
              <div key={index} style={style}>
                <p>
                  {person.name} {person.number}
                </p>
                <button onClick={() => handleDelete(person.name, person.id)}>
                  delete
                </button>
              </div>
            );
          })
        : persons.map((person, index) => {
            return (
              <div key={index} style={style}>
                <p>
                  {person.name} {person.number}
                </p>
                <button onClick={() => handleDelete(person.name, person.id)}>
                  delete
                </button>
              </div>
            );
          })}
    </div>
  );
};

export default NumbersList;
