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
var matchPairs = function(arr) {
    for (let o = 0; o < arr.length; o++) {
        let current = checkLct(arr[o]);
        let next = checkLct(arr[o + 1]);
        let n = parseInt(current);
        if (current === next && isNaN(current) === false && current != "undefined") {
            console.log("matching pair of", current);
            if ((arr[o].indexOf("lct") != -1 || arr[o + 1].indexOf("lct") != -1) && o < arr.length - 1) {
                arr.splice(o, 2, n * 2 + "lct");
            } else {
                arr.splice(o, 2, n * 2);
            }
            score += n * 2;
            if(n*2 == 2048){
                gameWon = true;
            }
            lastMove = null;
        }
    }
    return arr;
}
var checkLct = function(e) {
    if (e != undefined && e != null && e.indexOf("lct") != -1) {
        return e.replace("lct", "");
    }else{
        return e;
    }
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

function moveTiles(classType, tileHandler, key) {
    for (let i = 0; i < totalRows; i++) {
        let z = document.getElementsByClassName(classType + i);
        let w = []; //created a new variable to go around node list
        for (let o = 0; o < totalCols; o++) {
            let a = z[o].getElementsByTagName("a")[0];
            a.setAttribute("style", "opacity:0;");
            if (a.innerText != "" && a.getAttribute("id") != "lastCreatedTile") {
                w.push(a.innerText);
            } else if (a.getAttribute("id") === "lastCreatedTile") {
                w.push(a.innerText + "lct");
            }
        }
        let m = matchPairs(w);
        tileHandler(m);
        arrangeBoard(m, z);
    }
    if (key != lastMove) {
        addNewTile();
    } else {
        console.log("check available moves");
        if (lctLoaction === document.getElementById("lastCreatedTile")) {
            console.log("last created tile was not moved");
        } else {
            addNewTile();
            console.log("lastCreatedTile was moved");
        }
    }

    scoreLabel.innerText = score;
}
var checkRows = function() {
    for (let i = 0; i < totalRows; i++) {
        let z = document.getElementsByClassName("row" + i);
        for (let o = 0; o < totalCols; o++) {
            try {
                let current = z[o].getElementsByTagName("a")[0].innerText;
                let next = z[o + 1].getElementsByTagName("a")[0].innerText;
                if (current == next) {
                    return true;
                }
            } catch (e) {
                //do nothing
            }
        }
    }
}
var checkCols = function() {
    for (let i = 0; i < totalCols; i++) {
        let z = document.getElementsByClassName("col" + i);
        for (let o = 0; o < totalRows; o++) {
            try {
                let current = z[o].getElementsByTagName("a")[0].innerText;
                let next = z[o + 1].getElementsByTagName("a")[0].innerText;
                if (current == next) {
                    return true;
                }
            } catch (e) {
                //do nothing
            }
        }
    }
}

function gameOverCheck() {
    //checked moves will prevent loops where they are not needed
    if (checkedMoves === false) {
        //checks rows then columns if there are no pairs on rows
        let r = checkRows();
        let c = checkCols();
        if (c === true || r === true) {
            console.warn("still moves to be made");
            checkedMoves = true;
        } else {
            gameOver = true;
            checkedMoves = true;
        }
    }else{
        console.warn("Grid has already been checked");
    }
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

function arrangeBoard(finalArr, el) {
    for (let i = 0; i < el.length; i++) {
        let holder = finalArr[i].toString();
        let inner = el[i].getElementsByTagName("a")[0];
        if (holder.indexOf("lct") != -1) {
            lctLoaction = el[i].getElementsByTagName("a")[0];
            finalArr[i] = holder.replace("lct", "");
        }
        switch (true) {
            case finalArr[i] >= 2 && finalArr[i] <= 128:
                el[i].getElementsByTagName("a")[0].setAttribute("style", "background-color:" + colors[finalArr[i]].background + ";color:" + colors[finalArr[i]].color + ";");
                break;
            case finalArr[i] >= 256:
                el[i].getElementsByTagName("a")[0].setAttribute("style", "background-color:" + colors[finalArr[i]].background + ";color:" + colors[finalArr[i]].color + ";box-shadow:" + colors[finalArr[i]].boxshadow + ";");
                break;
            default:
                el[i].getElementsByTagName("a")[0].setAttribute("style", "background-color:" + colors.default.background + ";color:" + colors.default.color + ";");
                break;
        }
        inner.innerText = finalArr[i];
    }
}

function loadBoard() {
    addNewTile();
    addNewTile();
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