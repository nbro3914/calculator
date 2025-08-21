import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("0");

  const append = (val) => {
    setInput((prev) => (prev === "0" ? String(val) : prev + String(val)));
  };

  const clearAll = () => setInput("0");

  const backspace = () =>
    setInput((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));

  const addDot = () => {
   
    const parts = input.split(/([+\-*/])/);
    const last = parts[parts.length - 1];
    if (!last.includes(".")) append(".");
  };

  const addOp = (op) => {
    setInput((prev) => {
      if (/[+\-*/.]$/.test(prev)) return prev.replace(/[+\-*/.]+$/, op);
      return prev + op;
    });
  };

  const equals = () => {
    try {
      const safe = input.replace(/[^0-9+\-*/.]/g, "");
      if (/[+\-*/.]$/.test(safe)) return;
      
      const result = eval(safe);
      setInput(
        result === Infinity || Number.isNaN(result) ? "Error" : String(result)
      );
    } catch {
      setInput("Error");
      setTimeout(() => setInput("0"), 800);
    }
  };

  const Btn = ({ children, onClick, className = "" }) => (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );

  return (
    <div className="wrap">
      <div className="calc">
        <div className="screen" aria-label="display">{input}</div>
        <div className="grid">
          <Btn className="span2 muted" onClick={clearAll}>C</Btn>
          <Btn className="muted" onClick={backspace}>⌫</Btn>
          <Btn className="op" onClick={() => addOp("/")}>÷</Btn>

          <Btn onClick={() => append(7)}>7</Btn>
          <Btn onClick={() => append(8)}>8</Btn>
          <Btn onClick={() => append(9)}>9</Btn>
          <Btn className="op" onClick={() => addOp("*")}>×</Btn>

          <Btn onClick={() => append(4)}>4</Btn>
          <Btn onClick={() => append(5)}>5</Btn>
          <Btn onClick={() => append(6)}>6</Btn>
          <Btn className="op" onClick={() => addOp("-")}>−</Btn>

          <Btn onClick={() => append(1)}>1</Btn>
          <Btn onClick={() => append(2)}>2</Btn>
          <Btn onClick={() => append(3)}>3</Btn>
          <Btn className="op" onClick={() => addOp("+")}>+</Btn>

          <Btn className="span2" onClick={() => append(0)}>0</Btn>
          <Btn onClick={addDot}>.</Btn>
          <Btn className="equals" onClick={equals}>=</Btn>
        </div>
      </div>
    </div>
  );
}
