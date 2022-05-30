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

// todo: get rid of 0 at the beggining of number if it's integer e.g 01 + 2, line 88
// add functionality so dot can be clicked only once
// fix division by 0

// EVENT HANDLING
operators.forEach(operatorBtn => operatorBtn.addEventListener('click', (e) => {
    if (allSet()) {
        evaluateResult();
    } 
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

nums.forEach(num => num.addEventListener('click', (e) => {
    if (operator === '') {
        setNum(e, 'currentNum');
    } else {
        populateDisplay(resultCurrent, currentNum);
        setNum(e, 'previousNum');
    }
}))

reset.addEventListener('click', resetCalc);
del.addEventListener('click', deleteNum);

function allSet() {
    if (currentNum !== '' && previousNum !== '' && operator !== '') {
        return true;
    } else {
        return false;
    }
}

function evaluateResult() {
    if (previousNum === '') {
        previousNum = currentNum;
    }
    result = roundNum(operate(operator, currentNum, previousNum), 3);
    populateDisplay(resultCurrent, result);
    populateDisplay(resultEquation, `${currentNum} ${operator} ${previousNum} = `);
    currentNum = result;
    previousNum = '';
    operator = '';
}

function deleteNum() {
    currentNum = currentNum.toString().slice(0, -1);
    if (currentNum === '') {
        currentNum = '0';
    }
    populateDisplay(resultCurrent, currentNum);
}

function resetCalc() {
    currentNum = '0';
    previousNum = '';
    operator = '';
    populateDisplay(resultCurrent, currentNum);
    populateDisplay(resultEquation, '');
}

function setNum(e, num) {
    // FIX THIS
    // if (currentNum.charAt(1) !== '.') {
    //     console.log('dupa')
    //     currentNum.replace(currentNum.charAt(0), '');
    // }
    
    if (num === 'currentNum') {
        currentNum += e.target.textContent;
        populateDisplay(resultCurrent, currentNum);
    }
    if (num === 'previousNum') {
        previousNum += e.target.textContent;
        populateDisplay(resultCurrent, previousNum);
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
        // case '=':
            // currentNum = operate(operator, currentNum, previousNum);
            // populateDisplay(resultCurrent, currentNum);

    }
}

function populateDisplay(element, content) {
    return element.textContent = content;
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