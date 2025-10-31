"""Email invitation model."""
from __future__ import annotations

from enum import Enum

from sqlalchemy import Enum as SqlEnum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class InviteStatus(str, Enum):
    """Status of invitation."""

    PENDING = "pending"
    ACCEPTED = "accepted"
    EXPIRED = "expired"


class EmailInvite(Base):
    """Invite issued by organizer for participants."""

    __tablename__ = "email_invites"

    box_id: Mapped["Box"] = mapped_column(ForeignKey("boxes.id", ondelete="CASCADE"))
    email: Mapped[str] = mapped_column(String(255), index=True)
    invite_code: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    status: Mapped[InviteStatus] = mapped_column(SqlEnum(InviteStatus), default=InviteStatus.PENDING)

    box: Mapped["Box"] = relationship(back_populates="invites")


from app.models.box import Box  # noqa: E402 isort:skip
