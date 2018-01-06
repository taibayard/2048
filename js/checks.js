//checking if theres still tiles open
var addTileCheck = function() {
    for (let i = 0; i < tiles.length; i++) {
        let t = tiles[i].getElementsByTagName("a")[0].innerText;
        if (t === undefined || t === "" || t === null) {
            return true;
        }
    }
}
//checking if theres combinations to be made
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
        let movesLeft = checkGrid();
        if (movesLeft) {
            //still moves to be made
            checkedMoves = true;
        } else {
            //player lost
            gameOver = true;
            checkedMoves = true;
        }
    }
    //else grid has already been checked
}

function checkTileMove() {
    newGrid = [];
    for (let i = 0; i < tiles.length; i++) {
        let t = tiles[i].getElementsByTagName("a")[0].textContent;
        newGrid.push(t);
    }
    if (grid.toString() != newGrid.toString()) {
        addNewTile();
    }else{
        gameOverCheck();
    }
}