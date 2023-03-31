import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState("macaco");

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count} </p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
