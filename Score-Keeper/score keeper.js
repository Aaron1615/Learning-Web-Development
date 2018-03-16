// alert("connected")
var p1 = document.querySelector("#p1");
var p1Score = 0;
var p2Score = 0;
var winningScoreDisplay = document.querySelector("p span");
var p2 = document.getElementById("p2");
var reset = document.getElementById("reset");
var p1Display = document.getElementById("p1Display");
var p2Display = document.getElementById("p2Display");
var gameOver = false;
var winningScore=5;
var numInput = document.querySelector("input")
p1.addEventListener("click", function(){
	
	if(!gameOver){

	p1Score++;
	if(p1Score == winningScore){
		p1Display.classList.add("winner");
		gameOver = true;
	};
	
	p1Display.textContent = p1Score;
}
});

p2.addEventListener("click", function(){
	// alert("Clicked2");
	if(!gameOver){
		p2Score += 1;
		if(p2Score == winningScore){
			p2Display.classList.add("winner");
			gameOver = true;
		}	
	p2Display.textContent = p2Score;
	}
})
reset.addEventListener("click", function(){
	// alert("ClickedR");
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent= p1Score;
	p2Display.textContent= p2Score;
	gameOver = false;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
})
numInput.addEventListener("change", function(){
	winningScoreDisplay.textContent = numInput.value;
	winningScore = numInput.value;
})