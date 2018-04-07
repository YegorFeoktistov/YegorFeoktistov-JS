var changeLettersCase = (string) => {
	return string.split("").map((letter) => {
		return letter === letter.toUpperCase()
		? letter.toLowerCase()
		: letter.toUpperCase()
	}).join("");
};

console.log(changeLettersCase("Deus Lo Vult"));