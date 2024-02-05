export const updateCache = (cache, query, addedPerson) => {
  const uniqueByName = (persons) => {
    let seen = new Set();
    return persons.filter((person) => {
      const { name } = person;
      return seen.has(name) ? false : seen.add(name);
    });
  };

  cache.updateQuery(query, (data) => {
    return {
      allPersons: uniqueByName(data.allPersons.concat(addedPerson)),
    };
  });
};
