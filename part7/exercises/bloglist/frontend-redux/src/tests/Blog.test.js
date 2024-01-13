import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("<Blog />", () => {
  let container;
  const onLike = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "Doggoes doggoes",
      author: "Jean-Luc Sakamoto",
      url: "http://woofwoof.org",
      likes: 7,
      user: {
        name: "Serge Han-Ris",
      },
    };

    container = render(
      <Blog blog={blog} onLike={onLike} user={{}} onDelete={() => {}} />,
    ).container;
  });

  test("it should not render the URL or number of likes by default", () => {
    const blogDetailsDiv = container.querySelector(".blogDetails");
    expect(blogDetailsDiv).toHaveStyle("display: none");
  });

  test("it should display the URL and number of likes when the button controlling shown details has been clicked", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    const blogDetailsDiv = container.querySelector(".blogDetails");
    expect(blogDetailsDiv).not.toHaveStyle("display: none");
  });

  test("it should call the update like function twice when the like button is clicked twice", async () => {
    // open blog details div
    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    const likeButton = screen.getByText("Like");
    for (let i = 0; i < 2; i++) await user.click(likeButton);

    expect(onLike.mock.calls).toHaveLength(2);
  });
});
