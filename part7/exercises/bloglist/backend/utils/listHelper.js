const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  let maxVote = -Infinity;
  let favoriteBlog = null;

  blogs.forEach((b) => {
    if (b.likes > maxVote) {
      maxVote = b.likes;
      favoriteBlog = b;
    }
  });

  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  let maxBlogs = -Infinity;

  const reducer = (obj, blog) => {
    const { author } = blog;
    if (obj[author] === undefined) obj[author] = { author };

    if (obj[author].blogs === undefined) obj[author].blogs = 0;
    obj[author].blogs++;

    if (obj[author].blogs > maxBlogs) maxBlogs = obj[author].blogs;

    return obj;
  };

  const blogsPerAuthor = blogs.reduce(reducer, {});

  const mostBlogsAuthor = Object.values(blogsPerAuthor).find(
    (a) => a.blogs === maxBlogs
  );

  return mostBlogsAuthor || null;
};

const mostLikes = (blogs) => {
  let maxLikes = -Infinity;

  const reducer = (obj, blog) => {
    const { author, likes } = blog;
    if (obj[author] === undefined) obj[author] = { author };

    if (obj[author].likes === undefined) obj[author].likes = 0;
    obj[author].likes += likes;

    if (obj[author].likes > maxLikes) maxLikes = obj[author].likes;

    return obj;
  };

  const likesPerAuthor = blogs.reduce(reducer, {});

  const mostLikedAuthor = Object.values(likesPerAuthor).find(
    (a) => a.likes === maxLikes
  );

  return mostLikedAuthor || null;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
