import { useSelector } from "react-redux";

const UsersPage = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h2>Users</h2>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.blogs.length} blogs created
        </li>
      ))}
    </>
  );
};

export default UsersPage;
