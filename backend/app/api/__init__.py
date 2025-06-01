from fastapi import APIRouter
from .todo import router as todo_router

router = APIRouter(prefix="/api")

# router.include_router(auth_router)
router.include_router(todo_router, prefix="/todos", tags=["todos"])