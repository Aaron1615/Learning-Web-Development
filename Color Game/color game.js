var numSquares = 6;
var colors = generateRandomColors(numSquares);
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");


var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");

var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

colorDisplay.textContent = pickedColor;

easy.addEventListener("click", function(){
	easy.classList.add("selected");
	hard.classList.remove("selected");
	numSquares = 3;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
		squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
})

hard.addEventListener("click", function(){
	hard.classList.add("selected");
	easy.classList.remove("selected");
	numSquares = 6;
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = colors[i];
		squares[i].style.display = "block";

	}
})


resetButton.addEventListener("click", function(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick new random color
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = colors[i];

	}
	resetButton.textContent = "New Colors";
	h1.style.background = "#steelblue";
})

for(var i=0; i < squares.length; i++){
	//add initial colors to squares

	squares[i].style.background = colors[i];
	
	//add click listeners to squares
	squares[i].addEventListener("click", function(){

	//grab color of clicked square

	var colorSquare = this.style.background;
	//compare color to picked color
	if(colorSquare === pickedColor){
		messageDisplay.textContent = "Correct";
		changeColors(pickedColor);
		h1.style.background = pickedColor;
		resetButton.textContent = "Play Again?";
	}
	else{
	this.style.background = "#232323";
	messageDisplay.textContent = "Try Again";
	}
	})
}

function changeColors(color){
//loop through all squares change to match given color
for (var i = 0; i < squares.length; i++) {
	squares[i].style.background = color;
}
}
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
//make array
var arr = []
//add num random colors
for(var i = 0;i < num;i++){
	arr.push(randomColor());

}
//return array
return arr;

}
function randomColor(){
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
return "rgb(" + r + ", " + g + ", " + b + ")";
}