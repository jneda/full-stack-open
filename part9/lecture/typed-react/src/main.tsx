import ReactDOM from "react-dom/client";

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps) => (
  <h1>Hello, {props.name}</h1>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Welcome name="Sarah" />
);
