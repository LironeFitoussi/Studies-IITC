var firstNumber = ``;
var operator;
var secondNumber = ``; 
var result;


for (let i = 0; i < 11; i++) {
    var calcNumberElement = document.getElementsByClassName("calcNumber")[i];
    var displayNumber = document.getElementById("displayNumber");

    calcNumberElement.addEventListener("click", function () {
        calcNumberElement = document.getElementsByClassName("calcNumber")[i]
        if (operator == undefined) {
            displayNumber.innerHTML += calcNumberElement.querySelector("span").innerText;
            firstNumber += calcNumberElement.querySelector("span").innerText;
        } else {
            displayNumber.innerHTML += calcNumberElement.querySelector("span").innerText;
            secondNumber += calcNumberElement.querySelector("span").innerText;
        }
    });
}

for (let j = 0; j < 4; j++) {
    var calcOperatorElement = document.getElementsByClassName("calcOperator")[j];
    calcOperatorElement.addEventListener("click", function () {
        displayNumber.innerHTML = ``
        calcOperatorElement = document.getElementsByClassName("calcOperator")[j]
        operator = calcOperatorElement.querySelector("span").innerText;
        if (operator == "X") {
            operator = "*";
        }
        console.log(operator);
    });
}

equal.addEventListener("click", function() {
    if (operator === null || secondNumber === ``) {
        console.log("Invalid input");
        return;
    }
    
    switch (operator) {
        case "+":
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case "-":
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case "*":
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case "/":
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
        default:
            console.log("Invalid operator");
            break;
    }
    
    // Display the result
    displayNumber.innerText = result;
    firstNumber = result
    secondNumber = ``
    operator = undefined;
});

clearMath.addEventListener("click", function() {
    firstNumber = ``;
    secondNumber = ``;
    operator = undefined;
    result = undefined;
    displayNumber.innerText = ``
});