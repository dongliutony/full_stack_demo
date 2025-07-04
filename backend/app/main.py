# import debugpy

from fastapi import FastAPI
from app.api import router as api_router
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware
from app.graphql import graphql_app

# debugpy.listen(("0.0.0.0", 5678))
# print("Waiting for debugger to attach...")
# debugpy.wait_for_client()
# print("Debugger attached")

def lifespan(app: FastAPI):
    init_db()
    yield
    # TODO: add cleanup code here

app = FastAPI(
    title="Todo List Service",
    description="A simple todo list service",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # allow frontend to access backend in dev mode
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

app.include_router(graphql_app, prefix="/graphql", tags=["graphql"])

# @app.on_event("startup")
# def on_startup():
#     init_db()
