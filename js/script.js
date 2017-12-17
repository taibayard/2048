let tiles = document.getElementsByClassName("tile");
let totalRows = 4; //change this based on rows in html
let totalCols = 4; //change this basd on the total cols
let score = 0;
var scoreLabel = document.getElementById("score").getElementsByTagName("a")[0];
let lastMove; //contains string with the last used key
let lctLoaction = null;
let checkedMoves = false;
let gameWon = false;
let gameOver = false;
//colors
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
window.onkeyup = function(e) {
    e = e || window.event;
    switch (true) {
        case gameWon === true:
            alert("game won");
            break;
        case gameOver === true:
            alert("game over");
            break;
        case e.key === "ArrowUp":
            upKey(e.key);
            lastMove = e.key;
            break;
        case e.key === "ArrowDown":
            downKey(e.key);
            lastMove = e.key;
            break;
        case e.key === "ArrowLeft":
            leftKey(e.key);
            lastMove = e.key;
            break;
        case e.key === "ArrowRight":
            rightKey(e.key);
            lastMove = e.key;
            break;
    }
}
function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function upKey(k) {
    moveTiles("col", function(m) {
        m = whitespaceHandler(m);
    }, k)
}

function downKey(k) {
    moveTiles("col", function(m) {
        m.reverse();
        m = whitespaceHandler(m);
        m.reverse();
    }, k);
}

function leftKey(k) {
    moveTiles("row", function(m) {
        m = whitespaceHandler(m);
    }, k)
}

function rightKey(k) {
    moveTiles("row", function(m) {
        m.reverse();
        m = whitespaceHandler(m);
        m.reverse();
    }, k);
}
function addNewTile() {
    let randomTile = random(0, tiles.length);
    let t = tiles[randomTile].getElementsByTagName("a")[0].innerText;
    if (t === undefined || t === "" || t === null) {
        try {
            document.getElementById("lastCreatedTile").removeAttribute("id");
        } catch (e) {

        }
        tiles[randomTile].getElementsByTagName("a")[0].setAttribute("id", "lastCreatedTile");
        tiles[randomTile].getElementsByTagName("a")[0].innerText = "2";
        lctLoaction = tiles[randomTile].getElementsByTagName("a")[0];
        tiles[randomTile].getElementsByTagName("a")[0].setAttribute("style", "background-color:" + colors[2].background + ";color:" + colors[2].color + "; animation: appear 200ms ease 100ms;animation-fill-mode: backwards;");
        console.log("free tile");
        lastMove = null; //unlocks lastMove so we can make the same move twice
        checkedMoves = false;
    } else {
        let canAddTile = addTileCheck();
        if (canAddTile === true) {
            //keep generating new tiles...
            console.log("can add tile");
            addNewTile();
        } else {
            gameOverCheck();
        }
    }
}
window.onload = function() {
    //adds two new tiles to the board on load
    addNewTile();
    addNewTile();
    setHighscore(score);
}