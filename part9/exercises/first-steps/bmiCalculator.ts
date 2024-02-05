interface BmiData {
  height: number;
  weight: number;
}

const bmiCalculator = () => {
  const parseArguments = (args: string[]): BmiData => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    const height = parseInt(args[2]);
    const weight = parseInt(args[3]);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error("Provided values were not numbers");
    }

    return { height, weight };
  };

  const getCategory = (bmi: number) => {
    let category;
    if (bmi < 16) {
      category = "Underweight (Severe thinness)";
    } else if (bmi < 17) {
      category = "Underweight (Moderate thinness)";
    } else if (bmi < 18.5) {
      category = "Underweight (Mild thinness)";
    } else if (bmi < 25) {
      category = "Normal range";
    } else if (bmi < 30) {
      category = "Overweight (Pre-obese)";
    } else if (bmi < 35) {
      category = "Obese (Class I) ";
    } else if (bmi < 40) {
      category = "Obese (Class II) ";
    } else {
      category = "Obese (Class III) ";
    }

    return category;
  };

  const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    return getCategory(bmi);
  };

  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "An error occured.";
    if (error instanceof Error) {
      errorMessage = errorMessage.concat(` Error: ${error.message}`);
    }
    console.error(errorMessage);
  }
};

bmiCalculator();
