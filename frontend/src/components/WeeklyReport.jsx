import React from 'react';

const WeeklyReport = ({ report }) => {
    if (!report) return null;

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Weekly Report (Last 7 Days)</h3>
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Credit</dt>
                        <dd className="mt-1 text-3xl font-semibold text-green-600">${report.total_credit.toFixed(2)}</dd>
                    </div>
                    <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Debit</dt>
                        <dd className="mt-1 text-3xl font-semibold text-red-600">${report.total_debit.toFixed(2)}</dd>
                    </div>
                    <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Net Balance</dt>
                        <dd className={`mt-1 text-3xl font-semibold ${report.net_balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                            ${report.net_balance.toFixed(2)}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default WeeklyReport;
