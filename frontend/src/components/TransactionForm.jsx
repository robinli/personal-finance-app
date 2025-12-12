import React, { useState, useEffect } from 'react';
import api from '../api';
import { useTranslation } from 'react-i18next';
const TransactionForm = ({ onTransactionAdded }) => {
    const { t } = useTranslation();
    const [type, setType] = useState('credit');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories/');
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);

    // Effect to reset category when type changes or categories update
    useEffect(() => {
        const filteredCategories = categories.filter(c => c.type === type);
        if (filteredCategories.length > 0) {
            setCategory(filteredCategories[0].name);
        } else {
            setCategory('');
        }
    }, [type, categories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/transactions/', {
                type,
                amount: parseFloat(amount),
                category,
                description,
                date,
            });
            onTransactionAdded();
            setAmount('');
            setCategory('');
            setDescription('');
        } catch (error) {
            console.error("Error adding transaction", error);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 transition-colors duration-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t('form.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('form.type')}</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:text-white"
                        >
                            <option value="credit">{t('form.credit')}</option>
                            <option value="debit">{t('form.debit')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('form.amount')}</label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('form.category')}</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:text-white"
                        >
                            <option value="" disabled>{t('category.select_placeholder')}</option>
                            {categories.filter(c => c.type === type).map((cat) => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('form.date')}</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('form.description')}</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {t('form.submit')}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
