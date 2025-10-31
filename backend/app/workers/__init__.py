"""Celery worker application."""
from celery import Celery

from app.core.config import settings

celery_app = Celery(
    "secret_santa",
    broker=settings.redis_url,
    backend=settings.redis_url,
)

celery_app.conf.task_routes = {
    "app.workers.email.*": {"queue": "emails"},
}
