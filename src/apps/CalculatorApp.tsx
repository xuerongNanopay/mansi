import { useState } from "react";
import type { AppComponentProps } from "./types";
import styles from "./CalculatorApp.module.css";

const operators = ["+", "-", "x", "/"] as const;

type Operator = (typeof operators)[number];

function calculate(left: number, operator: Operator, right: number) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "x":
      return left * right;
    case "/":
      return right === 0 ? Number.NaN : left / right;
  }
}

function CalculatorApp({ title }: AppComponentProps) {
  const [leftValue, setLeftValue] = useState("0");
  const [rightValue, setRightValue] = useState("0");
  const [operator, setOperator] = useState<Operator>("+");

  const leftNumber = Number(leftValue);
  const rightNumber = Number(rightValue);
  const result = calculate(leftNumber, operator, rightNumber);
  const hasInvalidInput = Number.isNaN(leftNumber) || Number.isNaN(rightNumber);
  const resultText =
    hasInvalidInput || Number.isNaN(result)
      ? "Invalid"
      : new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(result);

  return (
    <div className={styles.calculatorApp}>
      <h1>{title}</h1>

      <div className={styles.calculator}>
        <input
          aria-label="Left value"
          inputMode="decimal"
          value={leftValue}
          onChange={(e) => setLeftValue(e.currentTarget.value)}
        />

        <select
          aria-label="Operator"
          value={operator}
          onChange={(e) => setOperator(e.currentTarget.value as Operator)}
        >
          {operators.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          aria-label="Right value"
          inputMode="decimal"
          value={rightValue}
          onChange={(e) => setRightValue(e.currentTarget.value)}
        />

        <output className={styles.calculatorResult} aria-label="Result">
          {resultText}
        </output>
      </div>
    </div>
  );
}

export default CalculatorApp;
