import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const OccupationalHealthcareForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: EntryFormValues = {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName,
    };
    if (sickLeaveStartDate && sickLeaveEndDate) {
      newEntry.sickLeave = {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
      };
    }
    onSubmit(newEntry);
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
        <TextField
          label="Employer Name"
          fullWidth
          margin="normal"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="Sick Leave Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <TextField
          label="Sick Leave End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
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

export default OccupationalHealthcareForm;
