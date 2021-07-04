//push a button, display on screen
var inputNumber = [];  //Array storing the digit buttons clicked before clicking operator or equal
var currentValue = null;  // inputNumber array converted Value
var equationCache = [];     // storing the equation sequence
var currentResult = null;   // the result currently showing on screen
var performedEqual = false; // if "=" was clicked, currentValue = currentResult, equationCache empty

// Numbers input
$(".numberBtn").click(function(event){
    performedEqual = false;
    var currentButton = $(this).attr("id");
    inputNumber.push(currentButton); 
    currentValue = inputNumber.join('');
    currentValue = parseFloat(currentValue);
    $(".result-screen").text(currentValue);
});

//Handling the point
$(".pointBtn").click(function(event) {
    var currentButton = $(this).attr("id");
    if (!inputNumber.includes(".")) {
        inputNumber.push(currentButton); 
    }
    currentValue = inputNumber.join('');
    currentValue = parseFloat(currentValue);
    $(".result-screen").text(currentValue);
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

//TODO:
 $(".operatorBtn").click(function(event) {
    if (currentValue != null)  {
        equationCache.push(currentValue);
        console.log("currentValue " + currentValue + "pushed");
        checkOperatorOrder();
    }

    var currentButton = $(this).attr("id");

    if (equationCache[equationCache.length - 1] === currentValue) {
        //console.log("currentValue" + previousOperator);
        equationCache.push(currentButton);
        console.log("current equationCache after push is: " + equationCache);
        currentValue = null;
        inputNumber = [];
    } else {
        equationCache[equationCache.length-1] = currentButton;
        console.log("current equationCache with operator replacement is: " + equationCache);
    }


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
                console.log("Previous operator is * or /, tempValue is " + tempValue);
                console.log("current equationCache before tempValue pushed is: " + equationCache);
                equationCache = equationCache.splice(0, operatorToCheckIndex - 1);
                equationCache.push(tempValue);
                console.log("current equationCache with tempValue pushed is: " + equationCache);
                currentValue = tempValue;
                $(".result-screen").text(currentValue);
            }
        }
}

//calculate the result, display the result

$(".eqlButton").click(function(event) {
    var currentButton = $(this).attr("id");
    //push curent Value into equation cache
    
    // reset the inputNumber, currentValue
    // check if previous button is operator or not
    //var operatorsArray = ["+", "-", "*", "/"];
    //var previousOperator = false;
    /*if(!operatorsArray.includes(equationCache[equationCache.length - 1])) {
        previousOperator = true;
    }*/
    if (currentValue != null) {
        equationCache.push(currentValue);
    }

    checkOperatorOrder();

    var equationLength = equationCache.length;
    currentResult = equationCache[0];
    console.log("currentResult is: " + currentResult);
    if (typeof(equationLength[equationLength - 1]) != "number") {
        equationLength--;
    }
    for (var i = 1; i < equationLength; i = i+2) {
        console.log(equationCache[i]);
        //no operator priority first
        switch (equationCache[i]) {
          case "+":
            currentResult += equationCache[i + 1];
            console.log(currentResult);
            break;
          case "-":
            currentResult -= equationCache[i + 1];
            console.log(currentResult);
            break;
          case "*":
            currentResult *= equationCache[i + 1];
            console.log(currentResult);
            break;
          case "/":
            currentResult = currentResult / equationCache[i + 1];
            console.log(currentResult);
            break;
        }
    }
    $(".result-screen").text(currentResult);
    performedEqual = true;
    softReset();
});

$(".resetBtn").click(function(){
    hardReset();
});

//TODO: respond to keyboard numbers and operators


/* slider range */
$('input').change(function() {
    $('#res').html(this.value);
})