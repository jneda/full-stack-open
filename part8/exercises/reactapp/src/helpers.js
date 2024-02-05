const uniqueByTitle = (books) => {
  let seen = new Set();
  return books.filter((book) => {
    const { title } = book;
    return seen.has(title) ? false : seen.add(title);
  });
};

export const updateCache = (cache, query, addedBook) => {
  cache.updateQuery(query, ({ allBooks }) => ({
    allBooks: uniqueByTitle(allBooks.concat(addedBook)),
  }));
};
