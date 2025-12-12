# Personal Finance App

A simple and efficient personal finance tracker to manage your daily income and expenses.

## Features

- **Transaction Management**: Add, view, and delete income (credit) and expense (debit) transactions.
- **Weekly Dashboard**: View real-time summaries of total income, expenses, and net balance for the past 7 days.
- **Multi-language Support**: Seamlessly switch between **English** and **Traditional Chinese (繁體中文)**.
- **Dark/Light Theme**: Built-in theme switcher to support both dark and light modes for comfortable viewing.
- **Responsive Design**: Modern UI built with Tailwind CSS that works on desktop and mobile.

## Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, SQLite
- **Frontend**: React, Vite, Tailwind CSS v4, i18next, Axios

## Getting Started

### Prerequisites

- Node.js & npm
- Python 3.8+

### Setup Instructions

#### 1. Clone the repository
```bash
git clone https://github.com/robinli/personal-finance-app.git
cd personal-finance-app
```

#### 2. Backend Setup
Navigate to the backend directory and set up the Python environment.

```bash
cd backend
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`.

#### 3. Frontend Setup
Navigate to the frontend directory and install dependencies.

```bash
cd frontend
npm install

# Start the development server
npm run dev
```
The application will run at `http://localhost:5173`.

## Project Documentation

Detailed project plans and task lists can be found in the `project_docs/` directory:
- [Project Plan](project_docs/project_plan.md)
- [Task List](project_docs/task.md)
