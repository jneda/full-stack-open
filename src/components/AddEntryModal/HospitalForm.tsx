import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { EntryFormValues, Diagnosis } from "../../types";

import DiagnosesSelect from "./DiagnosesSelect";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const HospitalForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosesForEntry = diagnoses
      .filter((d) => selectedDiagnoses.includes(d.code))
      .map((d) => d.code);
    onSubmit({
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes: diagnosesForEntry,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
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
        <TextField
          label="Discharge Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label="Discharge Criteria"
          fullWidth
          margin="normal"
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />

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

export default HospitalForm;
