# Personal Finance App Implementation Plan

## Goal Description
Build a personal finance application to track credits and debits and view weekly reports.
Stack: Python FastAPI (Backend), React + Vite (Frontend).

## Proposed Changes

### Project Structure
- `backend/`: FastAPI application
- `frontend/`: React application

### Backend (FastAPI)
#### [NEW] [main.py](file:///e:/Antigravity/test-antigravity/backend/main.py)
- Setup FastAPI app
- Configure CORS

#### [NEW] [database.py](file:///e:/Antigravity/test-antigravity/backend/database.py)
- SQLite database setup using SQLAlchemy

#### [NEW] [models.py](file:///e:/Antigravity/test-antigravity/backend/models.py)
- `Transaction` model:
    - `id`: Integer, Primary Key
    - `type`: String (credit/debit)
    - `amount`: Float
    - `category`: String
    - `date`: Date
    - `description`: String

#### [NEW] [schemas.py](file:///e:/Antigravity/test-antigravity/backend/schemas.py)
- Pydantic models for request/response validation

#### [NEW] [crud.py](file:///e:/Antigravity/test-antigravity/backend/crud.py)
- Helper functions for DB interactions

#### [NEW] [routers/transactions.py](file:///e:/Antigravity/test-antigravity/backend/routers/transactions.py)
- `POST /transactions/`: Add credit/debit
- `GET /transactions/`: List transactions
- `GET /transactions/weekly-report`: Aggregated weekly data

### Frontend (React + Vite)
#### [NEW] [frontend](file:///e:/Antigravity/test-antigravity/frontend)
- Initialize using `npm create vite@latest`

#### [NEW] [components](file:///e:/Antigravity/test-antigravity/frontend/src/components)
- `TransactionForm.jsx`: Form to add credit/debit
- `Dashboard.jsx`: Main view showing list and report
- `WeeklyChart.jsx`: Visual representation (optional, or simple text summary)

## Verification Plan
### Automated Tests
- Run backend tests using `pytest` (if added)
- Run frontend build `npm run build`

### Manual Verification
- Start backend: `uvicorn main:app --reload`
- Start frontend: `npm run dev`
- Open browser to frontend URL
- Add a credit transaction
- Add a debit transaction
- Verify transactions appear in list
- Verify weekly report updates correctly
