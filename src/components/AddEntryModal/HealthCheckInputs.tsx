import { useState } from "react";
import TextField from "@mui/material/TextField";

const HealthCheckInputs = () => {
  const [healthCheckRating, setHealthCheckRating] = useState<string>();

  return (
    <TextField
      label="Health Check Rating"
      fullWidth
      value={healthCheckRating}
      onChange={({ target }) => setHealthCheckRating(target.value)}
    />
  );
};

export default HealthCheckInputs;
