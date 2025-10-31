"""API routers."""
from fastapi import APIRouter

router = APIRouter()

from app.api.routes import root  # noqa: E402  isort:skip

router.include_router(root.router)
