import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import WeeklyReport from './components/WeeklyReport';
import CategoryList from './components/CategoryList';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import api from './api';

function App() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [report, setReport] = useState(null);

  const fetchData = async (start_date, end_date) => {
    try {
      const transactionsRes = await api.get('/transactions/');
      setTransactions(transactionsRes.data);

      const params = {};
      if (start_date) params.start_date = start_date;
      if (end_date) params.end_date = end_date;

      const reportRes = await api.get('/report/weekly', { params });
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

        <WeeklyReport report={report} onFilterChange={fetchData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TransactionForm onTransactionAdded={fetchData} />
            <CategoryList />
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
