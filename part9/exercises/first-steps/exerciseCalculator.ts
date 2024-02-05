interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

export const calculateExercises = (
  exerciseHours: number[],
  target: number
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((h) => h > 0).length;

  const average =
    exerciseHours.reduce((total, exercise) => total + exercise) / periodLength;
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
