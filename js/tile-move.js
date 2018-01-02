//handles arrays with empty tiles
var whitespaceHandler = function(arr) {
    /*if there's not 4 items in the array we need to add "place holders" (empty string in this case) 
    for the tiles without values*/
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
//checks for pairs to be matched
var matchPairs = function(arr) {
    for (let o = 0; o < arr.length; o++) {
        let n = parseInt(arr[o]);
        //checking if array contains a pair
        if (arr[o] === arr[o + 1] && isNaN(arr[o]) === false && arr[o] != "undefined") {
            //removes pair from array and replaces with the sum of the two numbers
            arr.splice(o, 2, n * 2);
            score += n*2;
            o++;
        }
    }
    //returns array with its pairs combined
    return arr;
}
function moveTiles(classType, tileHandler, key) {
    for (let i = 0; i < totalRows; i++) {
        let z = document.getElementsByClassName(classType + i);
        let w = []; //created a new variable to go around node list
        for (let o = 0; o < totalCols; o++) {
            let a = z[o].getElementsByTagName("a")[0];
            //used in keyframes animation
            a.setAttribute("style", "opacity:0;");
            //making sure that there is a value in the tile
            if (a.innerText != "") {
                w.push(a.innerText);
            }
        }
        let m = matchPairs(w);
        /*function that gets passed through keyhandler 
            handles how it should display the array based on the direction of the arrow key
        */
        tileHandler(m);
        arrangeBoard(m, z);
    }
    //checking if the grid has changed
    checkTileMove();
    scoreLabel.innerText = score;
    setHighscore(score);
}
//inserts array values into tiles & adds style to the tile
function arrangeBoard(finalArr, el) {
    for (let i = 0; i < el.length; i++) {
        let inner = el[i].getElementsByTagName("a")[0];
        //adding style based on tile value
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
        //setting tile text to it's "new" value
        inner.innerText = finalArr[i];
    }
}