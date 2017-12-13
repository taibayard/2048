let tiles = document.getElementsByClassName("tile");
let totalRows = 4; //change this based on rows in html
let totalCols = 4; //change this basd on the total cols
let score = 0;
var scoreLabel = document.getElementById("score").getElementsByTagName("a")[0];
//colors
let currentSupportedColorMax = 32;
let colors = {
	default:{
		background:"rgba(238, 228, 218, 0.35)",
		color:"#766e64"
	},
	2:{
		background:"#eee4db",
		color:"#766e64"
	},
	4:{
		background:"#ede0c8",
		color:"#766e64"
	},
	8:{
		background:"#f3b278",
		color:"#f9f6f2"
	},
	16:{
		background:"#f59563",
		color:"#f9f6f2"
	},
	32:{
		background:"#f67b5e",
		color:"#f9f6f2"
	}
}
//end colors
window.onkeyup = function(e) {
    e = e || window.event;
    console.log(e);
    switch (true) {
        case e.key === "ArrowUp":
            upKey();
            break;
        case e.key === "ArrowDown":
            downKey();
            break;
        case e.key === "ArrowLeft":
            leftKey();
            break;
        case e.key === "ArrowRight":
            rightKey();
            break;
    }
}
var matchPairs = function(arr) {
    for (let o = 0; o < arr.length; o++) {
        let n = parseInt(arr[o]);
        if (arr[o] === arr[o + 1] && isNaN(arr[o]) === false && arr[o] != "undefined") {
            console.log("matching pair of", arr[o]);
            arr.splice(o, 2, n * 2);
            score += n*2;
            o++;
        }
    }
    return arr;
}
var whitespaceHandler = function(arr) {
    if (arr.length < 4) {
        let diff = 4 - arr.length;
        for (let i = 0; i < diff; i++) {
            arr.push("");
        }
        return arr;
    } else {
        return arr;
    }
}

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function moveTiles(classType,tileHandler) {
    for (let i = 0; i < totalRows; i++) {
        let z = document.getElementsByClassName(classType + i);
        let w = []; //created a new variable to go around node list
        for (let o = 0; o < totalCols; o++) {
            if (z[o].getElementsByTagName("a")[0].innerText != "") {
                w.push(z[o].getElementsByTagName("a")[0].innerText);
            }
        }
        let m = matchPairs(w);
        tileHandler(m);
        arrangeBoard(m, z);
    }
    addNewTile();
    scoreLabel.innerText = score;
}

function upKey() {
	moveTiles("col",function(m){
		m = whitespaceHandler(m);
	})
}

function downKey() {
	moveTiles("col",function(m){
        m.reverse();
        m = whitespaceHandler(m);
        m.reverse();
	});
}

function leftKey() {
	moveTiles("row",function(m){
		m = whitespaceHandler(m);
	})
}

function rightKey() {
	moveTiles("row",function(m){
        m.reverse();
        m = whitespaceHandler(m);
        m.reverse();
	});
}

function arrangeBoard(finalArr, el) {
    for (let i = 0; i < el.length; i++) {
        let inner = el[i].getElementsByTagName("a")[0];
        switch(true){
        	case finalArr[i] >=2 && finalArr[i] <= currentSupportedColorMax:
        		el[i].style.backgroundColor = colors[finalArr[i]].background;
        		el[i].style.color = colors[finalArr[i]].color;
        	break;
        	default:
        		el[i].style.backgroundColor = colors.default.background;
        		el[i].style.color = colors.default.color;
        	break;
        }
        inner.innerText = finalArr[i];
    }
}

function loadBoard() {
    let t1 = random(0, 15);
    let t2 = random(0, 15);
    tiles[t1].getElementsByTagName("a")[0].innerText = "2";
    tiles[t1].setAttribute("style","background-color:"+colors[2].background+";color:"+colors[2].color+";");
    tiles[t2].getElementsByTagName("a")[0].innerText = "2";
    tiles[t2].setAttribute("style","background-color:"+colors[2].background+";color:"+colors[2].color+";");
}

function addNewTile() {
    let randomTile = random(0, tiles.length);
    let t = tiles[randomTile].getElementsByTagName("a")[0].innerText;
    if (t === undefined || t === "" || t === null) {
        console.log(tiles[randomTile]);
        tiles[randomTile].getElementsByTagName("a")[0].innerText = "2";
        tiles[randomTile].setAttribute("style","background-color:"+colors[2].background+";color:"+colors[2].color+";");
        console.log("free tile");
    } else {
        let canAddTile = addTileCheck();
        if (canAddTile === true) {
            //keep generating new tiles...
            console.log("can add tile");
            addNewTile();
        } else {
            console.log("check for loss");
            //check for loss here.
        }
    }
}

function addTileCheck() {
    for (let i = 0; i < tiles.length; i++) {
        let t = tiles[i].getElementsByTagName("a")[0].innerText;
        if (t === undefined || t === "" || t === null) {
            return true;
            break;
        }
    }
}
window.onload = function() {
    loadBoard();
}