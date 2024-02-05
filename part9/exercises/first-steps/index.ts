import express from "express";
import qs from "qs";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.set("query parser", (str: string) => qs.parse(str));
app.use(express.json());

app.get("/hello", (_req, res) => res.send("Hello Full Stack!"));

app.get("/bmi", (req, res) => {
  try {
    const { weight, height } = req.query;
    if (!weight || !height) throw new Error("A query parameter is missing");

    const parsedWeight = Number(weight);
    const parsedHeight = Number(height);
    if (isNaN(parsedWeight) || isNaN(parsedHeight))
      throw new Error("Malformatted parameters: must be numbers");

    res.json({
      weight: parsedWeight,
      height: parsedHeight,
      bmi: calculateBmi(parsedHeight, parsedWeight),
    });
  } catch (error: unknown) {
    let errorMessage = "An error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (
    typeof target !== "number" ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((value) => typeof value !== "number")
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  return res.send(
    calculateExercises(
      daily_exercises.map((v) => Number(v)),
      Number(target)
    )
  );
});

const PORT = 3002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
