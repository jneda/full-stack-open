const listHelper = require("../utils/listHelper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        title: "Doggoes, doggoes!",
        author: "Jean-Luc Nakamura",
        url: "https://doggoes.info",
        likes: 7,
      },
    ];
    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(7);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        title: "Doggoes, doggoes!",
        author: "Jean-Luc Nakamura",
        url: "https://doggoes.info",
        likes: 7,
      },
      {
        title: "Cats rule",
        author: "Pascaline Simpson-Jones",
        url: "https://catsrule.org",
        likes: 9,
      },
      {
        title: "Birds are the best",
        author: "Johnny Sanchez",
        url: "https://pioupiou.sky",
        likes: 8,
      },
    ];

    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(24);
  });
});

describe("favoriteBlog", () => {
  test("of empty list is null", () => {
    const blogs = [];

    const result = listHelper.favoriteBlog(blogs);

    expect(result).toBe(null);
  });

  test("when list has only one blog equals that", () => {
    const blogs = [
      {
        title: "Cats rule",
        author: "Pascaline Simpson-Jones",
        url: "https://catsrule.org",
        likes: 9,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);

    expect(result).toEqual({
      title: "Cats rule",
      author: "Pascaline Simpson-Jones",
      url: "https://catsrule.org",
      likes: 9,
    });
  });

  test("of bigger list equals the correct blog", () => {
    const blogs = [
      {
        title: "Doggoes, doggoes!",
        author: "Jean-Luc Nakamura",
        url: "https://doggoes.info",
        likes: 7,
      },
      {
        title: "Cats rule",
        author: "Pascaline Simpson-Jones",
        url: "https://catsrule.org",
        likes: 9,
      },
      {
        title: "Birds are the best",
        author: "Johnny Sanchez",
        url: "https://pioupiou.sky",
        likes: 8,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);

    expect(result).toEqual({
      title: "Cats rule",
      author: "Pascaline Simpson-Jones",
      url: "https://catsrule.org",
      likes: 9,
    });
  });

  test("of bigger list when several have the same number of likes equals only one blog", () => {
    const blogs = [
      {
        title: "Doggoes, doggoes!",
        author: "Jean-Luc Nakamura",
        url: "https://doggoes.info",
        likes: 7,
      },
      {
        title: "Cats rule",
        author: "Pascaline Simpson-Jones",
        url: "https://catsrule.org",
        likes: 7,
      },
      {
        title: "Birds are the best",
        author: "Johnny Sanchez",
        url: "https://pioupiou.sky",
        likes: 7,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);

    expect(result).toEqual({
      title: "Doggoes, doggoes!",
      author: "Jean-Luc Nakamura",
      url: "https://doggoes.info",
      likes: 7,
    });
  });
});

describe("mostBlogs", () => {
  test("of a bigger list, returns the correct object", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);

    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("of an empty list returns null", () => {
    const blogs = [];

    const result = listHelper.mostBlogs(blogs);

    expect(result).toBe(null);
  });

  test("when list has only one blog returns the correct object", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);

    expect(result).toEqual({ author: "Michael Chan", blogs: 1 });
  });

  test("when several authors have the same blog count returns only one", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);

    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 2 });
  });
});

describe("mostLikes", () => {
  test("of a big list returns the correct object", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(blogs);

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("when list has only one blog return the correct object", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(blogs);

    expect(result).toEqual({ author: "Michael Chan", likes: 7 });
  });

  test("of empy list returns null", () => {
    const blogs = [];

    const result = listHelper.mostLikes(blogs);

    expect(result).toBe(null);
  });

  test("when several authors have the max number of likes returns only one", () => {
    const blogs = [
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 12,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(blogs);

    expect(result).toEqual({ author: "Robert C. Martin", likes: 12 });
  });
});
