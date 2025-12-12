from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas
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

def get_weekly_report(db: Session, start_date: datetime.date = None, end_date: datetime.date = None):
    # If no dates providing, default to last 7 days including today
    if not end_date:
        end_date = datetime.date.today()
    if not start_date:
        start_date = end_date - datetime.timedelta(days=6)
    
    transactions = db.query(models.Transaction).filter(
        models.Transaction.date >= start_date,
        models.Transaction.date <= end_date
    ).all()
    
    total_credit = sum(t.amount for t in transactions if t.type == "credit")
    total_debit = sum(t.amount for t in transactions if t.type == "debit")
    
    return {
        "start_date": start_date,
        "end_date": end_date,
        "total_credit": total_credit,
        "total_debit": total_debit,
        "net_balance": total_credit - total_debit
    }

def get_categories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Category).offset(skip).limit(limit).all()

def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(name=category.name, type=category.type)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: int):
    db_category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if db_category:
        db.delete(db_category)
        db.commit()
        return True
    return False
