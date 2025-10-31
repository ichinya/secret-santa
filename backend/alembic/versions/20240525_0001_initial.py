"""Initial schema.

Revision ID: 20240525_0001
Revises: 
Create Date: 2024-05-25 00:00:00.000000
"""
from __future__ import annotations

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "20240525_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=True),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("is_superuser", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.UniqueConstraint("email"),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=False)

    op.create_table(
        "user_settings",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("user_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("email_notifications", sa.Boolean(), server_default=sa.true(), nullable=False),
        sa.Column("vk_notifications", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.Column("telegram_notifications", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.Column("preferences", sa.dialects.postgresql.JSONB(astext_type=sa.Text()), server_default=sa.text("'{}'::jsonb")),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("user_id"),
    )

    op.create_table(
        "refresh_tokens",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("user_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("token_hash", sa.String(length=128), nullable=False),
        sa.Column("issued_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("user_agent", sa.String(length=255), nullable=True),
        sa.Column("ip_address", sa.String(length=64), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("token_hash"),
    )
    op.create_index("ix_refresh_tokens_token_hash", "refresh_tokens", ["token_hash"], unique=True)

    op.create_table(
        "social_auth",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("user_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column(
            "provider",
            sa.Enum("google", "vk", "telegram", name="socialprovider"),
            nullable=False,
        ),
        sa.Column("provider_account_id", sa.String(length=128), nullable=False),
        sa.Column("profile", sa.dialects.postgresql.JSONB(astext_type=sa.Text()), server_default=sa.text("'{}'::jsonb")),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
    )

    op.create_table(
        "boxes",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("organizer_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("slug", sa.String(length=64), nullable=False),
        sa.Column("currency", sa.String(length=8), server_default="RUB", nullable=False),
        sa.Column("min_budget", sa.Numeric(10, 2), nullable=True),
        sa.Column("max_budget", sa.Numeric(10, 2), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("address", sa.Text(), nullable=True),
        sa.Column("phone", sa.String(length=32), nullable=True),
        sa.Column(
            "is_private_names",
            sa.Boolean(),
            server_default=sa.false(),
            nullable=False,
        ),
        sa.Column(
            "status",
            sa.Enum("draft", "ready", "drawing", "matched", "archived", name="boxstatus"),
            server_default="draft",
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["organizer_id"], ["users.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("slug"),
    )
    op.create_index("ix_boxes_slug", "boxes", ["slug"], unique=True)

    op.create_table(
        "email_invites",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("box_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("invite_code", sa.String(length=64), nullable=False),
        sa.Column(
            "status",
            sa.Enum("pending", "accepted", "expired", name="invitestatus"),
            server_default="pending",
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["box_id"], ["boxes.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("invite_code"),
    )
    op.create_index("ix_email_invites_email", "email_invites", ["email"], unique=False)
    op.create_index("ix_email_invites_invite_code", "email_invites", ["invite_code"], unique=True)

    op.create_table(
        "participants",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("box_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("display_name", sa.String(length=255), nullable=False),
        sa.Column("wishes", sa.Text(), nullable=True),
        sa.Column("address", sa.Text(), nullable=True),
        sa.Column("phone", sa.String(length=32), nullable=True),
        sa.Column(
            "status",
            sa.Enum("invited", "active", "locked", name="participantstatus"),
            server_default="invited",
            nullable=False,
        ),
        sa.Column("is_organizer", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.ForeignKeyConstraint(["box_id"], ["boxes.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index("ix_participants_email", "participants", ["email"], unique=False)

    op.create_table(
        "draws",
        sa.Column("id", sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("box_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("santa_participant_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("giftee_participant_id", sa.dialects.postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("override_by", sa.dialects.postgresql.UUID(as_uuid=True), nullable=True),
        sa.ForeignKeyConstraint(["box_id"], ["boxes.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["santa_participant_id"], ["participants.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["giftee_participant_id"], ["participants.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["override_by"], ["users.id"], ondelete="SET NULL"),
        sa.UniqueConstraint("santa_participant_id"),
        sa.UniqueConstraint("giftee_participant_id"),
    )


def downgrade() -> None:
    op.drop_table("draws")
    op.drop_table("participants")
    op.drop_index("ix_email_invites_invite_code", table_name="email_invites")
    op.drop_index("ix_email_invites_email", table_name="email_invites")
    op.drop_table("email_invites")
    op.drop_index("ix_boxes_slug", table_name="boxes")
    op.drop_table("boxes")
    op.drop_table("social_auth")
    op.drop_index("ix_refresh_tokens_token_hash", table_name="refresh_tokens")
    op.drop_table("refresh_tokens")
    op.drop_table("user_settings")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")
    op.execute("DROP TYPE IF EXISTS boxstatus")
    op.execute("DROP TYPE IF EXISTS invitestatus")
    op.execute("DROP TYPE IF EXISTS participantstatus")
    op.execute("DROP TYPE IF EXISTS socialprovider")
