const AddForm = ({
  newNumber,
  newName,
  setNewNumber,
  setNewName,
  handleAddPerson,
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
            handleAddPerson();
          }}
        >
          add
        </button>
      </div>
    </form>
  );
};

export default AddForm;
