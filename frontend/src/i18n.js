import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "app": {
                "title": "Personal Finance Tracker"
            },
            "form": {
                "title": "Add Transaction",
                "type": "Type",
                "credit": "Credit",
                "debit": "Debit",
                "amount": "Amount",
                "category": "Category",
                "date": "Date",
                "description": "Description",
                "submit": "Add Transaction"
            },
            "list": {
                "title": "Recent Transactions",
                "confirm": "Confirm",
                "cancel": "Cancel",
                "delete": "Delete",
                "no_transactions": "No transactions found.",
                "delete_error": "Failed to delete transaction"
            },
            "report": {
                "title": "Weekly Report (Last 7 Days)",
                "total_credit": "Total Credit",
                "total_debit": "Total Debit",
                "net_balance": "Net Balance"
            }
        }
    },
    "zh-TW": {
        translation: {
            "app": {
                "title": "個人理財追蹤"
            },
            "form": {
                "title": "新增交易",
                "type": "類型",
                "credit": "收入",
                "debit": "支出",
                "amount": "金額",
                "category": "類別",
                "date": "日期",
                "description": "描述",
                "submit": "新增交易"
            },
            "list": {
                "title": "近期交易",
                "confirm": "確認",
                "cancel": "取消",
                "delete": "刪除",
                "no_transactions": "找不到交易記錄。",
                "delete_error": "刪除交易失敗"
            },
            "report": {
                "title": "每週報告 (過去 7 天)",
                "total_credit": "總收入",
                "total_debit": "總支出",
                "net_balance": "淨餘額"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
