# KASH_INFO Backend

FastAPI backend with AI-powered tools, RAG system, and Supabase integration.

## 🚀 Quick Start with uv

### Prerequisites

- Python 3.11+
- [uv](https://github.com/astral-sh/uv) package manager

### Install uv

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Or with pip
pip install uv
```

### Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment and install dependencies (fast!)
uv sync

# Activate virtual environment
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows

# Run database migrations
alembic upgrade head

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📦 Package Management with uv

### Install Dependencies

```bash
# Install all dependencies
uv sync

# Install with dev dependencies
uv sync --all-extras

# Install specific package
uv add fastapi

# Install dev dependency
uv add --dev pytest
```

### Update Dependencies

```bash
# Update all dependencies
uv sync --upgrade

# Update specific package
uv add --upgrade openai
```

### Run Scripts

```bash
# Run pytest
uv run pytest

# Run with specific Python version
uv run --python 3.11 uvicorn app.main:app

# Run alembic migrations
uv run alembic upgrade head
```

## 🐍 Alternative: Traditional pip (Fallback)

If you prefer pip:

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload
```

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── core/
│   │   ├── config.py        # Settings & environment
│   │   ├── database.py      # Database connection
│   │   └── security.py      # JWT & auth utilities
│   ├── api/
│   │   └── v1/              # API routes
│   ├── models/
│   │   └── member.py        # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── services/            # Business logic
│   ├── agents/              # PydanticAI agents (OmniBot)
│   └── rag/                 # RAG system
├── alembic/                 # Database migrations
├── tests/                   # Test suite
├── pyproject.toml           # uv configuration
├── requirements.txt         # pip fallback
└── README.md                # This file
```

## 🧪 Testing

```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=app --cov-report=html

# Run specific test file
uv run pytest tests/test_api.py

# Run with verbose output
uv run pytest -v
```

## 🔍 Code Quality

```bash
# Lint with Ruff
uv run ruff check app/

# Format with Ruff
uv run ruff format app/

# Type check with mypy
uv run mypy app/
```

## 🗃️ Database Migrations

```bash
# Create new migration
uv run alembic revision --autogenerate -m "Description"

# Apply migrations
uv run alembic upgrade head

# Rollback migration
uv run alembic downgrade -1

# View migration history
uv run alembic history
```

## 🌐 API Documentation

Once the server is running:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **OpenAPI JSON:** http://localhost:8000/openapi.json

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/kash_info

# Supabase / Auth
JWT_SECRET=your_jwt_secret_min_32_chars
SUPABASE_URL=http://localhost:8000
SUPABASE_KEY=your_supabase_key

# AI APIs
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key

# Vector Database
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=optional_key

# Redis
REDIS_URL=redis://localhost:6379

# Development
ENVIRONMENT=development
DEBUG=true
```

## 📊 Performance

With uv, dependency installation is **10-100x faster** than pip:

- Fresh install: ~2-5 seconds (vs 30-60s with pip)
- Cached install: <1 second (vs 5-10s with pip)
- Dependency resolution: Near-instant (vs minutes with pip)

## 🤝 Contributing

1. Install dev dependencies: `uv sync --all-extras`
2. Create feature branch: `git checkout -b feature/name`
3. Make changes and add tests
4. Run tests: `uv run pytest`
5. Check code quality: `uv run ruff check app/`
6. Commit and push

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [uv Documentation](https://docs.astral.sh/uv/)
- [Pydantic AI](https://ai.pydantic.dev/)
- [SQLAlchemy 2.0](https://docs.sqlalchemy.org/en/20/)
- [Supabase Python](https://supabase.com/docs/reference/python/introduction)
