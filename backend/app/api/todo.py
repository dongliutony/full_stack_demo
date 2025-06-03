from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.todo import Todo
from app.schemas.todo import TodoCreate, TodoUpdate, TodoRead
from datetime import datetime
from typing import List
from app.core.deps import get_current_user
from app.models.user import User
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

router = APIRouter()

@router.post("/", response_model=TodoRead)
def create_todo(todo_in: TodoCreate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    user_id = get_current_user(token, db).id
    todo = Todo(**todo_in.dict(), user_id=user_id)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo

@router.get("/", response_model=List[TodoRead])
def get_todos(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    user_id = get_current_user(token, db).id
    todos = db.exec(select(Todo).where(Todo.user_id == user_id)).all()
    return todos

@router.get("/{todo_id}", response_model=TodoRead)
def get_todo(todo_id: int,token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    user_id = get_current_user(token, db).id
    todo = db.get(Todo, todo_id)
    if not todo or todo.user_id != user_id:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.put("/{todo_id}", response_model=TodoRead)
def update_todo(todo_id: int, update: TodoUpdate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    user_id = get_current_user(token, db).id
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
def delete_todo(todo_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    user_id = get_current_user(token, db).id
    todo = db.get(Todo, todo_id)
    if not todo or todo.user_id != user_id:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"ok": True}