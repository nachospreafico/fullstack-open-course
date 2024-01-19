import "./App.css";

function Hello({ name }) {
  return <p>Hello, {name}!</p>;
}

function App() {
  const a = 1;
  const b = 3;

  return (
    <div>
      <p>
        {a} + {b} = {a + b}
      </p>
      <Hello name="Nacho" />
    </div>
  );
}

export default App;
