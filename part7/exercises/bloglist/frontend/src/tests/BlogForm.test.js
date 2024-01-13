import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

describe("<BlogForm />", () => {
  test("calls createBlog with the correct data", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector("#title-input");
    const authorInput = container.querySelector("#author-input");
    const urlInput = container.querySelector("#url-input");
    const sendButton = container.querySelector("button");

    const blogData = {
      title: "Doggoes doggoes",
      author: "Jean-Luc Sakamura",
      url: "http://woofwoof.org",
    };

    await user.type(titleInput, blogData.title);
    await user.type(authorInput, blogData.author);
    await user.type(urlInput, blogData.url);
    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual(blogData);
  });
});
