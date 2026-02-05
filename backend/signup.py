from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone
import bcrypt, uuid
from storage.mongo_client import db
from utils.email_service import send_verification_email

router = APIRouter()

@router.post("/signup")
def signup(name: str, email: str, password: str, ):

    if db.users.find_one({ "email": email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    verification_token = str(uuid.uuid4())

    db.users.insert_one({
       
        "name": name,
        "email": email,
        "password_hash": password_hash,
        "role": "user",
        "is_verified": True, # Auto-verify for Mock Mode
        "email_verification_token": verification_token,
        "email_verified_at": None,
        "created_at": datetime.now(timezone.utc),
        "last_login": None
    })

    # Send email
    send_verification_email(email, verification_token)

    return {
        "message": "Signup successful. Please verify your email."
    }
