const Blog = require("../models/blog");
const User = require("../models/user");

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

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    url: "http://goingnowhere.com",
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => (await Blog.find({})).map((b) => b.toJSON());

const usersInDb = async () => (await User.find({})).map((u) => u.toJSON());

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb };
