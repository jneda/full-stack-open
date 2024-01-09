import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(function Togglable({ buttonLabel, children }, refs) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
