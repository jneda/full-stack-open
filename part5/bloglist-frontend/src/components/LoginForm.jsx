const LoginForm = ({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  onLogin,
}) => {
  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={onLogin}>
        <div>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={onUsernameChange}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default LoginForm;
