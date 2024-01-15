import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import commentService from "../services/comments";
import { notify } from "./notificationReducer";
import { setUsers } from "./usersReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;

const notifyException = (exception, dispatch) => {
  const errorMessage =
    exception.response && exception.response.data
      ? exception.response.data.error
      : "An unexpected error occurred.";
  dispatch(notify(errorMessage, "error"));
};

export const initializeBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  } catch (error) {
    dispatch(
      notify(`${error.response.statusText}: could not fetch blogs.`, "error"),
    );
  }
};

export const createBlog = (newBlog) => async (dispatch, getState) => {
  try {
    const state = getState();

    const createdBlog = await blogService.create(newBlog);

    dispatch(setBlogs(state.blogs.concat(createdBlog)));

    dispatch(
      setUsers(
        state.users.map((user) => {
          console.log(user.id, createdBlog.user.id);
          if (user.id !== createdBlog.user.id) {
            return user;
          }

          const updatedUser = {
            ...user,
            blogs: user.blogs.concat({
              title: createdBlog.title,
              author: createdBlog.author,
              url: createdBlog.url,
              id: createdBlog.id,
            }),
          };

          return updatedUser;
        }),
      ),
    );

    dispatch(
      notify(`${createdBlog.title} by ${createdBlog.author} added.`, "success"),
    );
  } catch (error) {
    notifyException(error, dispatch);
  }
};

export const updateBlog = (blogUpdate) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { id, ...update } = blogUpdate;

    const updatedBlog = await blogService.update(id, update);

    dispatch(
      setBlogs(
        state.blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)),
      ),
    );

    dispatch(
      notify(
        `${updatedBlog.title} by ${updatedBlog.author} now has ${updatedBlog.likes} like${
          updatedBlog.likes !== 1 ? "s" : ""
        }.`,
        "success",
      ),
    );
  } catch (error) {
    notifyException(error, dispatch);
  }
};

export const deleteBlog = (blog) => async (dispatch, getState) => {
  try {
    const state = getState();
    const { id, title, author } = blog;
    const deletedBlog = await blogService.destroy(id);

    dispatch(setBlogs(state.blogs.filter((b) => b.id !== id)));

    dispatch(
      setUsers(
        state.users.map((user) => {
          if (user.id !== deletedBlog.user) {
            return user;
          }

          const updatedUser = {
            ...user,
            blogs: user.blogs.filter((blog) => {
              return blog.id !== deletedBlog.id;
            }),
          };

          return updatedUser;
        }),
      ),
    );

    dispatch(notify(`${title} by ${author} has been deleted.`, "success"));
  } catch (error) {
    notifyException(error, dispatch);
  }
};

export const createComment = (newComment) => async (dispatch, getState) => {
  try {
    const state = getState();
    const createdComment = await commentService.create(newComment);

    dispatch(
      setBlogs(
        state.blogs.map((blog) => {
          if (blog.id !== createdComment.blog) {
            return blog;
          }

          const commentWithoutBlog = {
            ...createdComment,
          };
          delete commentWithoutBlog.blog;

          const updatedComments = blog.comments.concat(commentWithoutBlog);

          const updatedBlog = {
            ...blog,
            comments: updatedComments,
          };

          return updatedBlog;
        }),
      ),
    );

    dispatch(
      notify(
        `The comment" ${createdComment.content}" has been added.`,
        "success",
      ),
    );
  } catch (error) {
    notifyException(error, dispatch);
  }
};

export default blogSlice.reducer;
