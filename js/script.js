let tiles = document.getElementsByClassName("tile"); //contains all the tiles
let totalRows = 4; //change this based on rows in html
let totalCols = 4; //change this basd on the total cols
let score = 0;
var scoreLabel = document.getElementById("score").getElementsByTagName("a")[0];
let playAgainBtn = document.getElementById("play-again");
let checkedMoves = false; //prevents unnecessary loops when no data has changed on grid
let gameWon = false;
let gameOver = false;
let grid = []; //keeps track of tiles before a move is made *compared against newGrid*
//colors for tiles 
let colors = {
        default: {
            background: "unset",
            color: "#766e64"
        },
        2: {
            background: "#eee4db",
            color: "#766e64"
        },
        4: {
            background: "#ede0c8",
            color: "#766e64"
        },
        8: {
            background: "#f3b278",
            color: "#f9f6f2"
        },
        16: {
            background: "#f59563",
            color: "#f9f6f2"
        },
        32: {
            background: "#f67b5e",
            color: "#f9f6f2"
        },
        64: {
            background: "#f65e3b",
            color: "#f9f6f2"
        },
        128: {
            background: "#edcc61",
            color: "#f9f6f2"
        },
        256: {
            background: "#edcc61",
            color: "#f9f6f2",
            boxshadow: "0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)"
        },
        512: {
            background: "#edc850",
            color: "#f9f6f2",
            boxshadow: "0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)"
        },
        1024: {
            color: "#f9f6f2",
            background: "#edc53f",
            boxshadow: "0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)"
        },
        2048: {
            color: "#f9f6f2",
            background: "#edc22e",
            boxshadow: "0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)"
        }
    }
    //end colors
    //handles key press
window.onkeyup = function(e) {
    e = e || window.event;
    switch (true) {
        //checking for arrow keys / win loss
        case gameWon === true:
            document.getElementById("end-text").style.opacity = "1";
            document.getElementById("end-text").style.visibility = "visible";
            document.getElementById("result-text").innerText = "You Win";
            document.getElementById("end-text").style.display = "block";
            break;
        case gameOver === true:
            document.getElementById("end-text").style.opacity = "1";
            document.getElementById("end-text").style.visibility = "visible";
            document.getElementById("result-text").innerText = "You Lose";
            document.getElementById("end-text").style.display = "block";
            break;
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

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}
//key handlers
function upKey() {
    moveTiles("col", function(m) {
        m = whitespaceHandler(m);
    })
}

function downKey() {
    moveTiles("col", function(m) {
        m.reverse();// for prepending whitespace
        m = whitespaceHandler(m);
        m.reverse(); //back to original format
    });
}

function leftKey() {
    moveTiles("row", function(m) {
        m = whitespaceHandler(m);
    });
}

function rightKey() {
    moveTiles("row", function(m) {
        m.reverse();// for prepending whitespace
        m = whitespaceHandler(m);
        m.reverse();//back to original format
    });
}
//will handle all tile creations here
function addNewTile() {
    //picking random tile on grid for the new tile to be placed
    let randomTile = random(0, tiles.length);
    //getting data from random tile (if it has data it's not a free tile;need to get a new random tile)
    let t = tiles[randomTile].getElementsByTagName("a")[0].innerText;
    //checking if tile is open
    if (t === undefined || t === "" || t === null) {
        tiles[randomTile].getElementsByTagName("a")[0].innerText = "2";
        tiles[randomTile].getElementsByTagName("a")[0].setAttribute("style", "background-color:" + colors[2].background + ";color:" + colors[2].color + "; animation: appear 200ms ease 100ms;animation-fill-mode: backwards;");
        //getting new grid
        grid = [];
        for (let i = 0; i < tiles.length; i++) {
            let t = tiles[i].getElementsByTagName("a")[0].textContent;
            grid.push(t);
        }
        //grid has changed so moves will need to be checked again.
        checkedMoves = false;
    } else if (addTileCheck) {
        //try again for open space
        addNewTile();
    }
}
//creates 2 new tiles on load and adds play again listener
window.onload = function() {
    //adds two new tiles to the board on load
    addNewTile();
    addNewTile();
    setHighscore(score);
    document.getElementById("play-again").addEventListener("click", function() {
        //resetting variables
        score = 0;
        scoreLabel.innerText = "0";
        checkedMoves = false;
        gameWon = false;
        gameOver = false;
        //resetting tiles style
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].getElementsByTagName("a")[0].innerText = "";
            tiles[i].getElementsByTagName("a")[0].setAttribute("style", "background-color:" + colors.default.background + ";color:" + colors.default.color + ";");
        }
        //resetting tiles text / hiding end game text
        document.getElementById("end-text").style.opacity = "0";
        document.getElementById("end-text").style.visibility = "hidden";
        document.getElementById("result-text").innerText = "";
        document.getElementById("end-text").style.display = "none";
        //adding starter tiles
        addNewTile();
        addNewTile();
    })
}