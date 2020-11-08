async function getColour() {
	const modeTotal = 1;
	const mode = 2;
	const modeCorrected = 3;
	const calculatedColors = {
		totalColor: modeTotal,
		croppedColor: mode,
		finalColor: modeCorrected,
	};

	return calculatedColors;
}

module.exports = {
	getColour: getColour,
};
