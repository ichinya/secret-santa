"""User settings model."""
from __future__ import annotations

from sqlalchemy import Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class UserSettings(Base):
    """Notification preferences and privacy settings."""

    __tablename__ = "user_settings"

    user_id: Mapped["User"] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    email_notifications: Mapped[bool] = mapped_column(Boolean, default=True)
    vk_notifications: Mapped[bool] = mapped_column(Boolean, default=False)
    telegram_notifications: Mapped[bool] = mapped_column(Boolean, default=False)
    preferences: Mapped[dict] = mapped_column(JSONB, default=dict)

    user: Mapped["User"] = relationship(back_populates="settings")


from app.models.user import User  # noqa: E402 isort:skip
