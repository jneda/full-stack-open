const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Doggoes, doggoes!",
    author: "Jean-Luc Nakamura",
    url: "https://doggoes.info",
    likes: 6,
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
    likes: 8,
  },
];

const blogsInDb = async () => (await Blog.find({})).map((b) => b.toJSON());

module.exports = { initialBlogs, blogsInDb };
