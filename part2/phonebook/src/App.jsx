import { useState, useEffect } from "react";
import personService from "./services/personService";

import Search from "./components/Search";
import Form from "./components/Form";
import NumbersDisplay from "./components/NumbersDisplay";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      return updatePerson(existingPerson, newPerson);
    }

    personService
      .create(newPerson)
      .then((createdPerson) => setPersons(persons.concat(createdPerson)));
  };

  const updatePerson = (existingPerson, newPerson) => {
    const message = `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`;
    if (!window.confirm(message)) {
      return;
    }
    
    personService.update(existingPerson.id, newPerson).then((updatedPerson) => {
      const updatedPersons = persons.map((p) =>
        p.id !== existingPerson.id ? p : updatedPerson
      );
      setPersons(updatedPersons);
    });
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleDeletionFor = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!window.confirm(`Delete ${person.name} ?`)) {
      return;
    }

    personService.destroy(id).then(() => {
      const updatedPersons = persons.filter((p) => p.id !== id);
      setPersons(updatedPersons);
    });
  };

  const shownPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <>
      <h2>Phonebook</h2>
      <Search filter={filter} setFilter={setFilter} />
      <Form
        persons={persons}
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <NumbersDisplay
        persons={shownPersons}
        handleDeletionFor={handleDeletionFor}
      />
    </>
  );
};

export default App;
