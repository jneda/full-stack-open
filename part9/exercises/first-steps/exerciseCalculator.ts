interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  exerciseHours: number[];
}

const exerciseCalculator = () => {
  const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error("Not enough arguments");

    const [targetValue, ...rest] = args.slice(2);

    const target = Number(targetValue);
    if (isNaN(target)) {
      throw new Error(`Value "${targetValue}" is not a number`);
    }

    const exerciseHours: number[] = [];
    for (const value of rest) {
      const hours = Number(value);
      if (isNaN(hours)) {
        throw new Error(`Value "${value}" is not a number`);
      }
      exerciseHours.push(hours);
    }

    return { target, exerciseHours };
  };

  const getRatingDescription = (rating: number) => {
    switch (rating) {
      case 1: {
        return "insufficient - more effort is needed";
      }
      case 2: {
        return "not too bad but could be better";
      }
      case 3: {
        return "excellent - you reached the goal";
      }
      default: {
        throw new Error("Unexepected rating value");
      }
    }
  };

  const calculateExercises = (
    exerciseHours: number[],
    target: number
  ): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter((h) => h > 0).length;

    const average =
      exerciseHours.reduce((total, exercise) => total + exercise) /
      periodLength;
    const success = average >= target;
    const rating = success ? 3 : average >= target * 0.75 ? 2 : 1;

    const ratingDescription = getRatingDescription(rating);

    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  };

  try {
    const { target, exerciseHours } = parseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = "An error occurred.";
    if (error instanceof Error) {
      errorMessage = errorMessage.concat(` Error: ${error.message}`);
    }
    console.error(errorMessage);
  }
};

exerciseCalculator();
