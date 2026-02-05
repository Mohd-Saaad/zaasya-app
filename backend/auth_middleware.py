from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt
from bson import ObjectId   # 🔥 ADD THIS
from storage.mongo_client import db

SECRET_KEY = "secretkey123"
ALGORITHM = "HS256"

security = HTTPBearer()

def get_current_user(token = Depends(security)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("sub")

    # 🔥 FIX IS HERE
    user = db.users.find_one({"_id": ObjectId(user_id)})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
