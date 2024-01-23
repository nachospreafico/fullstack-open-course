import axios from "axios";

const baseURL = "http://localhost:3000/persons";

export function fetchData() {
  return axios
    .get(baseURL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

export function addPerson(newName, newNumber) {
  return fetchData().then((persons) => {
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (!existingPerson) {
      const person = { name: newName, number: newNumber };
      return axios.post(baseURL, person).then((response) => {
        console.log(response);
        return response.data;
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Do you want to update the old number?`
        )
      ) {
        return updateEntry(existingPerson.id, newName, newNumber).then(() => {
          console.log(`Number for ${newName} updated successfully.`);
        });
      } else {
        // User chose not to update, you might want to handle this case accordingly
        console.log(`User chose not to update the number for ${newName}.`);
        return null; // You might want to return some indication here
      }
    }
  });
}

export function deleteEntry(id) {
  return axios.delete(`${baseURL}/${id}`);
}

function updateEntry(id, newName, newNumber) {
  const updatedPerson = { name: newName, number: newNumber };
  return axios.put(`${baseURL}/${id}`, updatedPerson);
}
