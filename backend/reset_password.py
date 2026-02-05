from fastapi import APIRouter, HTTPException
from datetime import datetime
import bcrypt
from storage.mongo_client import db

router = APIRouter()

@router.post("/reset-password")
def reset_password(token: str, new_password: str):

    user = db.users.find_one({
        "password_reset_token": token,
        "password_reset_expires": {"$gt": datetime.utcnow()}
    })

    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    new_hash = bcrypt.hashpw(
        new_password.encode(), bcrypt.gensalt()
    ).decode()

    db.users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {"password_hash": new_hash},
            "$unset": {
                "password_reset_token": "",
                "password_reset_expires": ""
            }
        }
    )

    return {"message": "Password reset successful"}
