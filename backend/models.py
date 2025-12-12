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
