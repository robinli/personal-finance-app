import React from 'react';
import { useTranslation } from 'react-i18next';

const WeeklyReport = ({ report }) => {
    const { t } = useTranslation();
    if (!report) return null;

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-6 transition-colors duration-200">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">{t('report.title')}</h3>
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
