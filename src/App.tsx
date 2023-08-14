import "./styles.css";
import { useState } from "react";
import { useMemo } from "react";

const rangeColor = { display: "flex", justifyContent: "space-between" };

export default function App() {
  const [state, setState] = useState({
    red: 0,
    green: 0,
    blue: 0
  });

  const rgbaColorString = useMemo(
    () => `rgba(${state.red}, ${state.green}, ${state.blue})`,
    [state.red, state.green, state.blue]
  );

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    color: "red" | "green" | "blue"
  ) => {
    setState((state) => ({
      ...state,
      [color]: e.target.value
    }));
  };

  const handleCopyColor = () => {
    if (navigator) {
      navigator.clipboard.writeText("test");
    }
  };

  const handleRandomizeColors = () => {
    setState((state) => ({
      ...state,
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255)
    }));
  };

  return (
    <div className="App">
      <div
        style={{
          height: 100,
          background: rgbaColorString,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color:
            Number(`0x${state.red}${state.green}${state.blue}`) > 0xaaaaaa
              ? "#000000"
              : "#ffffff"
        }}
      >
        {rgbaColorString}
      </div>

      <div className="container my-4">
        <div>
          <div style={rangeColor}>
            <input
              className="form-range"
              type="range"
              value={state.red}
              min={0}
              max={255}
              onChange={(e) => handleColorChange(e, "red")}
            />
            <div className="text-danger">{state.red}</div>
          </div>
        </div>

        <div style={rangeColor}>
          <input
            type="range"
            className="form-range"
            value={state.green}
            min={0}
            max={255}
            onChange={(e) => handleColorChange(e, "green")}
          />
          <div className="text-success">{state.green}</div>
        </div>

        <div style={rangeColor}>
          <input
            className="form-range"
            type="range"
            value={state.blue}
            min={0}
            max={255}
            onChange={(e) => handleColorChange(e, "blue")}
          />
          <div className="text-secondary">{state.blue}</div>
        </div>

        <div className="mt-2">
          <button className="btn btn-primary" onClick={() => handleCopyColor()}>
            Copy
          </button>
        </div>
        <div className="mt-2">
          <button
            className="btn btn-primary"
            onClick={() => handleRandomizeColors()}
          >
            Randomize
          </button>
        </div>
      </div>
    </div>
  );
}
