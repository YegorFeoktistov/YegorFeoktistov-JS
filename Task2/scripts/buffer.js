function makeBuffer() {
	var data = "";
	return function(value) {
		value !== undefined ? data += value : data;
		return data;
	}
}

var buffer = makeBuffer();

buffer("Замыкание");
buffer(" Использовать");
buffer(" Нужно!");
console.log(buffer());


var buffer = makeBuffer();

buffer("0");
buffer("1");
buffer("0");
console.log(buffer());