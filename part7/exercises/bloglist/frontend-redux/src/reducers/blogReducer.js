import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify } from "./notificationReducer";
import { initializeUsers } from "./usersReducer";

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
      notify(`${createdBlog.title} by ${createdBlog.author} added.`, "success"),
    );

    dispatch(initializeUsers());
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
    await blogService.destroy(id);
    dispatch(setBlogs(state.blogs.filter((b) => b.id !== id)));

    dispatch(notify(`${title} by ${author} has been deleted.`, "success"));

    dispatch(initializeUsers());
  } catch (error) {
    notifyException(error, dispatch);
  }
};

export default blogSlice.reducer;
