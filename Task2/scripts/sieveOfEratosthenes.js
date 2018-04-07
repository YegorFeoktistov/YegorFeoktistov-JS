var siftNumbers = (boundaryNumber) => {
	var array = [];
	var i = 0;

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

console.log(siftNumbers(127));