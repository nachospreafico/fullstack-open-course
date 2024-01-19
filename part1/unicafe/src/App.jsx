import { useState } from "react";

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={average ? average : 0} />
        <StatisticLine text={"positive"} value={positive ? positive : 0} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "positive" && "%"}
      </td>
    </tr>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good + neutral) / all;
  const positive = good / all;

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <div>
          <Button text={"good"} handler={() => setGood(good + 1)}></Button>
          <Button
            text={"neutral"}
            handler={() => setNeutral(neutral + 1)}
          ></Button>
          <Button text={"bad"} handler={() => setBad(bad + 1)}></Button>
        </div>

        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      </div>
    </div>
  );
}

export default App;
