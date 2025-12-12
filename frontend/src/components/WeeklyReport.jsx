import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const WeeklyReport = ({ report, onFilterChange }) => {
    const { t } = useTranslation();

    // Default to last 7 days (Today - 6 days ~ Today)
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(formatDate(lastWeek));
    const [endDate, setEndDate] = useState(formatDate(today));

    const handleFilter = () => {
        onFilterChange(startDate, endDate);
    };

    if (!report) return null;

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-6 transition-colors duration-200">
            <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('report.title')}</h3>
                    <div className="flex space-x-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <span className="self-center text-gray-500">-</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                            onClick={handleFilter}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t('report.filter')}
                        </button>
                    </div>
                </div>
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">{t('report.total_credit')}</dt>
                        <dd className="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">${report.total_credit.toFixed(2)}</dd>
                    </div>
                    <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">{t('report.total_debit')}</dt>
                        <dd className="mt-1 text-3xl font-semibold text-red-600 dark:text-red-400">${report.total_debit.toFixed(2)}</dd>
                    </div>
                    <div className="px-4 py-5 bg-gray-50 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">{t('report.net_balance')}</dt>
                        <dd className={`mt-1 text-3xl font-semibold ${report.net_balance >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
                            ${report.net_balance.toFixed(2)}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default WeeklyReport;
