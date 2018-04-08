// My first improvised realization

var generatePrimes = (boundaryNumber) => {
	var array = [], i = 0;

	while (i < boundaryNumber - 1) {
		array[i] = i + 2;
		i++;
	}

	array.forEach((element, i, array) => {
		for (var j = i + 1; j < array.length; j++) {
			if (array[j] % element === 0)
				array.splice(j, 1);
			else
				continue;
		}
	});

	return array;
};

// console.log(generatePrimes(127));

// Second realization, optimized

var generatePrimesOptimized = (boundaryNumber) => {
	var booleanArray = [], outputArray = [], loopLimit = Math.sqrt(boundaryNumber);

	for (var i = 0; i < boundaryNumber; i++) {
		booleanArray.push(true);
	}

	for (var i = 2; i <= loopLimit; 2 * i++) {
		if (booleanArray[i]) {
			for (var j = i * i; j < boundaryNumber; j += i) {
				booleanArray[j] = false;
			}
		}
	}

	for (var i = 2; i < boundaryNumber; i++) {
		if (booleanArray[i]) {
			outputArray.push(i);
		}
	}

	return outputArray;
};

console.log(generatePrimesOptimized(1000000));