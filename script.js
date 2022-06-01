const nums = document.querySelectorAll('[data-num]');
const operators = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-equals]');
const reset = document.querySelector('[data-reset]');
const del = document.querySelector('[data-del]');
const buttonsContainer = document.querySelector('.buttons-container');
const resultCurrent = document.querySelector('#result-current')
const resultEquation = document.querySelector('#result-equation')

let currentNum = '0';
let previousNum = '';
let operator = '';

populateDisplay(resultCurrent, currentNum);

// EVENT HANDLING
operators.forEach(operatorBtn => operatorBtn.addEventListener('click', (e) => {
    if (allSet()) {
        evaluateResult();
    }
    nums.forEach(num => {
        if (num.textContent === '.') {
            num.addEventListener('click', handleNumClick);
        }
    })
    setOperator(e);
    populateDisplay(resultEquation, `${currentNum} ${operator}`);
}));

equals.addEventListener('click', () => {
    if (currentNum !== '' && previousNum === '' && operator !== '') {
        previousNum = currentNum;
        evaluateResult();
    } 
    else if (allSet()) {
        evaluateResult();
    }
});

nums.forEach(num => num.addEventListener('click', handleNumClick));

reset.addEventListener('click', resetCalc);
del.addEventListener('click', deleteNum);

// BUTTON LOGIC
function handleNumClick(e) {
    if (operator === '') {
        setNum(e, 'currentNum');
    } else {
        populateDisplay(resultCurrent, currentNum);
        setNum(e, 'previousNum');
    }
}

function deleteNum() {
    if (previousNum === '') {
        currentNum = currentNum.toString().slice(0, -1);
        if (currentNum === '') {
            currentNum = '0';
        }
        populateDisplay(resultCurrent, currentNum);
    } else {
        previousNum = previousNum.toString().slice(0, -1);
        if (previousNum === '') {
            previousNum = '0';
        }
        populateDisplay(resultCurrent, previousNum);
    }
}

function resetCalc() {
    currentNum = '0';
    previousNum = '';
    operator = '';
    populateDisplay(resultCurrent, currentNum);
    populateDisplay(resultEquation, '');
}

// DISPLAY
function populateDisplay(element, content) {
    return element.textContent = content;
}

// GENERAL LOGIC
function allSet() {
    if (currentNum !== '' && previousNum !== '' && operator !== '') {
        return true;
    } else {
        return false;
    }
}

function evaluateResult() {
    // This enables the ability to calculate result if we want both nums to be the same
    if (previousNum === '') {
        previousNum = currentNum;
    }
    result = roundNum(operate(operator, currentNum, previousNum), 3);
    populateDisplay(resultCurrent, result);
    populateDisplay(resultEquation, `${currentNum} ${operator} ${previousNum} = `);
    currentNum = result;
    watchDecimalPoint(currentNum);
    previousNum = '';
    operator = '';
}

function setNum(e, num) {
    if (num === 'currentNum') {
        currentNum += e.target.textContent;
        watchDecimalPoint(currentNum);
        //this is to prevent 0 at the beginning of currentNum 
        if ((currentNum.length > 1) && (currentNum.charAt(0) === '0') && (currentNum.charAt(1) !== '.')) {
            currentNum = currentNum.slice(1);
        }
        populateDisplay(resultCurrent, currentNum);
    }
    if (num === 'previousNum') {
        previousNum += e.target.textContent;
        watchDecimalPoint(previousNum);
        if ((previousNum.length > 1) && (previousNum.charAt(0) === '0') && (previousNum.charAt(1) !== '.')) {
            previousNum = previousNum.slice(1);
        }
        populateDisplay(resultCurrent, previousNum);
    }    
}

function watchDecimalPoint(number) {
    if ((number.toString().split(".").length - 1 >= 1)) {
        nums.forEach(num => {
            if (num.textContent === '.') {
                num.removeEventListener('click', handleNumClick);
            }
        })
    }
}

// MATH HANDLING
function add(num1, num2) {
    return num1 + num2;
};

function substract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return substract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            console.log('error');
    }
}

function setOperator(e) {
    switch (e.target.textContent) {
        case '+':
            operator = '+';
            break;
        case '-':
            operator = '-';
            break;
        case 'x':
            operator = 'x';
            break;
        case '/':
            operator = '/';
            break;
    }
}

function roundNum(num, decimalPlaces) {
    if (typeof num !== 'number') {
        num = Number(num)
    }

    if (Number.isInteger(num)) {
        return num
    } else {
        return parseFloat(num.toFixed(decimalPlaces)); 
    }
}