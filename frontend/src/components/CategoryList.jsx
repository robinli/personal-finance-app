import React, { useState, useEffect } from 'react';
import api from '../api';
import { useTranslation } from 'react-i18next';

const CategoryList = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [type, setType] = useState('credit');
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories/');
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/categories/', {
                name: newCategory,
                type: type
            });
            setNewCategory('');
            fetchCategories();
        } catch (error) {
            console.error("Error adding category", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setDeletingId(id);
    };

    const handleConfirmDelete = async (id) => {
        try {
            await api.delete(`/categories/${id}`);
            fetchCategories();
            setDeletingId(null);
        } catch (error) {
            console.error("Error deleting category", error);
            alert(t('list.delete_error'));
        }
    };

    const handleCancelDelete = () => {
        setDeletingId(null);
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6 transition-colors duration-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">{t('category.title')}</h3>

            <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder={t('category.placeholder')}
                    required
                    className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:text-white"
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:text-white"
                >
                    <option value="credit">{t('form.credit')}</option>
                    <option value="debit">{t('form.debit')}</option>
                </select>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {t('category.add')}
                </button>
            </form>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {categories.map((category) => (
                    <li key={category.id} className="py-3 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {category.name}
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${category.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {category.type === 'credit' ? t('form.credit') : t('form.debit')}
                            </span>
                        </span>
                        {deletingId === category.id ? (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleConfirmDelete(category.id)}
                                    className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-medium focus:outline-none"
                                >
                                    {t('list.confirm')}
                                </button>
                                <button
                                    onClick={handleCancelDelete}
                                    className="text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-2 py-1 rounded text-xs font-medium focus:outline-none"
                                >
                                    {t('list.cancel')}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleDeleteClick(category.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                            >
                                {t('list.delete')}
                            </button>
                        )}
                    </li>
                ))}
                {categories.length === 0 && (
                    <li className="py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                        {t('category.no_categories')}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default CategoryList;
