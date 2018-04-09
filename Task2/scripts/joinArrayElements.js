let joinArrayElements = (array, splitter) => {
	return array.reduce((sum, current) => {
		return sum + (splitter || ",") + current;
	});
};

let colorArray = ["Red", "Green", "White", "Black"];

console.log(joinArrayElements(colorArray));
console.log(joinArrayElements(colorArray, "+"));

// Using "join" method

console.log(colorArray.join());
console.log(colorArray.join("+"));