import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${i18n.language === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                English
            </button>
            <button
                onClick={() => changeLanguage('zh-TW')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${i18n.language === 'zh-TW' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                繁體中文
            </button>
        </div>
    );
};

export default LanguageSwitcher;
