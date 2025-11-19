"""
KASH_INFO FastAPI Application
Main application entry point
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from datetime import datetime

from app.core.config import settings

# Initialize FastAPI app
app = FastAPI(
    title="KASH_INFO API",
    description="Elite Membership Platform with AI-Powered Tools",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# HEALTH CHECK & STATUS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

@app.get("/", tags=["Health"])
async def root():
    """Root endpoint - API status"""
    return {
        "name": "KASH_INFO API",
        "version": "0.1.0",
        "status": "operational",
        "timestamp": datetime.utcnow().isoformat(),
        "environment": settings.ENVIRONMENT
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring
    Returns system health status
    """
    try:
        # TODO: Add actual health checks (database, redis, qdrant)
        return {
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "services": {
                "api": "operational",
                "database": "not_checked",
                "redis": "not_checked",
                "qdrant": "not_checked"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unhealthy: {str(e)}")


@app.get("/api/v1/status", tags=["Health"])
async def api_status():
    """Detailed API status"""
    return {
        "api_version": "v1",
        "status": "operational",
        "environment": settings.ENVIRONMENT,
        "debug_mode": settings.DEBUG,
        "timestamp": datetime.utcnow().isoformat()
    }


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# API ROUTERS (TODO: Add as features are implemented)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# from app.api import auth, members, resources, omnibot, research

# app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
# app.include_router(members.router, prefix="/api/v1/members", tags=["Members"])
# app.include_router(resources.router, prefix="/api/v1/resources", tags=["Resources"])
# app.include_router(omnibot.router, prefix="/api/v1/omnibot", tags=["OmniBot"])
# app.include_router(research.router, prefix="/api/v1/research", tags=["Research"])


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STARTUP & SHUTDOWN EVENTS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    print("🚀 KASH_INFO API starting...")
    print(f"   Environment: {settings.ENVIRONMENT}")
    print(f"   Debug mode: {settings.DEBUG}")
    # TODO: Initialize database connection
    # TODO: Initialize Redis connection
    # TODO: Initialize Qdrant connection
    print("✅ KASH_INFO API ready!")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("🛑 KASH_INFO API shutting down...")
    # TODO: Close database connections
    # TODO: Close Redis connections
    # TODO: Close Qdrant connections
    print("✅ Cleanup complete!")


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# RUN APPLICATION (for development only)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
