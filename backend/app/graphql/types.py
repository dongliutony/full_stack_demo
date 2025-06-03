import strawberry
from typing import List, Optional
from datetime import datetime
from .resolvers import (
    get_todo_by_id, get_todos_by_user, create_todo as create_todo_resolver,
    update_todo as update_todo_resolver, delete_todo as delete_todo_resolver,
    get_history_by_todo_id, get_todo_history_by_id,
    create_todo_history as create_todo_history_resolver,
    update_todo_history as update_todo_history_resolver,
    delete_todo_history as delete_todo_history_resolver
)

@strawberry.type
class TodoHistory:
    id: int
    todo_id: int
    changed_at: datetime
    field_changed: str
    old_value: Optional[str]
    new_value: Optional[str]

@strawberry.type
class Todo:
    id: int
    user_id: int
    title: str
    description: Optional[str]
    due_date: Optional[datetime]
    is_completed: bool
    created_at: datetime
    updated_at: datetime

    @strawberry.field
    def history(self) -> List[TodoHistory]:
        return get_history_by_todo_id(self.id)

@strawberry.type
class Query:
    @strawberry.field
    def get_todo(self, id: int) -> Optional[Todo]:
        return get_todo_by_id(id)

    @strawberry.field
    def get_todos(self, user_id: int) -> List[Todo]:
        return get_todos_by_user(user_id)

    @strawberry.field
    def get_todo_history(self, todo_id: int) -> List[TodoHistory]:
        return get_history_by_todo_id(todo_id)

    @strawberry.field
    def get_todo_history_by_id(self, id: int) -> Optional[TodoHistory]:
        return get_todo_history_by_id(id)

@strawberry.type
class Mutation:
    @strawberry.field
    def create_todo(self, user_id: int, title: str, description: Optional[str] = None, due_date: Optional[datetime] = None) -> Todo:
        return create_todo_resolver(user_id, title, description, due_date)

    @strawberry.field
    def update_todo(self, id: int, title: Optional[str] = None, description: Optional[str] = None, is_completed: Optional[bool] = None) -> Todo:
        update_data = {}
        if is_completed is not None:
            update_data["is_completed"] = is_completed
        if title is not None:
            update_data["title"] = title
        if description is not None:
            update_data["description"] = description
        return update_todo_resolver(id, **update_data)

    @strawberry.field
    def delete_todo(self, id: int) -> bool:
        return delete_todo_resolver(id)

    @strawberry.field
    def create_todo_history(self, todo_id: int, field_changed: str, old_value: Optional[str] = None, new_value: Optional[str] = None) -> TodoHistory:
        return create_todo_history_resolver(todo_id, field_changed, old_value, new_value)

    @strawberry.field
    def update_todo_history(self, id: int, field_changed: Optional[str] = None, old_value: Optional[str] = None, new_value: Optional[str] = None) -> TodoHistory:
        update_data = {}
        if field_changed is not None:
            update_data["field_changed"] = field_changed
        if old_value is not None:
            update_data["old_value"] = old_value
        if new_value is not None:
            update_data["new_value"] = new_value
        return update_todo_history_resolver(id, **update_data)

    @strawberry.field
    def delete_todo_history(self, id: int) -> bool:
        return delete_todo_history_resolver(id)
