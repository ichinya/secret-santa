"""Draw assignments."""
from __future__ import annotations

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Draw(Base):
    """Mapping between Santa and giftee participants."""

    __tablename__ = "draws"

    box_id: Mapped["Box"] = mapped_column(ForeignKey("boxes.id", ondelete="CASCADE"))
    santa_participant_id: Mapped["Participant"] = mapped_column(
        ForeignKey("participants.id", ondelete="CASCADE"), unique=True
    )
    giftee_participant_id: Mapped["Participant"] = mapped_column(
        ForeignKey("participants.id", ondelete="CASCADE"), unique=True
    )
    override_by: Mapped["User" | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    box: Mapped["Box"] = relationship(back_populates="draws")
    santa: Mapped["Participant"] = relationship(
        foreign_keys=[santa_participant_id], back_populates="santa_assignments"
    )
    giftee: Mapped["Participant"] = relationship(
        foreign_keys=[giftee_participant_id], back_populates="giftee_assignments"
    )
    override_user: Mapped["User" | None] = relationship()


from app.models.box import Box  # noqa: E402 isort:skip
from app.models.participant import Participant  # noqa: E402 isort:skip
from app.models.user import User  # noqa: E402 isort:skip
