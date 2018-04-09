// My first improvised realization

let generatePrimes = (boundaryNumber) => {
	let array = [], i = 0;

	while (i < boundaryNumber - 1) {
		array[i] = i + 2;
		i++;
	}

	array.forEach((element, i, array) => {
		for (let j = i + 1; j < array.length; j++) {
			if (array[j] % element === 0)
				array.splice(j, 1);
			else
				continue;
		}
	});

	return array;
};

console.log(generatePrimes(127));

// Second realization, optimized

let generatePrimesOptimized = (boundaryNumber) => {
	let booleanArray = [], outputArray = [], loopLimit = Math.sqrt(boundaryNumber);

	for (let i = 0; i < boundaryNumber; i++) {
		booleanArray.push(true);
	}

	for (let i = 2; i <= loopLimit; 2 * i++) {
		if (booleanArray[i]) {
			for (let j = i * i; j < boundaryNumber; j += i) {
				booleanArray[j] = false;
			}
		}
	}

	for (let i = 2; i < boundaryNumber; i++) {
		if (booleanArray[i]) {
			outputArray.push(i);
		}
	}

	return outputArray;
};

console.log(generatePrimesOptimized(1000000));