from fastapi import APIRouter
from .todo import router as todo_router
from .auth import router as auth_router

router = APIRouter(prefix="/api")

# router.include_router(auth_router)
router.include_router(todo_router, prefix="/todos", tags=["todos"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])