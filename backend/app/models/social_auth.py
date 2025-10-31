"""Social authentication accounts."""
from __future__ import annotations

from enum import Enum

from sqlalchemy import Enum as SqlEnum, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class SocialProvider(str, Enum):
    """Provider identifiers."""

    GOOGLE = "google"
    VK = "vk"
    TELEGRAM = "telegram"


class SocialAuth(Base):
    """External OAuth connections."""

    __tablename__ = "social_auth"

    user_id: Mapped["User"] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    provider: Mapped[SocialProvider] = mapped_column(SqlEnum(SocialProvider))
    provider_account_id: Mapped[str] = mapped_column(String(128))
    profile: Mapped[dict] = mapped_column(JSONB, default=dict)

    user: Mapped["User"] = relationship(back_populates="social_accounts")


from app.models.user import User  # noqa: E402 isort:skip
