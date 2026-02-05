from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone
from storage.mongo_client import db

router = APIRouter()

@router.get("/verify-email")
def verify_email(token: str):

    user = db.users.find_one({"email_verification_token": token})

    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    db.users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "is_verified": True,
                "email_verified_at": datetime.now(timezone.utc)
            },
            "$unset": {
                "email_verification_token": ""
            }
        }
    )

    return {"message": "Email verified successfully. You can now login."}
