from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas
import datetime

def get_transactions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Transaction).offset(skip).limit(limit).all()

def create_transaction(db: Session, transaction: schemas.TransactionCreate):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def delete_transaction(db: Session, transaction_id: int):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
        return True
    return False

def get_weekly_report(db: Session):
    # Simple weekly report: Sum of credits and debits for the last 7 days
    today = datetime.date.today()
    week_ago = today - datetime.timedelta(days=7)
    
    transactions = db.query(models.Transaction).filter(models.Transaction.date >= week_ago).all()
    
    total_credit = sum(t.amount for t in transactions if t.type == "credit")
    total_debit = sum(t.amount for t in transactions if t.type == "debit")
    
    return {
        "start_date": week_ago,
        "end_date": today,
        "total_credit": total_credit,
        "total_debit": total_debit,
        "net_balance": total_credit - total_debit
    }
