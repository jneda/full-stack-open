import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "./useNotification";
import blogService from "../services/blogs";

export const useBlogs = () => {
  const notify = useNotify();

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,

    onSuccess: (createdBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(createdBlog));
      notify(`${createdBlog.title} by ${createdBlog.author} added.`, "success");
    },

    onError: (exception) => {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      notify(errorMessage, "error");
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,

    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
      );
      notify(
        `${updatedBlog.title} by ${updatedBlog.author} now has ${updatedBlog.likes} like${
          updatedBlog.likes !== 1 ? "s" : ""
        }.`,
        "success",
      );
    },

    onError: (exception) => {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      notify(errorMessage, "error");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.destroy,

    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id !== deletedBlog.id),
      );
      notify(
        `${deletedBlog.title} by ${deletedBlog.author} has been deleted.`,
        "success",
      );
    },

    onError: (exception) => {
      const errorMessage = exception.response
        ? exception.response.data.error
        : "An unexpected error occurred.";
      notify(errorMessage, "error");
    },
  });

  const blogs = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const createBlog = (newBlog) => newBlogMutation.mutate(newBlog);

  const updateBlog = (blogUpdate) => updateBlogMutation.mutate(blogUpdate);

  const deleteBlog = (blogToDelete) => deleteBlogMutation.mutate(blogToDelete);

  return { blogs, createBlog, updateBlog, deleteBlog };
};
