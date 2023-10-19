// Transactions Data
const removeBtn = document.querySelectorAll(".del-btn");
const liItem = document.querySelectorAll(".h-item");
const inputs = document.querySelectorAll("input");
const expenseOption = document.querySelector("#group");
const expenseAmount = document.querySelector("#amount");
const expenseDate = document.querySelector("#date");
const submitBtn = document.querySelector(".btn-submit");
const historyWrap = document.querySelector(".history");

// modal
const modal = document.querySelector(".add-blur");
const transactionBtn = document.querySelector(".btn");
const transactionWrap = document.querySelector(".transaction-wrap");
const addTransaction = document.querySelector(".add-transactions");
const closeModalX = document.querySelector(".exit-modal");

// total income and spent DOM variables
const totIncome = document.querySelectorAll(".tot-income");
const totSpent = document.querySelectorAll(".tot-spent");
const balanceBig = document.querySelector(".balance-big");
// const incomeBig = document.querySelector(".income-big");

// chart.js data
const xLabel = ["Food", "Healthcare", "Housing"];
let yLabel = [1, 1, 1];
const barColors = [
   "rgb(255, 99, 132)", // Food
   "rgb(75, 192, 192)", // Healthcare
   "rgb(255, 205, 86)", // Housing
   "rgb(99, 135, 255)", // Salary
];

// Define myChart as a global variable
let myChart;

// Create the chart
createChart();

// Function to create the chart
function createChart() {
   myChart = new Chart("myChart", {
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
            text: "All Expenses",
            fontWeight: "lighter",
            fontSize: 14,
         },
         legend: {
            display: true,
            position: "bottom",
         },
      },
   });
}

// ! icon classes but doesnt work with Vite...
// const iconClasses = {
//    Food: ["bi", "bi-lightning-charge"],
//    Healthcare: ["bi", "bi-balloon-heart"],
//    Housing: ["bi", "bi-house-heart"],
//    Salary: ["bi", "bi-cash-stack"],
// };

// total income and spent variables
let totalIncome = 0;
let totalExpense = 0;

let allTransactions = [];

function Transaction(group, amount, date) {
   this.group = group;
   this.amount = amount;
   this.date = date;
}

// * function to sum all transactions by group for chart js
const sumTransactions = () => {
   let foodGroup = 0;
   let healthcareGroup = 0;
   let housingGroup = 0;
   let salaryGroup = 0;

   allTransactions.forEach((transaction) => {
      if (transaction.group === "Food") {
         // ? takes absolute value of amount and adds it to the group variable
         foodGroup = Math.abs(parseInt(transaction.amount));
      } else if (transaction.group === "Healthcare") {
         healthcareGroup += Math.abs(parseInt(transaction.amount));
      } else if (transaction.group === "Housing") {
         housingGroup += Math.abs(parseInt(transaction.amount));
      } else salaryGroup += Math.abs(parseInt(transaction.amount));
   });

   yLabel = [foodGroup, healthcareGroup, housingGroup];
   return yLabel;
};

// * function to push positive or negative amount to totalSpent array
const sumTotalSpent = () => {
   totalIncome = 0;
   totalExpense = 0;
   allTransactions.forEach((transaction) => {
      if (transaction.amount < 0) {
         totalExpense += +transaction.amount;
      } else {
         totalIncome += +transaction.amount;
      }
   });
   return totalExpense, totalIncome;
};

// function to add new transaction to all transactions array
const addNewTransaction = () => {
   // check if all fields are filled out
   if (
      expenseOption.value === "" ||
      expenseAmount.value === "" ||
      expenseDate.value === ""
   ) {
      alert("All fields must be filled out");
      return;
   }

   let amount = expenseAmount.value;
   // check if amount is positive or negative by checking group
   // if group is food, healthcare or housing and amount is positive, make it negative
   // else if group is salary and amount is negative, make it positive
   switch (expenseOption.value) {
      case "Food":
      case "Healthcare":
      case "Housing":
         if (amount > 0) {
            amount = -amount;
         }
         break;
      case "Salary":
         if (amount < 0) {
            amount = -amount;
         }
         break;
   }

   const newTransaction = new Transaction(
      expenseOption.value,
      amount,
      expenseDate.value
   );

   allTransactions.push(newTransaction);
   clearInputs();
   closeModal();

   // Save the updated allTransactions array to local storage
   localStorage.setItem("transactions", JSON.stringify(allTransactions));
};

// * filling out form and adding new transaction on click of submit button
submitBtn.addEventListener("click", (e) => {
   e.preventDefault();
   addNewTransaction();
   spinTransactionArray();
   sumTransactions();
   sumTotalSpent();
   updateTotals(totalIncome, totalExpense);
   updateBalance(totalIncome, totalExpense);

   // ? Update the chart with the new yLabel values
   yLabel = sumTransactions();
   myChart.data.datasets[0].data = yLabel;
   myChart.update();
});

// * take each transaction from array and pass to createNewTransactionDOM
const spinTransactionArray = () => {
   const transactionRemove = document.querySelectorAll(".h-item");
   transactionRemove.forEach((item) => item.remove());

   allTransactions.forEach((transaction) => {
      createNewTransactionDOM(transaction);
   });
};

// * create li item for each transaction
const createNewTransactionDOM = (item) => {
   // create li element
   const transaction = document.createElement("li");
   transaction.classList.add("h-item");
   // create container for icon
   const transactionIcon = document.createElement("div");
   transactionIcon.classList.add("icon");
   // create icon
   const icon = document.createElement("i");
   // icon classes
   switch (item.group) {
      case "Food":
         icon.classList.add("bi", "bi-lightning-charge");
         break;
      case "Healthcare":
         icon.classList.add("bi", "bi-balloon-heart");
         break;
      case "Housing":
         icon.classList.add("bi", "bi-house-heart");
         break;
      default:
         icon.classList.add("bi", "bi-cash-stack");
         break;
   }
   // ! doesnt work with Vite...
   // icon.classList.add(...iconClasses[item.group]);
   // category wrapper
   const category = document.createElement("div");
   category.classList.add("category-item");
   // category text - h3
   const categoryText = document.createElement("h3");
   categoryText.classList.add("text-base");
   // category date text - p
   const categoryDate = document.createElement("p");
   categoryDate.classList.add("small-txt");
   // category amount wrapper
   const categoryAmount = document.createElement("div");
   // check if amount is positive or negative
   if (item.group === "Salary") {
      categoryAmount.classList.add("amount-item", "a-2");
   } else {
      categoryAmount.classList.add("amount-item", "a-1");
   }
   // category amount text - h3
   const categoryAmountText = document.createElement("h3");
   // delete icon wrapper
   const deleteIconWrap = document.createElement("div");
   deleteIconWrap.classList.add("icon-del");
   // delete icon
   const deleteIcon = document.createElement("i");
   deleteIcon.classList.add("bi", "bi-x-lg", "del-btn", "ml-1");

   // append elements
   transaction.appendChild(transactionIcon);
   transactionIcon.appendChild(icon);
   transaction.appendChild(category);
   category.appendChild(categoryText);
   category.appendChild(categoryDate);
   transaction.appendChild(categoryAmount);
   categoryAmount.appendChild(categoryAmountText);
   transaction.appendChild(deleteIconWrap);
   deleteIconWrap.appendChild(deleteIcon);

   // add text content
   categoryText.textContent = item.group;
   categoryDate.textContent = item.date;
   categoryAmountText.textContent = `${item.amount} EUR`;

   // append to history
   historyWrap.appendChild(transaction);

   // remove transaction on click of delete icon
   deleteIcon.addEventListener("click", () => {
      historyWrap.removeChild(transaction);
      allTransactions.splice(allTransactions.indexOf(item), 1);
      sumTransactions();
      sumTotalSpent();
      updateTotals(totalIncome, totalExpense);
      updateBalance(totalIncome, totalExpense);

      // Save the updated allTransactions array to local storage
      localStorage.setItem("transactions", JSON.stringify(allTransactions));

      // ? Update the chart with the new yLabel values
      if (allTransactions.length === 0) {
         yLabel = [1, 1, 1];
      }
      myChart.data.datasets[0].data = yLabel;
      myChart.update();
   });
};

// * function to add income and spent totals to DOM from allTransactions array
const updateTotals = (totalIncome, totalExpense) => {
   totIncome.forEach((item) => (item.textContent = `${totalIncome} EUR`));
   totSpent.forEach((item) => (item.textContent = `${totalExpense} EUR`));
};

// * function to update balance to DOM
const updateBalance = (totalIncome, totalExpense) => {
   balanceBig.textContent = `${totalIncome + totalExpense} EUR`;
};

// * modal playground
transactionBtn.addEventListener("click", () => {
   modal.classList.remove("hide");
   transactionWrap.classList.remove("hide");
});

const closeModal = () => {
   modal.classList.add("hide");
   addTransaction.classList.add("hide");
};

modal.addEventListener("click", closeModal);
closeModalX.addEventListener("click", closeModal);

// * clear input values
const clearInputs = () => {
   inputs.forEach((input) => (input.value = ""));
};

// *  Check if there are any transactions in local storage
if (localStorage.getItem("transactions")) {
   // Load transactions from local storage
   allTransactions = JSON.parse(localStorage.getItem("transactions"));
   spinTransactionArray();
   sumTransactions();
   sumTotalSpent();
   updateTotals(totalIncome, totalExpense);
   updateBalance(totalIncome, totalExpense);
   if (allTransactions.length === 0) {
      yLabel = [1, 1, 1];
   }
   myChart.data.datasets[0].data = yLabel;
   myChart.update();
} else {
   // Initialize allTransactions as an empty array
   allTransactions = [];
}
