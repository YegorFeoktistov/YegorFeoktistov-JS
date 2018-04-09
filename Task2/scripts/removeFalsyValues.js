let removeFalsyValues = (array) => {
	return array.filter((element) => {
		return !!element;
	});
};

console.log(removeFalsyValues([NaN, 0, 15, false, -22, '',undefined, 47, null]));