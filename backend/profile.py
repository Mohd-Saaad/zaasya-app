from fastapi import APIRouter, Depends
from auth_middleware import get_current_user

router = APIRouter()

@router.get("/profile")
def profile(user = Depends(get_current_user)):
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "role": user["role"],
        "tenant_id": user.get("tenant_id")
    }
