from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
from config import settings

# Load .env file
load_dotenv()

# Import routers
from login import router as login_router
from signup import router as signup_router
from forgot_password import router as forgot_router
from reset_password import router as reset_router
from verify_email import router as verify_router
from refresh import router as refresh_router
from profile import router as profile_router

app = FastAPI(title="Viking Backend API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(login_router, tags=["Authentication"])
app.include_router(signup_router, tags=["Authentication"])
app.include_router(forgot_router, tags=["Authentication"])
app.include_router(reset_router, tags=["Authentication"])
app.include_router(verify_router, tags=["Authentication"])
app.include_router(refresh_router, tags=["Authentication"])
app.include_router(profile_router, tags=["Authentication"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Viking API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.API_HOST, port=settings.API_PORT, reload=settings.DEBUG)
