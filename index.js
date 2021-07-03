//push a button, display on screen
var inputNumber = [];
var currentValue = null;  
var equationCache = [];
var currentResult = null;
var performedEqual = false;

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

function softReset() {
    inputNumber = [];
    equationCache = [];
    currentValue = currentResult;
}

//TODO:
 $(".operatorBtn").click(function(event) {
    equationCache.push(currentValue);
    var currentButton = $(this).attr("id");

    //console.log("currentButton");
    // reset the inputNumber, currentValue, store the operator
    //check if previous button is operator or not
    var operatorsArray = ["+", "-", "*", "/"];
    var previousOperator = false;
    if (performedEqual) {
        previousOperator = true;
    } else if(!operatorsArray.includes(equationCache[equationCache.length - 1])) {
        previousOperator = true;
    }
    if (currentValue != null && previousOperator) {
        equationCache.push(currentButton);
        console.log("current equationCache is: " + equationCache);
        currentValue = null;
        inputNumber = [];
    }

    /*switch (currentButton) {
      case "+":
        equationCache.push("+");
        break;
      case "*":
        equationCache.push("*");
        break;
      case "-":
        equationCache.push("-");
        break;
      case "/":
        equationCache.push("/");
        break;
    }*/

    // then multiple operator, to detect if this is the first operator entered

    // multiple operator also needs to consider priority

    //currentValue = parseFloat(currentValue);
    //$(".result-screen").text(currentValue);
});

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