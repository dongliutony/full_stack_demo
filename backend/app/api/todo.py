from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.todo import Todo
from app.schemas.todo import TodoCreate, TodoUpdate, TodoRead
from datetime import datetime
from typing import List

router = APIRouter()

# TODO: Implement get_current_user later with JWT token
def get_current_user():
    return 1

@router.post("/", response_model=TodoRead)
def create_todo(todo_in: TodoCreate, db: Session = Depends(get_session)):
    user_id = get_current_user()
    todo = Todo(**todo_in.dict(), user_id=user_id)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

@router.get("/", response_model=List[TodoRead])
def get_todos(db: Session = Depends(get_session)):
    user_id = get_current_user()
    todos = db.exec(select(Todo).where(Todo.user_id == user_id)).all()
    return todos

@router.get("/{todo_id}", response_model=TodoRead)
def get_todo(todo_id: int, db: Session = Depends(get_session)):
    user_id = get_current_user()
    todo = db.get(Todo, todo_id)
    if not todo or todo.user_id != user_id:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.put("/{todo_id}", response_model=TodoRead)
def update_todo(todo_id: int, update: TodoUpdate, db: Session = Depends(get_session)):
    user_id = get_current_user()
    todo = db.get(Todo, todo_id)
    if not todo or todo.user_id != user_id:
        raise HTTPException(status_code=404, detail="Todo not found")
    for field, value in update.dict(exclude_unset=True).items():
        setattr(todo, field, value)
    todo.updated_at = datetime.utcnow()
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int, db: Session = Depends(get_session)):
    user_id = get_current_user()
    todo = db.get(Todo, todo_id)
    if not todo or todo.user_id != user_id:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"ok": True}