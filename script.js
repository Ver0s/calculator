const addBtn = document.querySelector('#add');
const substractBtn = document.querySelector('#substract');
const multiplyBtn = document.querySelector('#multiply');
const divideBtn = document.querySelector('#divive');
const resultFinal = document.querySelector('#result-final');
const resultPending = document.querySelector('#result-pending');
const buttonsContainer = document.querySelector('.buttons-container');
// function operate(operator, num1, num2) {
// 	switch(operator) {
// 		case ''
// 	}
// }

buttonsContainer.addEventListener('click', e => {
	if (e.target.matches('.num')) {
		resultFinal.textContent = e.target.id;
	}
})

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

// function sum(nums) {
// 	return nums.reduce((prev, current) => prev + current,0);
// };

// function multiply(nums) {
// 	return nums.reduce((prev, current) => prev * current,1);
// };