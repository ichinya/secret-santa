"""Box/event model."""
from __future__ import annotations

from enum import Enum
from typing import List, Optional

from sqlalchemy import Boolean, Enum as SqlEnum, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class BoxStatus(str, Enum):
    """Lifecycle states for a Secret Santa box."""

    DRAFT = "draft"
    READY = "ready"
    DRAWING = "drawing"
    MATCHED = "matched"
    ARCHIVED = "archived"


class Box(Base):
    """Secret Santa event container."""

    __tablename__ = "boxes"

    organizer_id: Mapped["User"] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(255))
    slug: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    currency: Mapped[str] = mapped_column(String(8), default="RUB")
    min_budget: Mapped[Optional[float]] = mapped_column(Numeric(10, 2), nullable=True)
    max_budget: Mapped[Optional[float]] = mapped_column(Numeric(10, 2), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    address: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    is_private_names: Mapped[bool] = mapped_column(Boolean, default=False)
    status: Mapped[BoxStatus] = mapped_column(SqlEnum(BoxStatus), default=BoxStatus.DRAFT)

    organizer: Mapped["User"] = relationship(back_populates="boxes")
    participants: Mapped[List["Participant"]] = relationship(back_populates="box", cascade="all, delete-orphan")
    draws: Mapped[List["Draw"]] = relationship(back_populates="box", cascade="all, delete-orphan")
    invites: Mapped[List["EmailInvite"]] = relationship(back_populates="box", cascade="all, delete-orphan")


from app.models.user import User  # noqa: E402 isort:skip
from app.models.participant import Participant  # noqa: E402 isort:skip
from app.models.draw import Draw  # noqa: E402 isort:skip
from app.models.email_invite import EmailInvite  # noqa: E402 isort:skip
