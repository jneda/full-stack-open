import { useSelector } from "react-redux";

const UserPage = ({ userId }) => {
  const users = useSelector((state) => state.users);

  if (!userId) return null;

  const user = users.find((user) => user.id === userId);

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserPage;
