import express from "express";
import qs from "qs";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.set("query parser", (str: string) => qs.parse(str));

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

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
