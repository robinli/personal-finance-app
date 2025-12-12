from pydantic import BaseModel
from datetime import date
from typing import Optional

class TransactionBase(BaseModel):
    type: str
    amount: float
    category: str
    date: date
    description: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int

    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str
    type: str # "credit" or "debit"

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True
