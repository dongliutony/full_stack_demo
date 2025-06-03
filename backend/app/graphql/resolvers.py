from sqlmodel import Session, select
from app.models.todo import Todo as TodoModel
from app.models.todo_history import TodoHistory as TodoHistoryModel
from app.db.session import engine
from datetime import datetime

# Todo CRUD

def get_todo_by_id(id: int) -> TodoModel:
    with Session(engine) as session:
        return session.get(TodoModel, id)

def get_todos_by_user(user_id: int) -> list[TodoModel]:
    with Session(engine) as session:
        return session.exec(select(TodoModel).where(TodoModel.user_id == user_id)).all()

def create_todo(user_id: int, title: str, description: str = None, due_date: datetime = None) -> TodoModel:
    with Session(engine) as session:
        todo = TodoModel(user_id=user_id, title=title, description=description, due_date=due_date)
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo

def update_todo(id: int, **kwargs) -> TodoModel:
    with Session(engine) as session:
        todo = session.get(TodoModel, id)
        for k, v in kwargs.items():
            setattr(todo, k, v)
        todo.updated_at = datetime.utcnow()
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo

def delete_todo(id: int) -> bool:
    with Session(engine) as session:
        todo = session.get(TodoModel, id)
        if not todo:
            return False
        session.delete(todo)
        session.commit()
        return True

# TodoHistory CRUD

def get_history_by_todo_id(todo_id: int) -> list[TodoHistoryModel]:
    with Session(engine) as session:
        return session.exec(select(TodoHistoryModel).where(TodoHistoryModel.todo_id == todo_id)).all()

def get_todo_history_by_id(id: int) -> TodoHistoryModel:
    with Session(engine) as session:
        return session.get(TodoHistoryModel, id)

def create_todo_history(todo_id: int, field_changed: str, old_value: str = None, new_value: str = None) -> TodoHistoryModel:
    with Session(engine) as session:
        history = TodoHistoryModel(
            todo_id=todo_id,
            changed_at=datetime.utcnow(),
            field_changed=field_changed,
            old_value=old_value,
            new_value=new_value
        )
        session.add(history)
        session.commit()
        session.refresh(history)
        return history

def update_todo_history(id: int, **kwargs) -> TodoHistoryModel:
    with Session(engine) as session:
        history = session.get(TodoHistoryModel, id)
        for k, v in kwargs.items():
            setattr(history, k, v)
        session.add(history)
        session.commit()
        session.refresh(history)
        return history

def delete_todo_history(id: int) -> bool:
    with Session(engine) as session:
        history = session.get(TodoHistoryModel, id)
        if not history:
            return False
        session.delete(history)
        session.commit()
        return True
