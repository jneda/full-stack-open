interface RadioInput {
  name: string;
  value: string;
  onChange: () => void;
}

const RadioInput = ({ name, value, onChange }: RadioInput) => {
  return (
    <>
      <label htmlFor={value}>{value}</label>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default RadioInput;
