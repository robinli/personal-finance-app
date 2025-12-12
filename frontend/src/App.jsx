import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import WeeklyReport from './components/WeeklyReport';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import api from './api';

function App() {
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('app.title')}</h1>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>

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
