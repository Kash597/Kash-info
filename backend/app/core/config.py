"""
Configuration settings for KASH_INFO backend
Loads environment variables and provides settings object
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # APPLICATION
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    ALLOWED_ORIGINS: str = "http://localhost:3001,http://localhost:3000"

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # DATABASE
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    DATABASE_URL: str
    POSTGRES_PASSWORD: str

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # SUPABASE / AUTH
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    JWT_SECRET: str
    ANON_KEY: Optional[str] = None
    SERVICE_ROLE_KEY: Optional[str] = None
    SITE_URL: str = "http://localhost:3001"

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # EMAIL (for authentication)
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASS: Optional[str] = None
    ADMIN_EMAIL: str = "admin@kashinfo.local"

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # AI APIs
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    PERPLEXITY_API_KEY: Optional[str] = None
    DATAFORSEO_API_KEY: Optional[str] = None

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # VECTOR DATABASE & CACHE
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    QDRANT_URL: str = "http://localhost:6333"
    REDIS_URL: str = "redis://localhost:6379"

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # MODEL CONFIGURATION
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    # Embedding model
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    EMBEDDING_DIMENSION: int = 1536

    # LLM models
    OMNIBOT_MODEL: str = "gpt-4-turbo-preview"  # OmniBot primary model
    RESEARCH_MODEL: str = "claude-3-5-sonnet-20250219"  # Deep Research Agent
    CONTENT_MODEL: str = "gpt-3.5-turbo"  # Content generation

    # Model limits
    MAX_TOKENS_OMNIBOT: int = 4096
    MAX_TOKENS_RESEARCH: int = 8192
    MAX_TOKENS_CONTENT: int = 2048

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # RAG CONFIGURATION
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    RAG_TOP_K: int = 5  # Number of results to retrieve
    RAG_SIMILARITY_THRESHOLD: float = 0.7  # Minimum similarity score
    RAG_CHUNK_SIZE: int = 1000  # Characters per chunk
    RAG_CHUNK_OVERLAP: int = 200  # Overlap between chunks

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # PYDANTIC SETTINGS CONFIG
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


# Create global settings instance
settings = Settings()
