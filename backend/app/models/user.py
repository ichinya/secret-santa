"""User-related ORM models."""
from __future__ import annotations

from typing import List, Optional

from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class User(Base):
    """Application user."""

    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    full_name: Mapped[str] = mapped_column(String(255))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)

    social_accounts: Mapped[List["SocialAuth"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    settings: Mapped[Optional["UserSettings"]] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")
    refresh_tokens: Mapped[List["RefreshToken"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    boxes: Mapped[List["Box"]] = relationship(back_populates="organizer")
    participants: Mapped[List["Participant"]] = relationship(back_populates="user")


from app.models.social_auth import SocialAuth  # noqa: E402  isort:skip
from app.models.settings import UserSettings  # noqa: E402  isort:skip
from app.models.refresh_token import RefreshToken  # noqa: E402  isort:skip
from app.models.box import Box  # noqa: E402  isort:skip
from app.models.participant import Participant  # noqa: E402  isort:skip
