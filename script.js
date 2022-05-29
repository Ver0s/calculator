const nums = document.querySelectorAll('[data-num]');
const operators = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-equals]');
const reset = document.querySelector('[data-reset]');
const del = document.querySelector('[data-del]');
const buttonsContainer = document.querySelector('.buttons-container');
const resultCurrent = document.querySelector('#result-current')
const resultEquation = document.querySelector('#result-equation')

let currentNum = '';
let previousNum = '';
let operator = '';

populateDisplay(resultCurrent, 0);

// EVENT HANDLING

nums.forEach(num => num.addEventListener('click', (e) => {
    if (operator === '') {
        setNum(e, 'currentNum');
    } else {
        populateDisplay(resultCurrent, currentNum);
        setNum(e, 'previousNum');
    }
}))

operators.forEach(operator => operator.addEventListener('click', setOperator));

equals.addEventListener('click', () => {
    result = operate(operator, currentNum, previousNum);
    populateDisplay(resultCurrent, result);
    populateDisplay(resultEquation, `${currentNum} ${operator} ${previousNum} = ${result}`);
    currentNum = result;
    previousNum = '';
    operator = '';
})

reset.addEventListener('click', resetCalc);

del.addEventListener('click', deleteNum)

function deleteNum() {
    currentNum = currentNum.toString().slice(0, -1)
    populateDisplay(resultCurrent, currentNum);
}

function resetCalc() {
    populateDisplay(resultCurrent, 0);
    populateDisplay(resultEquation, '');
    currentNum = '';
    previousNum = '';
    operator = '';
}

function setNum(e, num) {
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
        case '=':
            currentNum = operate(operator, currentNum, previousNum);
            populateDisplay(resultCurrent, currentNum);

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
    currentNum = Number(currentNum);
    previousNum = Number(previousNum);
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
