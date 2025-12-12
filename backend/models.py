from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, index=True) # "credit" or "debit"
    amount = Column(Float)
    category = Column(String)
    date = Column(Date)
    description = Column(String)

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    type = Column(String) # "credit" or "debit" (optional, to filter categories by transaction type)
