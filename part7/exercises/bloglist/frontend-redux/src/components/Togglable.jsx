import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import { Button } from "@mui/material";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));

  return (
    <>
      <div className="togglable">
        <div style={hideWhenVisible}>
          <Button
            onClick={toggleVisibility}
            data-cy="show-togglable-btn"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            {buttonLabel}
          </Button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <Button
            onClick={toggleVisibility}
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Togglable.displayName = Togglable;

export default Togglable;
