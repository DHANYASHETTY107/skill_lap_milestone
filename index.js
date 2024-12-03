const express = require("express");
const bodyParser = require("body-parser");
const expenseRoutes = require("./routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", expenseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Expense Tracker API running on http://localhost:${PORT}`);
});
