import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { EntryFormValues, HealthCheckRating, Diagnosis } from "../../types";
import { splitOnUpperCase } from "../../utils";

import DiagnosesSelect from "./DiagnosesSelect";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const isNotNumber = (v: string) => isNaN(Number(v));

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.entries(
  HealthCheckRating
)
  .filter(([key]) => isNotNumber(key))
  .map(([label, value]) => {
    splitOnUpperCase(label);
    return {
      value: value as HealthCheckRating,
      label: splitOnUpperCase(label),
    };
  });

const HealthCheckForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRating).find(
        (v) => v === value
      );
      if (typeof healthCheckRating === "number") {
        setHealthCheckRating(healthCheckRating);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosesForEntry = diagnoses
      .filter((d) => selectedDiagnoses.includes(d.code))
      .map((d) => d.code);
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosesForEntry,
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <DiagnosesSelect
          diagnoses={diagnoses}
          selectedDiagnoses={selectedDiagnoses}
          setSelectedDiagnoses={setSelectedDiagnoses}
        />

        <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
        <Select
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating.toString()}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HealthCheckForm;
