const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");



buttons.forEach(function (button) {

 button.addEventListener("click", function () {

  let value = button.innerText;

  if (!isNaN(value) || value === ".") {

   if (display.value === "0") {
    display.value = value;
   } else {
    display.value += value;
   }

  }

  else if (button.classList.contains("operator") &&
   !button.classList.contains("percentage")) {
   display.value += value;
  }

 });

});


// Result
const resultButton = document.querySelector(".result");

resultButton.addEventListener("click", function () {

 let expression = display.value;

 expression = expression.replaceAll("×", "*");
 expression = expression.replaceAll("÷", "/");

 try {
  let result = eval(expression);
  display.value = result;
 }

 catch (error) {
  display.value = "Error";
 }

});


// Clear
const clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", function () {

 display.value = "0";

});


// Backspace
const backspaceButton = document.querySelector(".backspace");

backspaceButton.addEventListener("click", function () {

 display.value = display.value.slice(0, -1);

 if (display.value === "") {
  display.value = "0";
 }

});



const percentageButton = document.querySelector(".percentage");

percentageButton.addEventListener("click", function () {

 let value = parseFloat(display.value);

 if (!isNaN(value)) {
  display.value = value / 100;
 }

});
