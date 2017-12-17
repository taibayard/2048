var addTileCheck = function(){
    for (let i = 0; i < tiles.length; i++) {
        let t = tiles[i].getElementsByTagName("a")[0].innerText;
        if (t === undefined || t === "" || t === null) {
            return true;
            break;
        }
    }
}
var checkLct = function(e) {
    if (e != undefined && e != null && e.indexOf("lct") != -1) {
        return e.replace("lct", "");
    } else {
        return e;
    }
}
var checkGrid = function() {
    for (let i = 0; i < totalRows; i++) {
        let r = document.getElementsByClassName("row" + i);
        let c = document.getElementsByClassName("col" + i);
        for (let o = 0; o < totalCols - 1; o++) {
            let currentRow = r[o].getElementsByTagName("a")[0].innerText;
            let nextRow = r[o + 1].getElementsByTagName("a")[0].innerText;
            let currentCol = c[o].getElementsByTagName("a")[0].innerText;
            let nextCol = c[o + 1].getElementsByTagName("a")[0].innerText;
            if (currentRow == nextRow || currentCol == nextCol) {
                return true;
            }
        }
    }
    return false;
}
function gameOverCheck() {
    //checked moves will prevent loops where they are not needed
    if (checkedMoves === false) {
        //checks rows then columns if there are no pairs on rows
        let movesLeft = checkGrid();
        if (movesLeft) {
            console.warn("still moves to be made");
            checkedMoves = true;
        } else {
            gameOver = true;
            checkedMoves = true;
        }
    } else {
        console.warn("Grid has already been checked");
    }
}