from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class TodoCreate(BaseModel):
    user_id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[str] = "medium"
    is_completed: bool = False

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[str] = None
    is_completed: Optional[bool] = None

class TodoRead(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[str] = None
    is_completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
