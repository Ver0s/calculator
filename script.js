function add(num1, num2) {
	return num1+num2;
};

function substract(num1, num2) {
	return num1-num2;
};

function sum(nums) {
	return nums.reduce((prev, current) => prev + current,0);
};

function multiply(nums) {
	return nums.reduce((prev, current) => prev * current,1);
};