import React from 'react';
import api from '../api';

const TransactionList = ({ transactions, onTransactionDeleted }) => {

    const [deletingId, setDeletingId] = React.useState(null);

    const handleDeleteClick = (id) => {
        setDeletingId(id);
    };

    const handleConfirmDelete = async (id) => {
        try {
            await api.delete(`/transactions/${id}`);
            onTransactionDeleted();
            setDeletingId(null);
        } catch (error) {
            console.error("Error deleting transaction", error);
            alert("Failed to delete transaction");
        }
    };

    const handleCancelDelete = () => {
        setDeletingId(null);
    };

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
            </div>
            <div className="border-t border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                        <li key={transaction.id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-indigo-600 truncate">
                                    {transaction.category}
                                </div>
                                <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {transaction.type}
                                    </span>
                                    {deletingId === transaction.id ? (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleConfirmDelete(transaction.id)}
                                                className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-medium focus:outline-none"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={handleCancelDelete}
                                                className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-medium focus:outline-none"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleDeleteClick(transaction.id)}
                                            className="text-red-600 hover:text-red-900 text-sm font-medium focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                        {transaction.description}
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <p>
                                        ${transaction.amount.toFixed(2)}
                                    </p>
                                    <p className="ml-4">
                                        {transaction.date}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                    {transactions.length === 0 && (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                            No transactions found.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TransactionList;
