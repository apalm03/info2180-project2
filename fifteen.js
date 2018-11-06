


/*Extra Features included are:
1. end notification indicated by change in background image
2. Stopwatch to keep track of time taken to solve puzzle as well as number of moves made determine best game played
3. transition of tiles [TO BE GRADED]
*/


window.onload = function(){

	fifpuzzle();
	$('#shufflebutton').click(shuffle);
	stopwatchSecn();


}



//Creates layout of puzzle
//Adds background image to puzzle
//Adds move functionality to the tiles in puzzle
function fifpuzzle(){

	tile= $('#puzzlearea div');
	$('#puzzlearea div').addClass('puzzlepiece');
	var hor = 0;
	var ver = 0;
	var picl = 0;
	var pict = 0;
	count =0;

	for (var x = 0; x < tile.length; x++){
		tile[x].style.left = hor + "px";
		tile[x].style.top = ver + "px",
		tile[x].style.backgroundPosition = picl+ "px " + pict +"px";
		tile[x].style.transitionDuration='0.5s';
		tile[x].addEventListener('mouseenter',isMovablePiece);
		tile[x].addEventListener('click',move);
		tile[x].addEventListener('mouseleave',isNonmovablePiece);
	//	tile[x].addEventListener('click',start);

		hor +=100;
		picl -=100;
		count += 1;
		if(count % 4 ==0){
			ver+= 100;
			pict-=100

			hor = 0;
			picl = 0;

		}
	};

}


var topBlank= 300;//top of blank piece
var leftBlank= 300;//left of blank piece


// function to check if a tile is movable
function isMovablePiece(event){
	if (Math.abs(topBlank - parseInt(this.style.top)) == 100) {
		if (Math.abs(leftBlank - parseInt(this.style.left)) == 0) {
			$(this).addClass("movablepiece");
			return true;
		}
	}
	else if (Math.abs(leftBlank - parseInt(this.style.left)) == 100) {
		if (Math.abs(topBlank - parseInt(this.style.top)) == 0) {
			$(this).addClass("movablepiece");
			return true;
		}
	}
	return false;
}
//checks for tiles that cannot be moved
function isNonmovablePiece(y){
	if (Math.abs(topBlank - parseInt(this.style.top)) == 100) {
		if (Math.abs(leftBlank - parseInt(this.style.left)) == 0) {
			$(this).removeClass("movablepiece");
		}
	}
	else if (Math.abs(leftBlank - parseInt(this.style.left)) == 100) {
		if (Math.abs(topBlank - parseInt(this.style.top)) == 0) {
			$(this).removeClass("movablepiece");
		}
	}
}
// moves the tiles that are next to a blank space
movecount=0;
function move(event){
	if($(this).hasClass('movablepiece')){
		var ct=parseInt(this.style.top);
		var cl=parseInt(this.style.left);
		var tempT=topBlank;
		var tempL=leftBlank;
		topBlank=ct;
		leftBlank=cl;
		this.style.top = tempT +'px';
		this.style.left = tempL +'px';

		movecount++;
	}
	isPuzzleSolved();
}
//function for shuffling the puzzlepieces
shuffcount = 0;
function shuffle(){
	for (var i =0; i<200; i++){
		for (var t = Math.floor(Math.random()*tile.length); t > -1; t--){
		var ct=parseInt(tile[t].style.top);
		var cl=parseInt(tile[t].style.left);
		var tempT=topBlank;
		var tempL=leftBlank;
		topBlank=ct;
		leftBlank=cl;
		tile[t].style.top = tempT +'px';
		tile[t].style.left = tempL +'px';

			}

		}

shuffcount++
// starts timing when the puzzle is shuffled
if(shuffcount == 1){
	start();
	}
}

//define var to store seconds and minutes
let seconds = 0;
let minutes = 0;

//define var to store minutes and seconds that will be displayed
let displaySeconds =0;
let displayMinutes = 0;

let interval = null;

let status = "stopped";

// Impliments the functionality of a stop watch
function stopWatch(){
seconds++

if (seconds /60 ===1){
seconds = 0;
minutes++
}


if(seconds < 10){
displaySeconds = "0" + seconds.toString();

}else{
displaySeconds = seconds;
}

if(minutes < 10){
displayMinutes = "0" + minutes.toString();

}else{
displayMinutes = minutes;
}

// displays the stopwatch using the time id created in myFunction
document.querySelector("#time").innerHTML = displayMinutes + ":" + displaySeconds ;

}


// function to start the stopwatch

function start(){
	if(status === "stopped"){
		interval = window.setInterval(stopWatch,1000);
		status = "started";
	}


}
// function to stop the stopwatch
function stop(){
	if(status ==="started"){
		window.clearInterval(interval);
		status = "stopped";
	}

}

function isPuzzleSolved(){ // checks if puzzle is solved and the user wins game

        ls = 0;
        ts =0 ;
        var win = true;
       for(var i = 0; i < tile.length; i++){
            if(tile[i].style.left != ls + "px" || tile[i].style.top != ts + "px"){
                win = false;
                break;
            }
            ls +=100;
            if ((i+1) %4 == 0){
                ts += 100;

                ls = 0;

            }

       }

       if(win == true){
				 if(shuffcount > 0){
        document.querySelector("#time").innerHTML= "you won!! you made " + movecount +" moves in " + "time: " + displayMinutes+ ":" + displaySeconds;
			}else{
				document.querySelector("#time").innerHTML= "you won!! you made " + movecount +" moves in " + displayMinutes+ ":" + displaySeconds +" time: NEXT TIME CLICK SHUFFLE TO START TIMING!" ;
			}
				stop();
				for(var i = 0; i < tile.length; i++){ // if the game is won the image changes.
               tile[i].style.backgroundImage = "url('congrats-confetti.gif')";
							  tile[i].style.backgroundSize = "400px 400px";
						 }
						 return win;
           }
       }







//function that sets up a section for stopwatch
function stopwatchSecn(){
var x = document.createElement("DIV");
x.setAttribute("id","timediv");
document.body.appendChild(x);
var z = document.createElement("H2");
z.setAttribute("id", "time");
z.setAttribute("align", "center");
document.getElementById("timediv").appendChild(z);

	}
