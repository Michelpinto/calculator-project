'use strict';

// Selectors and objects

const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display__screen');
const keys = calculator.querySelector('.operations');
const operators = document.querySelector('.operators');

const calculatorObj = {
  displayCalc: '0',
  num1: null,
  waitingForNum2: false,
  operator: null,
};

// Functions and events

const inputDigit = function (digit) {
  // Simple destructuring to make the code shorter
  const { displayCalc, waitingForNum2 } = calculatorObj;

  if (waitingForNum2 === true) {
    calculatorObj.displayCalc = digit;
    calculatorObj.waitingForNum2 = false;
  } else {
    calculatorObj.displayCalc =
      displayCalc === '0' ? digit : displayCalc + digit;
  }

  console.log(calculatorObj);
};

function inputDecimal(dot) {
  if (calculatorObj.waitingForNum2 === true) {
    calculatorObj.displayCalc = '0.';
    calculatorObj.waitingForNum2 = false;
    return;
  }

  if (!calculatorObj.displayCalc.includes(dot)) {
    calculatorObj.displayCalc += dot;
  }
}

function handleOperator(nextOp) {
  const { num1, displayCalc, operator } = calculatorObj;
  // parseFloat method converts string into a floating-point number
  const inputValue = parseFloat(displayCalc);

  if (num1 === null && !isNaN(inputValue)) {
    calculatorObj.num1 = inputValue;
  } else if (operator) {
    const result = calculate(num1, inputValue, operator);

    calculatorObj.displayCalc = `${parseFloat(result.toFixed(6))}`;
    calculatorObj.num1 = result;
  }

  calculatorObj.waitingForNum2 = true;
  calculatorObj.operator = nextOp;
  console.log(calculatorObj);
}

// Calculations function
function calculate(num1, num2, operator) {
  if (operator === '+') {
    return num1 + num2;
  } else if (operator === '-') {
    return num1 - num2;
  } else if (operator === '*') {
    return num1 * num2;
  } else if (operator === '/') {
    return num1 / num2;
  }

  return num2;
}

// Reset the display
function clearDisplay() {
  calculatorObj.displayCalc = '0';
  calculatorObj.num1 = null;
  calculatorObj.waitingForNum2 = false;
  calculatorObj.operator = null;
  console.log(calculatorObj);
}

function updateDisplay() {
  // Update the number show in display box
  display.value = calculatorObj.displayCalc;
}
updateDisplay();

keys.addEventListener('click', e => {
  // Button click events
  const key = e.target;
  const action = key.dataset.action;

  if (!key.matches('button')) {
    return;
  }

  // Refactoring the code to make it easier to add new functions.

  // if (key.classList.contains('operators')) {
  //   handleOperator(key.value);
  //   updateDisplay();
  //   return;
  // }

  // if (action === 'decimal') {
  //   console.log('decimal');
  //   inputDecimal(key.value);
  //   updateDisplay();
  //   return;
  // }

  // if (action === 'clear') {
  //   clearDisplay();
  //   updateDisplay();
  //   return;
  // }

  // console.log('digit', key.value);
  // inputDigit(key.value);

  switch (key.value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(key.value);
      break;
    case '.':
      inputDecimal(key.value);
      break;
    case 'clear':
      clearDisplay();
      break;
    default:
      if (Number.isInteger(parseFloat(key.value))) {
        inputDigit(key.value);
      }
  }

  updateDisplay();
});
