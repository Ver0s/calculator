const addBtn = document.querySelector('#add');
const substractBtn = document.querySelector('#substract');
const multiplyBtn = document.querySelector('#multiply');
const divideBtn = document.querySelector('#divive');
const resultCurrent = document.querySelector('#result-current');
const resultEquation = document.querySelector('#result-equation');
const buttonsContainer = document.querySelector('.buttons-container');

let nums = [];


// HANDLE ALL BUTTONS EVENTS
buttonsContainer.addEventListener('click', e => {
	if (e.target.matches('.num')) {
		nums.push(e.target.id);
		populateDisplay(resultCurrent, nums);
	} else if (e.target.matches('#del')) {
		console.log('del');
	} else if (e.target.matches('#equal')) {
		console.log('equal');
	} else if (e.target.matches('#reset')) {
		console.log('reset');
	} 
	// add ifs for equation types
})

// MATH HANDLING
function add(num1, num2) {
	return num1 + num2;
};

function substract(num1, num2) {
	return num1 - num2;
};

function multiply(num1,num2) {
	return num1 * num2;
}

function divide(num1,num2) {
	return num1 / num2;
}

function operate(operator, num1, num2) {
	switch(operator) {
		case 'add':
			return add(num1,num2);
		case 'substract':
			return substract(num1,num2);
		case 'multiply':
			return multiply(num1,num2);
		case 'divide':
			return divide(num1,num2);
		default:
			console.log('error');
	}
}

function populateDisplay(element, content) {
	if (Array.isArray(content)) {
		element.textContent = content.join('');
	} else {
		element.textContent = content;
	}
}