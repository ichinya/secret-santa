"""Root level API routes."""
from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()


@router.get(settings.api_v1_prefix, tags=["system"])
async def api_index() -> dict[str, str]:
    """Return API meta information."""

    return {"message": "Secret Santa API", "version": "v1"}
