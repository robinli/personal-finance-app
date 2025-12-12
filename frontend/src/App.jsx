import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import WeeklyReport from './components/WeeklyReport';
import api from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [report, setReport] = useState(null);

  const fetchData = async () => {
    try {
      const transactionsRes = await api.get('/transactions/');
      setTransactions(transactionsRes.data);

      const reportRes = await api.get('/report/weekly');
      setReport(reportRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Personal Finance Tracker</h1>

        <WeeklyReport report={report} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TransactionForm onTransactionAdded={fetchData} />
          </div>
          <div className="lg:col-span-2">
            <TransactionList transactions={transactions} onTransactionDeleted={fetchData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
