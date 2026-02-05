from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from jose import jwt, JWTError
from storage.mongo_client import db

SECRET_KEY = "secretkey123"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_HOURS = 48

router = APIRouter()

@router.post("/refresh-token")
def refresh_token(refresh_token: str):

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    # ✅ Ensure this is refresh token
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Not a refresh token")

    user_id = payload.get("sub")

    # ✅ Check token exists in DB
    stored_token = db.refresh_tokens.find_one({
        "refresh_token": refresh_token
    })

    if not stored_token:
        raise HTTPException(status_code=401, detail="Refresh token revoked")

    user = db.users.find_one({"_id": stored_token["user_id"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # ✅ Create new access token
    new_access_payload = {
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user["role"],
        "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    }

    new_access_token = jwt.encode(
        new_access_payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }
