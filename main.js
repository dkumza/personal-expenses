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
         },
         legend: {
            display: true,
            position: "bottom",
         },
      },
   });
}

// icon classes
const iconClasses = {
   Food: ["bi", "bi-lightning-charge"],
   Healthcare: ["bi", "bi-balloon-heart"],
   Housing: ["bi", "bi-house-heart"],
   Salary: ["bi", "bi-cash-stack"],
};

// total income and spent variables
let totalIncome = 0;
let totalExpense = 0;

let allTransactions = [];

/// function to sum all transactions by group
const sumTransactions = () => {
   // sum of each group variables
   let foodGroup = 0;
   let healthcareGroup = 0;
   let housingGroup = 0;

   allTransactions.forEach((transaction) => {
      if (transaction.group === "Food") {
         // takes absolute value of amount and adds it to the group variable
         foodGroup += Math.abs(parseInt(transaction.amount));
      } else if (transaction.group === "Healthcare") {
         healthcareGroup += Math.abs(parseInt(transaction.amount));
      } else if (transaction.group === "Housing") {
         housingGroup += Math.abs(parseInt(transaction.amount));
      }
   });

   yLabel = [foodGroup, healthcareGroup, housingGroup];
   return yLabel;
};

// function to push positive or negative amount to totalSpent array
const sumTotalSpent = () => {
   totalIncome = 0;
   totalExpense = 0;
   allTransactions.forEach((transaction) => {
      if (transaction.amount < 0) {
         totalExpense += parseInt(transaction.amount);
      } else {
         totalIncome += parseInt(transaction.amount);
      }
   });
   return totalExpense, totalIncome;
   // console.log("sumTotalSpent");
   // console.log(totalExpense, totalIncome);
   // console.log("working");
};

// function to create new transaction
class Transaction {
   constructor(group, amount, date) {
      this.group = group;
      this.amount = amount;
      this.date = date;
   }
}

// function to add new transaction to all transactions array
const addNewTransaction = () => {
   const newTransaction = new Transaction(
      expenseOption.value,
      expenseAmount.value,
      expenseDate.value
   );
   if (
      newTransaction.group === "" ||
      newTransaction.amount === "" ||
      newTransaction.date === ""
   ) {
      alert("All fields must be filled out");
   } else {
      // Multiply the amount by -1 if it is positive
      if (newTransaction.amount > 0 && newTransaction.group !== "Salary") {
         newTransaction.amount *= -1;
      }
      allTransactions.push(newTransaction);
      closeModal();
      clearInputs();
      spinTransactionArray();
      // yLabel = sumTransactions();
      sumTransactions();
      sumTotalSpent();

      updateTotals(totalIncome, totalExpense);
      updateBalance(totalIncome, totalExpense);
      console.log(allTransactions);

      // Update the chart with the new yLabel values
      myChart.data.datasets[0].data = yLabel;
      myChart.update();
   }
};

// take each transaction from array and pass to createNewTransactionDOM
const spinTransactionArray = () => {
   const transactionRemove = document.querySelectorAll(".h-item");
   transactionRemove.forEach((item) => item.remove());

   allTransactions.forEach((transaction) => {
      createNewTransactionDOM(transaction);
   });

   // Update the chart with the new yLabel values
   myChart.data.datasets[0].data = yLabel;
   myChart.update();
};

// create li item for each transaction
const createNewTransactionDOM = (item) => {
   // create li element
   const transaction = document.createElement("li");
   transaction.classList.add("h-item");
   // create container for icon
   const transactionIcon = document.createElement("div");
   transactionIcon.classList.add("icon");
   // create icon
   const icon = document.createElement("i");
   icon.classList.add(...iconClasses[item.group]);
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
   if (item.amount < 0) {
      categoryAmount.classList.add("amount-item", "a-1");
   } else {
      categoryAmount.classList.add("amount-item", "a-2");
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
   // remove li item on click of delete button
   const removeBtn = document.querySelectorAll(".del-btn");
   removeBtn.forEach((btn) =>
      btn.addEventListener("click", (e) => {
         const liItem = e.target.parentElement.parentElement;
         const amountText = liItem
            .querySelector(".amount-item h3")
            .textContent.replace(/EUR|\s/g, "");
         const amountNumber = Number(amountText);
         const index = allTransactions.findIndex(
            (transaction) => transaction.amount === amountNumber
         );
         allTransactions.splice(index, 1);
         liItem.remove();
         sumTransactions();
         sumTotalSpent();
         updateTotals(totalIncome, totalExpense);
         updateBalance(totalIncome, totalExpense);
         myChart.data.datasets[0].data = yLabel;
         myChart.update();
      })
   );
};

// filling out form and adding new transaction on click of submit button
submitBtn.addEventListener("click", (e) => {
   e.preventDefault();
   addNewTransaction();
});

// function to add income and spent totals to DOM from allTransactions array

const updateTotals = (totalIncome, totalExpense) => {
   totIncome.forEach((item) => (item.textContent = `${totalIncome} EUR`));
   // totIncome.textContent = `${totalIncome} EUR`;
   totSpent.forEach((item) => (item.textContent = `${totalExpense} EUR`));
   // totSpent.textContent = `${totalExpense} EUR`;
};

// function to update balance to DOM
const updateBalance = (totalIncome, totalExpense) => {
   balanceBig.textContent = `${totalIncome + totalExpense} EUR`;
};

// modal playground
transactionBtn.addEventListener("click", () => {
   modal.classList.remove("hide");
   transactionWrap.classList.remove("hide");
});

const closeModal = () => {
   modal.classList.add("hide");
   addTransaction.classList.add("hide");
};

modal.addEventListener("click", closeModal);

// clear input values
const clearInputs = () => {
   inputs.forEach((input) => (input.value = ""));
};
