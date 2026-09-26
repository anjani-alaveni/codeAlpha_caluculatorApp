const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

// Theme Toggle

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

 // Add or remove light-theme class
 document.body.classList.toggle("light-theme");

 // Change button text
 if (document.body.classList.contains("light-theme")) {
  themeButton.innerText = "🌙 Dark Mode";
 } else {
  themeButton.innerText = "☀️ Light Mode";
 }

});

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

  // Add calculation to history
  addToHistory(expression, result);

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

// Keyboard Support
document.addEventListener("keydown", function (event) {

 let key = event.key;

 // Numbers and decimal
 if (!isNaN(key) || key === ".") {

  // Find the button with the same text
  buttons.forEach(function (button) {
   if (button.innerText === key) {
    button.click();
   }
  });

 }

 // Addition
 else if (key === "+") {
  buttons.forEach(function (button) {
   if (button.innerText === "+") {
    button.click();
   }
  });
 }

 // Subtraction
 else if (key === "-") {
  buttons.forEach(function (button) {
   if (button.innerText === "-") {
    button.click();
   }
  });
 }

 // Multiplication
 else if (key === "*") {
  buttons.forEach(function (button) {
   if (button.innerText === "×") {
    button.click();
   }
  });
 }

 // Division
 else if (key === "/") {
  buttons.forEach(function (button) {
   if (button.innerText === "÷") {
    button.click();
   }
  });
 }

 // Enter = Result
 else if (key === "Enter") {
  event.preventDefault();
  resultButton.click();
 }

 // Backspace = Delete
 else if (key === "Backspace") {
  backspaceButton.click();
 }

 // Escape = Clear
 else if (key === "Escape") {
  clearButton.click();
 }

 // % = Percentage
 else if (key === "%") {
  percentageButton.click();
 }
});

// =========================
// COPY RESULT
// =========================

const copyButton = document.getElementById("copyResult");

copyButton.addEventListener("click", function () {

 navigator.clipboard.writeText(display.value);

 copyButton.innerText = "✅ Copied!";

 setTimeout(function () {
  copyButton.innerText = "📋 Copy";
 }, 1500);

});
// =========================
// CALCULATION HISTORY
// =========================

const historyList = document.getElementById("historyList");
const clearHistoryButton = document.getElementById("clearHistory");


// Add calculation to history
function addToHistory(expression, result) {

 const historyItem = document.createElement("div");

 historyItem.classList.add("history-item");

 historyItem.innerText = expression + " = " + result;

 historyList.appendChild(historyItem);
}


// Clear history
clearHistoryButton.addEventListener("click", function () {

 historyList.innerHTML = "";

});
