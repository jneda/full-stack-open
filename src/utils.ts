export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const splitOnUpperCase = (s: string) => {
  const regex = /[A-Z][a-z]*/g;
  const words = s.match(regex);
  if (!words) {
    throw new Error(`Unexpected value: ${s}`);
  }
  return words.join(" ");
};
