const AddForm = ({
  newNumber,
  newName,
  setNewNumber,
  setNewName,
  addPerson,
  setPersons,
  persons,
  setNotification,
}) => {
  return (
    <form>
      <div>
        <label htmlFor="newName">name:</label>
        <input
          type="text"
          id="newName"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
        />
        <label htmlFor="newNumber">number:</label>
        <input
          type="text"
          id="newNumber"
          onChange={(e) => setNewNumber(e.target.value)}
          value={newNumber}
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addPerson(newName, newNumber)
              .then(() => {
                setPersons(persons);
                console.log("Contact added succesfully.");
              })
              .then(() => {
                setNotification({
                  success: true,
                  message: `${newName} successfully added to list.`,
                });
                setNewName("");
                setNewNumber("");
                setTimeout(
                  () => setNotification({ success: true, message: null }),
                  5000
                );
              })
              .catch((error) => {
                console.log(error);
                setNotification({
                  success: false,
                  message: `${newName} has already been deleted from the server.`,
                });
              });
          }}
        >
          add
        </button>
      </div>
    </form>
  );
};

export default AddForm;
