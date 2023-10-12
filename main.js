// chart.js

let xLabel = ["Food", "Healtcare", "Housing"];
let yLabel = [200, 100, 500];
let barColors = [
   "rgb(255, 99, 132)", // Food
   "rgb(75, 192, 192)", // Healthcare
   "rgb(255, 205, 86)", // Housing
   "rgb(99, 135, 255)", // Salary
   //    "rgb(54, 162, 235)",
];

new Chart("myChart", {
   type: "polarArea",
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

let xLabel1 = ["Salary", "Healtcare", "Housing"];
let yLabel1 = [200, 100, 500];
let barColors1 = [
   "rgb(255, 99, 132)", // Food
   "rgb(75, 192, 192)", // Healthcare
   "rgb(255, 205, 86)", // Housing
   "rgb(99, 135, 255)", // Salary
   //    "rgb(54, 162, 235)",
];

new Chart("myChart1", {
   type: "polarArea",
   data: {
      labels: xLabel1,
      datasets: [
         {
            backgroundColor: barColors1,
            data: yLabel1,
            // borderColor:
         },
      ],
   },
   options: {
      responsive: false,
      title: {
         display: true,
         text: "Income",
      },
      legend: {
         display: true,
         position: "bottom",
      },
   },
});
