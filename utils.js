function filterExpenses(expenses, category, startDate, endDate) {
                return expenses.filter(expense => {
                  const matchesCategory = !category || expense.category === category;
                  const matchesDate = (!startDate || new Date(expense.date) >= new Date(startDate)) &&
                                      (!endDate || new Date(expense.date) <= new Date(endDate));
                  return matchesCategory && matchesDate;
                });
              }
              
              function analyzeExpenses(expenses) {
                const totalsByCategory = expenses.reduce((totals, expense) => {
                  totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
                  return totals;
                }, {});
              
                const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
              
                return { totalsByCategory, totalAmount };
              }
              
              module.exports = { filterExpenses, analyzeExpenses };
              