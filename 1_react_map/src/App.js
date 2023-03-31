import logo from "./logo.svg";
import "./App.css";

import Counter from "./components/Counter";
import DeckGLMap from "./components/DeckGLMap";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="To Learn"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Counter />
      </header> */}
      <DeckGLMap />
    </div>
  );
}

export default App;
