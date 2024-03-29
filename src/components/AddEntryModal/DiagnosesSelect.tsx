import React from "react";
import {
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  selectedDiagnoses: string[];
  setSelectedDiagnoses: React.Dispatch<React.SetStateAction<string[]>>;
}

const DiagnosesSelect = ({
  diagnoses,
  selectedDiagnoses,
  setSelectedDiagnoses,
}: Props) => {
  const handleChange = (evt: SelectChangeEvent<typeof selectedDiagnoses>) => {
    const {
      target: { value },
    } = evt;
    setSelectedDiagnoses(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <InputLabel id="demo-multiple-name-label">Diagnoses</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple
        value={selectedDiagnoses}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
      >
        {diagnoses.map((diagnosis) => (
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            {diagnosis.code}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default DiagnosesSelect;
