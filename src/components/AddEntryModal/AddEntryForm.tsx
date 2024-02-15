import { useState } from "react";

import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { EntryFormValues, EntryTypes, Diagnosis } from "../../types";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import { splitOnUpperCase } from "../../utils";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const entryTypeOptions = Object.values(EntryTypes).map((v) => v.toString());

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState(entryTypeOptions[0]);

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      setEntryType(value);
    }
  };

  let form;
  switch (entryType) {
    case "HealthCheck": {
      form = (
        <HealthCheckForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      );
      break;
    }
    case "Hospital": {
      form = (
        <HospitalForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      );
      break;
    }
    case "OccupationalHealthcare": {
      form = (
        <OccupationalHealthcareForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      );
      break;
    }
    default:
      throw new Error(`Unexpected value: ${entryType}`);
  }

  return (
    <div>
      <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
      <Select
        label="Entry Type"
        fullWidth
        value={entryType}
        onChange={onEntryTypeChange}
      >
        {entryTypeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {splitOnUpperCase(option)}
          </MenuItem>
        ))}
      </Select>
      {form}
    </div>
  );
};

export default AddEntryForm;
