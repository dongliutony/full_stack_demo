from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class TodoCreate(BaseModel):
    # user_id: int
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

class TodoHistoryCreate(BaseModel):
    todo_id: int
    changed_at: datetime
    field_changed: str
    old_value: Optional[str] = None
    new_value: Optional[str] = None

class TodoHistoryUpdate(BaseModel):
    changed_at: Optional[datetime] = None
    field_changed: Optional[str] = None
    old_value: Optional[str] = None
    new_value: Optional[str] = None

class TodoHistoryRead(BaseModel):
    id: int
    todo_id: int
    changed_at: datetime
    field_changed: str
    old_value: Optional[str] = None
    new_value: Optional[str] = None

    class Config:
        orm_mode = True
