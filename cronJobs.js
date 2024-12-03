const cron = require("node-cron");
const { expenses } = require("./data");
const { analyzeExpenses } = require("./utils");

function generateReport() {
  const analysis = analyzeExpenses(expenses);
  console.log("Automated Report:");
  console.log(JSON.stringify(analysis, null, 2));
}

cron.schedule("0 0 * * 0", () => { // Every Sunday at midnight
  console.log("Generating weekly summary...");
  generateReport();
});

cron.schedule("0 0 1 * *", () => { // Every 1st of the month at midnight
  console.log("Generating monthly summary...");
  generateReport();
});

module.exports = { generateReport };
