import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = ({ target }) => setValue(target.value);

  return {
    type,
    value,
    onChange,
  };
};

const App = () => {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <div>
      <form>
        Name: <input {...name} />
        <br />
        Birth date: <input {...born} />
        <br />
        Height: <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};

export default App;
