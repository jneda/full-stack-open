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

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  return getCategory(bmi);
};
