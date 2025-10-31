"""Application configuration utilities."""
from functools import lru_cache
from typing import List

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Central application settings loaded from environment variables."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Secret Santa API"
    api_v1_prefix: str = "/api/v1"
    debug: bool = False

    backend_cors_origins: List[str] = ["http://localhost:5173"]

    database_url: str = "postgresql+asyncpg://secret_santa:secret_santa@db:5432/secret_santa"

    jwt_secret_key: str = "change-me"
    jwt_refresh_secret_key: str = "change-me-too"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 30

    sendgrid_api_key: str | None = None
    mail_from: str = "no-reply@secret-santa.local"

    redis_url: str = "redis://redis:6379/0"

    @field_validator("backend_cors_origins", mode="before")
    @classmethod
    def split_cors(cls, value: List[str] | str) -> List[str]:
        """Allow comma separated origins in environment configuration."""

        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value


@lru_cache
def get_settings() -> Settings:
    """Return a cached settings instance."""

    return Settings()


settings = get_settings()
