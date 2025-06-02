from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field

class TodoHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    todo_id: int = Field(foreign_key="todo.id")
    changed_at: datetime
    field_changed: str = Field(max_length=100)
    old_value: Optional[str] = None
    new_value: Optional[str] = None 