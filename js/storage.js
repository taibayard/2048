function setHighscore(s) {
	let highscoreLabel = document.getElementById("high-score").getElementsByTagName("a")[0];
	let local_highscore = parseInt(localStorage.getItem("2048-highscore"));
    if (isNaN(local_highscore)) {
       localStorage.setItem("2048-highscore",0);
       highscoreLabel.innerText = 0;
    } else if (s > local_highscore) {
    	localStorage.setItem("2048-highscore",s);
    	highscoreLabel.innerText = s;
    }else{
    	highscoreLabel.innerText = local_highscore;
    }
}