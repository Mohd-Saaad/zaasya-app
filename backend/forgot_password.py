from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
import uuid
from storage.mongo_client import db
from utils.email_service import send_reset_email

router = APIRouter()

@router.post("/forgot-password")
def forgot_password(email: str):

    user = db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    reset_token = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(minutes=15)

    db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "password_reset_token": reset_token,
            "password_reset_expires": expires_at
        }}
    )

    send_reset_email(email, reset_token)

    return {"message": "Password reset email sent"}
