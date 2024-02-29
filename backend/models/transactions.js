const daoTransactions = require("../daos/transactions");

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  editTransaction,
  deleteTransaction,
};

function createTransaction(param) {
  return daoTransactions.create(param);
}

function getTransactions(id) {
  return daoTransactions.find({ userId: id });
}

function getTransaction(id) {
  return daoTransactions.findById(id);
}

function editTransaction(id, data) {
  return daoTransactions.findByIdAndUpdate(id, data, { new: true });
}

function deleteTransaction(id) {
  return daoTransactions.findByIdAndDelete(id);
}
