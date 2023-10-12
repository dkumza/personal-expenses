// modal for transaction history

// declare variables
let historyBtn = document.querySelector(".btn-history");
let modal1 = document.querySelector(".add-blur");
let historyExpanded = document.querySelector(".history-expanded");

// show modal
historyBtn.addEventListener("click", () => {
   modal1.classList.remove("hide");
   historyExpanded.classList.remove("hide");
});

// hide modal

modal1.addEventListener("click", () => {
   modal1.classList.add("hide");
   historyExpanded.classList.add("hide");
});
// end of transaction history modal

// add transaction modal
let modal2 = document.querySelector(".add-blur");
let transactionBtn = document.querySelector(".btn");
let transactionWrap = document.querySelector(".transaction-wrap");
let addTransaction = document.querySelector(".add-transactions");

transactionBtn.addEventListener("click", () => {
   modal2.classList.remove("hide");
   transactionWrap.classList.remove("hide");
});

modal2.addEventListener("click", () => {
   modal2.classList.add("hide");
   addTransaction.classList.add("hide");
});

// let modal2 = doc;

// chart.js

let xLabel = ["Food", "Healtcare", "Housing"];
let yLabel = [500, 100, 300];
let barColors = [
   "rgb(255, 99, 132)", // Food
   "rgb(75, 192, 192)", // Healthcare
   "rgb(255, 205, 86)", // Housing
   "rgb(99, 135, 255)", // Salary
   //    "rgb(54, 162, 235)",
];

new Chart("myChart", {
   type: "pie",
   data: {
      labels: xLabel,
      datasets: [
         {
            backgroundColor: barColors,
            data: yLabel,
         },
      ],
   },
   options: {
      responsive: false,
      title: {
         display: true,
         //  text: "Expanses",
      },
      legend: {
         display: true,
         position: "bottom",
      },
   },
});
