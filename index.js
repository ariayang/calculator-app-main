//push a button, display on screen
var inputNumber = [];  //Array storing the digit buttons clicked before clicking operator or equal
var currentValue = null;  // inputNumber array converted Value
var equationCache = [];     // storing the equation sequence
var currentResult = null;   // the result currently showing on screen
var performedEqual = false; // if "=" was clicked, currentValue = currentResult, equationCache empty

// Numbers input
function numberInputOps(key) {
    inputNumber.push(key); 
    currentValue = inputNumber.join('');
    currentValue = parseFloat(currentValue);
    $(".result-screen").text(currentValue);
}

$(".numberBtn").click(function(event){
    performedEqual = false;
    var currentButton = $(this).attr("id");
    numberInputOps(currentButton);
});

//Handling the point
//TODO: 0.2*3=0.60000000000001
//TODO: 9999999999 -> 100000000000
function pointOps(key) {
    if (inputNumber.length === 0) {
        inputNumber.push("0");
        inputNumber.push(key); 
        currentValue = 0;
        $(".result-screen").text("0");
    } else if (!inputNumber.includes(".")) {
        numberInputOps(key);
    }
}

$(".pointBtn").click(function(event) {
    var currentButton = $(this).attr("id");
    pointOps(currentButton);
});

// 'delete' function
function delOps() {
    if (inputNumber.length > 0) {
        inputNumber.pop();
        if (inputNumber.length > 0) {
            currentValue = inputNumber.join('');
            currentValue = parseFloat(currentValue);
            $(".result-screen").text(currentValue);
        } else {
            currentValue = 0;
            $(".result-screen").text(0);
        }
    }
}

$(".delBtn").click(function() {
    delOps();
});


//Reset
function hardReset() {
    inputNumber = [];
    currentValue = null;
    equationCache = [];
    currentResult = null;
    $(".result-screen").text("0");
}

// performed after a "=" operation
function softReset() {
    inputNumber = [];
    equationCache = [];
    currentValue = currentResult;
}

// Numbers input
// TODO: Display after hidden overflow still overflows
function operatorInputOps(key) {

    if (currentValue != null)  {
        equationCache.push(currentValue);
        checkOperatorOrder();
    }


    if (equationCache[equationCache.length - 1] === currentValue) {
        equationCache.push(key);
        currentValue = null;
        inputNumber = [];
    } else {
        equationCache[equationCache.length-1] = key;
    }
}

 $(".operatorBtn").click(function(event) {
    var currentButton = $(this).attr("id");
    operatorInputOps(currentButton);

    //TODO: update result screen while oeprators in
    //currentValue = parseFloat(currentValue);
    //$(".result-screen").text(currentValue);
});

function checkOperatorOrder() {
    var tempValue = null;
        //check previous operator, if "* /", perform that operation, update the equation cache, current result, display
        if (equationCache.length >= 3) {
            operatorToCheckIndex = equationCache.length - 2;
            operatorToCheck = equationCache[operatorToCheckIndex];
            switch(operatorToCheck) {
                case "*":
                    tempValue = equationCache[operatorToCheckIndex - 1] * equationCache[operatorToCheckIndex + 1];
                    break;
                case "/":
                    tempValue = equationCache[operatorToCheckIndex - 1] / equationCache[operatorToCheckIndex + 1];
                    break;
            }
            if (tempValue != null) {
                //console.log("Previous operator is * or /, tempValue is " + tempValue);
                //console.log("current equationCache before tempValue pushed is: " + equationCache);
                equationCache = equationCache.splice(0, operatorToCheckIndex - 1);
                equationCache.push(tempValue);
                //console.log("current equationCache with tempValue pushed is: " + equationCache);
                currentValue = tempValue;
                $(".result-screen").text(currentValue);
            }
        }
}

//calculate the result, display the result
function eqlOps() {
    if (currentValue != null) {
        equationCache.push(currentValue);
    }

    checkOperatorOrder();

    var equationLength = equationCache.length;
    currentResult = equationCache[0];
    if (typeof(equationLength[equationLength - 1]) != "number") {
        equationLength--;
    }
    for (var i = 1; i < equationLength; i = i+2) {
        switch (equationCache[i]) {
          case "+":
            currentResult += equationCache[i + 1];
            break;
          case "-":
            currentResult -= equationCache[i + 1];
            break;
          case "*":
            currentResult *= equationCache[i + 1];
            break;
          case "/":
            currentResult = currentResult / equationCache[i + 1];
            break;
        }
    }
    $(".result-screen").text(currentResult);
    performedEqual = true;
    softReset();
}

$(".eqlButton").click(function(event) {
    eqlOps();

});

$(".resetBtn").click(function(){
    hardReset();
});

//TODO: respond to keyboard numbers and operators
$(document).keydown(function (event) { 
    var keyPressed = event.key;
    var numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var operatorsArr = ["+", "-", "*", "/"];
    if (numbersArr.includes(keyPressed)) {
        numberInputOps(keyPressed);
    } else if (operatorsArr.includes(keyPressed)) {
        operatorInputOps(keyPressed);
    } else if (keyPressed === "Enter") {
        eqlOps();
    } else if (keyPressed === ".") {
        pointOps(keyPressed);
    } else if (keyPressed === "Backspace") {
        delOps();
    }
});



//TODO: change themes
// when clicked toggle bar, add class for specific elements, or just change colors in script.

$("#theme1").click(function() {
    if($("#theme1").is(":checked")){
        $("body").css("background-color", "hsl(222, 26%, 31%)");
        $("a").css("color", "#fff");
        $(".calcText, .theme-nums, .theme-text").css("color", "#fff");
        $(".switch-toggle").css("background", "hsl(223, 31%, 20%)");
        $(".switch-toggle label").css("background", "transparent");
        $(".switch-toggle input:checked + label").css("background", "hsl(6, 63%, 50%)");
        $(".result-screen").css("color", "hsl(30, 25%, 89%)");
        $(".result-screen").css("background-color","hsl(224, 36%, 15%)");
        $(".container-keys").css("background-color","hsl(223, 31%, 20%)");
        $(".numbersBtn").css("box-shadow", "1px 2px hsl(28, 16%, 65%)");
        $(".small-button").css("background-color", "hsl(30, 25%, 89%)");
        $(".small-button").css("color", "hsl(60, 10%, 19%)");
        $(".delBtn").css("background-color", "hsl(225, 21%, 49%)");
        $(".delBtn").css("color", "#fff");
        $(".delBtn").css("box-shadow", "1px 2px hsl(224, 28%, 35%)");
        $(".big-button").css("background-color", "hsl(225, 21%, 49%)");
        $(".big-button").css("color", "hsl(0, 0, 100%)");
        $(".big-button").css("box-shadow", "1px 2px hsl(224, 28%, 35%)");
        $(".eqlButton").css("background-color", "hsl(6, 63%, 50%)");
        $(".eqlbutton").css("color", "hsl(0, 0, 100%)");
        $(".eqlButton").css("box-shadow", "1px 2px hsl(6, 70%, 34%)");
        $(".attribution").css("color", "hsl(28, 16%, 65%)");
    }
});

$("#theme2").click(function() {
    if($("#theme2").is(":checked")){
        $("body").css("background-color", "hsl(0, 0%, 90%)");
        $("a").css("color", "hsl(60, 10%, 19%)");
        $(".header").css("color", "hsl(60, 10%, 19%)");
        $(".calcText, .theme-nums, .theme-text").css("color", "hsl(60, 10%, 19%)");
        $(".switch-toggle").css("background", "hsl(0, 5%, 81%)");
        $(".switch-toggle label").css("background", "transparent");
        $(".switch-toggle input:checked + label").css("background", "hsl(6, 63%, 50%)");
        $(".result-screen").css("color", "hsl(60, 10%, 19%)");
        $(".result-screen").css("background-color","hsl(0, 0%, 93%)");
        $(".container-keys").css("background-color","hsl(0, 5%, 81%)");
        $(".numbersBtn").css("box-shadow", "1px 2px hsl(35, 11%, 61%)");
        $(".small-button").css("background-color", "hsl(45, 7%, 89%)");
        $(".small-button").css("color", "hsl(60, 10%, 19%)");
        $(".delBtn").css("background-color", "hsl(185, 42%, 37%)");
        $(".delBtn").css("color", "#fff");
        $(".delBtn").css("box-shadow", "1px 2px hsl(185, 58%, 25%)");
        $(".big-button").css("background-color", "hsl(185, 42%, 37%)");
        $(".big-button").css("color", "hsl(0, 0, 100%)");
        $(".big-button").css("box-shadow", "1px 2px hsl(185, 58%, 25%)");
        $(".eqlButton").css("background-color", "hsl(25, 98%, 40%)");
        $(".eqlbutton").css("color", "#fff");
        $(".eqlButton").css("box-shadow", "1px 2px hsl(25, 99%, 27%)");
        $(".attribution").css("color", "hsl(35, 11%, 61%)");
    }
});




$("#theme3").click(function() {
    if($("#theme3").is(":checked")){
        $("body").css("background-color", "hsl(268, 75%, 9%)");
        $("a").css("color", "hsl(52, 100%, 62%)");
        $(".header").css("color", "hsl(52, 100%, 62%)");
        $(".calcText, .theme-nums, .theme-text").css("color", "hsl(52, 100%, 62%)");
        $(".switch-toggle").css("background", "hsl(268, 71%, 12%)");
        $(".switch-toggle label").css("background", "transparent");
        $(".switch-toggle input:checked + label").css("background", "hsl(176, 100%, 44%)");
        $(".result-screen").css("color", "hsl(52, 100%, 62%)");
        $(".result-screen").css("background-color","hsl(268, 71%, 12%)");
        $(".container-keys").css("background-color","hsl(268, 71%, 12%)");
        $(".numbersBtn").css("box-shadow", "1px 2px hsl(290, 70%, 36%)");
        $(".small-button").css("background-color", "hsl(268, 47%, 21%)");
        $(".small-button").css("color", "hsl(52, 100%, 62%)");
        $(".delBtn").css("background-color", "hsl(281, 89%, 26%)");
        $(".delBtn").css("color", "#fff");
        $(".delBtn").css("box-shadow", "1px 2px hsl(285, 91%, 52%)");
        $(".big-button").css("background-color", "hsl(281, 89%, 26%)");
        $(".big-button").css("color", "#fff");
        $(".big-button").css("box-shadow", "1px 2px hsl(285, 91%, 52%)");
        $(".eqlButton").css("background-color", "hsl(176, 100%, 44%)");
        $(".eqlbutton").css("color", "hsl(198, 20%, 13%)");
        $(".eqlButton").css("box-shadow", "1px 2px hsl(177, 92%, 70%)");
        $(".attribution").css("color", "#fff");
    }
});