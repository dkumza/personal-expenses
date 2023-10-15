// * Transactions Data
const removeBtn = document.querySelectorAll(".del-btn");
const liItem = document.querySelectorAll(".h-item");
const inputs = document.querySelectorAll("input");
const expenseOption = document.querySelector("#group");
const expenseAmount = document.querySelector("#amount");
const expenseDate = document.querySelector("#date");
const submitBtn = document.querySelector(".btn-submit");
const historyWrap = document.querySelector(".history");
// console.log(options);
// * modal
// * declare variables
const modal = document.querySelector(".add-blur");
const transactionBtn = document.querySelector(".btn");
const transactionWrap = document.querySelector(".transaction-wrap");
const addTransaction = document.querySelector(".add-transactions");

// ? icon classes
const iconClasses = {
   Food: ["bi", "bi-lightning-charge"],
   Healthcare: ["bi", "bi-balloon-heart"],
   Housing: ["bi", "bi-house-heart"],
   Salary: ["bi", "bi-cash-stack"],
};

const allTransactions = [];

// ? function to create new transaction
class Transaction {
   constructor(group, amount, date) {
      this.group = group;
      this.amount = amount;
      this.date = date;
   }
}

// ? function to add new transaction to all transactions array
const addNewTransaction = () => {
   let addNewTransaction = new Transaction(
      expenseOption.value,
      expenseAmount.value,
      expenseDate.value
   );
   if (
      addNewTransaction.group === "" ||
      addNewTransaction.amount === "" ||
      addNewTransaction.date === ""
   ) {
      alert("All fields must be filled out");
   } else {
      allTransactions.push(addNewTransaction);
      console.log(allTransactions);
      closeModal();
      clearInputs();
      spinTransactionArray();
      // createNewTransactionDOM();
   }
};

//  ? remove li item on click of delete button
removeBtn.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
   });
});

// ? take each transaction from array and pass to createNewTransactionDOM
let spinTransactionArray = () => {
   const transactionRemove = document.querySelectorAll(".h-item");
   transactionRemove.forEach((item) => item.remove());

   allTransactions.forEach((transaction) => {
      createNewTransactionDOM(transaction);
   });
};

// ? create li item for each transaction
const createNewTransactionDOM = (item) => {
   // * create li element
   const transaction = document.createElement("li");
   transaction.classList.add("h-item");
   // * create container for icon
   const transactionIcon = document.createElement("div");
   transactionIcon.classList.add("icon");
   // * create icon
   const icon = document.createElement("i");
   icon.classList.add(...iconClasses[item.group]);
   // * category wrapper
   const category = document.createElement("div");
   category.classList.add("category-item");
   // * category text - h3
   const categoryText = document.createElement("h3");
   categoryText.classList.add("text-base");
   // * category date text - p
   const categoryDate = document.createElement("p");
   categoryDate.classList.add("small-txt");
   // * category amount wrapper
   const categoryAmount = document.createElement("div");
   // ! check if amount is positive or negative
   if (item.amount < 0) {
      categoryAmount.classList.add("amount-item", "a-1");
   } else {
      categoryAmount.classList.add("amount-item", "a-2");
   }
   // * category amount text - h3
   const categoryAmountText = document.createElement("h3");
   //  * delete icon wrapper
   const deleteIconWrap = document.createElement("div");
   deleteIconWrap.classList.add("icon-del");
   // * delete icon
   const deleteIcon = document.createElement("i");
   deleteIcon.classList.add("bi", "bi-x-lg", "del-btn", "ml-1");

   // * append elements
   transaction.appendChild(transactionIcon);
   transactionIcon.appendChild(icon);
   transaction.appendChild(category);
   category.appendChild(categoryText);
   category.appendChild(categoryDate);
   transaction.appendChild(categoryAmount);
   categoryAmount.appendChild(categoryAmountText);
   transaction.appendChild(deleteIconWrap);
   deleteIconWrap.appendChild(deleteIcon);

   // * add text content
   categoryText.textContent = item.group;
   categoryDate.textContent = item.date;
   categoryAmountText.textContent = item.amount;

   // * append to history
   historyWrap.appendChild(transaction);
};

// ? filling out form and adding new transaction on click of submit button
submitBtn.addEventListener("click", (e) => {
   e.preventDefault();
   addNewTransaction();
});

// ? modal playground

transactionBtn.addEventListener("click", () => {
   modal.classList.remove("hide");
   transactionWrap.classList.remove("hide");
});

const closeModal = () => {
   modal.classList.add("hide");
   addTransaction.classList.add("hide");
};

modal.addEventListener("click", closeModal);

// ? clear input values
const clearInputs = () => {
   inputs.forEach((input) => (input.value = ""));
};

// ! chart.js

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
