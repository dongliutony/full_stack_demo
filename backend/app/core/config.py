import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "mysql+mysqlconnector://root:password@localhost/todo")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "supersecret") 

settings = Settings()