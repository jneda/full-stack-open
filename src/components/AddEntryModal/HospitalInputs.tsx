import { useState } from "react";
import TextField from "@mui/material/TextField";

const HospitalInputs = () => {
  const [dischargeDate, setDischargeDate] = useState<string>();
  const [dischargeCriteria, setDischargeCriteria] = useState<string>();

  return (
    <>
      <TextField
        label="Discharge Date"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
    </>
  );
};

export default HospitalInputs;
