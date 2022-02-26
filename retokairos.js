// Switch Coordinates to have the format [row, col] instead of [col,row]
// Create helper function to rotate a couple of coordinates by 90º
// Create grid 6x6
// Fill the grid with the encrypted message
// Find the different couples of coordinates for each position (0º, 90º, 180º, 270º) in the right order
// Decrypt the message by finding each corresponding letter to each coordinate

const sideSize = 6; // Grid of size 6
const gridPosBase = [
	[1, 1],
	[4, 1],
	[2, 2],
	[6, 2],
	[5, 3],
	[1, 4],
	[4, 4],
	[3, 5],
	[6, 5],
];

const encriptedMessage = "lróaon. sg sdersoildsu.:.cc kiomamii";

// Helper function to switch coordinates to have [row,col] instead of [col,row]
function switchCoordinates(gridPosBase) {
	gridPosBase.forEach((coord) => {
		let temp = coord[0];
		coord[0] = coord[1];
		coord[1] = temp;
	});

	return gridPosBase;
}

// Helper function to rotate a couple of coordinates by 90º
function rotate90(coord) {
	let row = coord[0];
	let col = coord[1];
	let temp = [col, row];

	row = temp[0];
	col = temp[1];

	let newCoord = [row, sideSize + 1 - col];
	return newCoord;
}

function decrypt(encriptedMessage, gridPosBase) {
	const coordinates0 = switchCoordinates(gridPosBase);

	// 1. Create Grid 6x6 and fill it with the encrypted message
	const encriptedMessageArray = encriptedMessage.split("");

	let grid = new Array(sideSize);

	for (let i = 0; i < sideSize; i++) {
		grid[i] = new Array(sideSize);
		for (let j = 0; j < sideSize; j++) {
			grid[i][j] = encriptedMessageArray.shift();
		}
	}

	// 2. Rotate the coordinates at 0º by 90º
	let coordinates90 = [];
	coordinates0.forEach((coord) => coordinates90.push(rotate90(coord)));
	coordinates90 = coordinates90.sort();

	// 3. Rotate the coordinates at 90º by 90º
	let coordinates180 = [];
	coordinates90.forEach((coord) => coordinates180.push(rotate90(coord)));
	coordinates180 = coordinates180.sort();

	// 4. Rotate the coordinates at 180º by 90º
	let coordinates270 = [];
	coordinates180.forEach((coord) => coordinates270.push(rotate90(coord)));
	coordinates270 = coordinates270.sort();

	// 5. Concat all the coordinates to create a Sequence to decrypt the message
	const codeSequence = [...coordinates0, ...coordinates90, ...coordinates180, ...coordinates270];

	// 6. Match each couple of coordinates from the Sequence with its corresponding letter in the grid
	let decryptedMessage = [];
	codeSequence.forEach(([i, j]) => {
		decryptedMessage.push(grid[i - 1][j - 1]); // -1 because grid is index 0 based and coord is index 1 based
	});

	decryptedMessage = decryptedMessage.join("");

	return decryptedMessage;
}

const decryptedMessage = decrypt(encriptedMessage, gridPosBase);
console.log(decryptedMessage);
