from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserRead, Token
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.config import settings
from app.db.session import get_session
from app.models.user import User
from sqlmodel import Session, select 
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter()

@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_session)):
    existing_user = db.exec(select(User).where(User.email == user_in.email)).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=get_password_hash(user_in.hashed_password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_session)):
    user = db.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token, token_type="bearer")