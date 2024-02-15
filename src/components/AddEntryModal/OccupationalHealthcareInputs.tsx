import { useState } from "react";
import TextField from "@mui/material/TextField";

const OccupationalHealthcareInputs = () => {
  const [employerName, setEmployerName] = useState<string>();
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>();
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>();
  return (
    <>
      <TextField
        label="Employer Name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <TextField
        label="Sick Leave Start Date"
        fullWidth
        value={sickLeaveStartDate}
        onChange={({ target }) => setSickLeaveStartDate(target.value)}
      />
      <TextField
        label="Sick Leave End Date"
        fullWidth
        value={sickLeaveEndDate}
        onChange={({ target }) => setSickLeaveEndDate(target.value)}
      />
    </>
  );
};

export default OccupationalHealthcareInputs;
