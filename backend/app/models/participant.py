"""Participant model."""
from __future__ import annotations

from enum import Enum
from typing import Optional

from sqlalchemy import Enum as SqlEnum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class ParticipantStatus(str, Enum):
    """Participant onboarding progress."""

    INVITED = "invited"
    ACTIVE = "active"
    LOCKED = "locked"


class Participant(Base):
    """Individual taking part in a Secret Santa box."""

    __tablename__ = "participants"

    box_id: Mapped["Box"] = mapped_column(ForeignKey("boxes.id", ondelete="CASCADE"))
    user_id: Mapped[Optional["User"]] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    email: Mapped[str] = mapped_column(String(255))
    display_name: Mapped[str] = mapped_column(String(255))
    wishes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    address: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    status: Mapped[ParticipantStatus] = mapped_column(SqlEnum(ParticipantStatus), default=ParticipantStatus.INVITED)
    is_organizer: Mapped[bool] = mapped_column(default=False)

    box: Mapped["Box"] = relationship(back_populates="participants")
    user: Mapped[Optional["User"]] = relationship(back_populates="participants")
    santa_assignments: Mapped[list["Draw"]] = relationship(
        foreign_keys="Draw.santa_participant_id", back_populates="santa", cascade="all, delete-orphan"
    )
    giftee_assignments: Mapped[list["Draw"]] = relationship(
        foreign_keys="Draw.giftee_participant_id", back_populates="giftee", cascade="all, delete-orphan"
    )


from app.models.box import Box  # noqa: E402 isort:skip
from app.models.user import User  # noqa: E402 isort:skip
from app.models.draw import Draw  # noqa: E402 isort:skip
