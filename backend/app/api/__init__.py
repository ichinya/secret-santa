"""API package initializer."""
from fastapi import FastAPI

from app.api.routes import root


def register_routes(app: FastAPI) -> None:
    """Attach routers to the FastAPI application."""

    app.include_router(root.router, prefix="")
