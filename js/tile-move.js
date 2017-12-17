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
            if (n * 2 == 2048) {
                gameWon = true;
            }
            lastMove = null;
        }
    }
    return arr;
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
    } else if(lctLoaction != document.getElementById("lastCreatedTile")) {
        addNewTile();
    }
    scoreLabel.innerText = score;
    setHighscore(score);
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