import { useState } from "react";

const Statistics = ({ good, neutral, bad, all, average, positiveFeedback }) => {
  return (
    <div>
      <h2>statistics</h2>
      {all === 0 ? (
        <>
          <p>No feedback given</p>
        </>
      ) : (
        <>
          <table>
            <tbody>
              <StatisticLine text={"good"} value={good} />
              <StatisticLine text={"neutral"} value={neutral} />
              <StatisticLine text={"bad"} value={bad} />
              <StatisticLine text={"all"} value={all} />
              <StatisticLine text={"average"} value={average} />
              <StatisticLine text={"positive"} value={positiveFeedback} />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
      <td>{text === "positive" && "%"}</td>
    </tr>
  );
};

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positiveFeedback = good / all;

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <div>
          <Button handler={() => setGood(good + 1)} text={"good"} />
          <Button handler={() => setNeutral(neutral + 1)} text={"neutral"} />
          <Button handler={() => setBad(bad + 1)} text={"bad"} />
        </div>
      </div>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positiveFeedback={positiveFeedback}
      />
    </div>
  );
};

export default App;
