from fastapi import APIRouter, Depends
from login import router as login_router
from signup import router as signup_router
from auth_middleware import get_current_user

router = APIRouter()


# Include signup + login
router.include_router(signup_router)
router.include_router(login_router)

@router.get("/profile")
def profile(user = Depends(get_current_user)):
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "role": user["role"],
        "tenant_id": user["tenant_id"]
    }
