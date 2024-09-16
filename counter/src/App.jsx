import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);
  let add = () => {
    if (counter == 20) {
      setCounter(counter);
    } else {
      setCounter(counter + 1);
    }
    console.log("counter value: " + counter);
  };
  let rem = () => {
    if (counter == 0) {
      setCounter(counter);
    } else {
      setCounter(counter - 1);
    }
    console.log("counter value: " + counter);
  };
  return (
    <>
      <h1>Counter project started</h1>
      <h2>Count value: {counter}</h2>
      <button onClick={add}>Increase counter</button>
      <br /> <br />
      <button onClick={rem}>Decrease counter</button>
    </>
  );
}

export default App;
