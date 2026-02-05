from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer
from jose import jwt
from storage.mongo_client import db

SECRET_KEY = "secretkey123"
ALGORITHM = "HS256"

security = HTTPBearer()

def get_current_user(token: str = Depends(security)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload["sub"]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.users.find_one({"_id": db.ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=401, detail="User does not exist")

    return user
