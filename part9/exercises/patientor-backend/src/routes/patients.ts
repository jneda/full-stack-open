import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) =>
  res.send(patientService.getNonSensitivePatients())
);

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatient(id);
  if (patient === undefined) return res.sendStatus(404);
  return res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "An error occurred.";
    if (error instanceof Error) {
      errorMessage = errorMessage.concat(` Error: ${error.message}`);
    }
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
