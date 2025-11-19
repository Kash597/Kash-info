# KASH_INFO - Local Development Setup

**Elite Membership Platform with AI-Powered Tools**

---

## 🚀 Quick Start (Local Development)

### Prerequisites

Before you begin, ensure you have installed:

- **Docker Desktop** (includes Docker Compose)
  - Windows: https://docs.docker.com/desktop/install/windows-install/
  - Includes WSL 2 backend
- **Node.js 18+** (for frontend development)
  - https://nodejs.org/
- **Python 3.11+** (for backend development)
  - https://www.python.org/downloads/
- **Git** (for version control)
- **VS Code** (recommended IDE)
  - Extensions: Python, Docker, ESLint, Prettier

---

## 📁 Project Structure

```
kash_info/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Config, security
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   ├── agents/         # PydanticAI agents
│   │   ├── rag/            # RAG system
│   │   └── main.py         # FastAPI app
│   ├── alembic/            # Database migrations
│   ├── tests/              # Backend tests
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/               # Next.js frontend
│   ├── app/                # Next.js 14 app directory
│   ├── components/         # React components
│   ├── lib/                # Utilities
│   ├── public/             # Static assets
│   ├── package.json
│   ├── Dockerfile
│   └── .env.local.example
│
├── supabase/               # Supabase configuration
│   ├── migrations/         # SQL migrations
│   └── seed.sql           # Test data
│
├── nginx/                  # Nginx configuration
│   └── nginx.dev.conf     # Development config
│
├── scripts/                # Utility scripts
│   ├── setup-local.sh     # Local setup script
│   └── backup-local.sh    # Local backup
│
├── docker-compose.yml      # Development environment
├── docker-compose.prod.yml # Production environment
├── .env.example           # Environment variables template
├── .gitignore
└── README.md              # This file
```

---

## 🛠️ Local Development Setup

### Step 1: Clone & Setup

```bash
# Navigate to project directory
cd d:\VSCODE\Archon\kash_info

# Copy environment file
cp .env.example .env

# Edit .env with your settings (see Environment Variables section below)
code .env
```

### Step 2: Start Services with Docker Compose

```bash
# Start all services (first time will download images)
docker-compose up -d

# This will start:
# - PostgreSQL (port 5432)
# - PostgREST (port 3000)
# - GoTrue Auth (port 9999)
# - Realtime (port 4000)
# - Storage (port 5000)
# - Qdrant (port 6333)
# - Redis (port 6379)

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f postgres
docker-compose logs -f qdrant
```

### Step 3: Backend Setup (Python)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start backend development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Backend available at: http://localhost:8000
# API docs at: http://localhost:8000/docs
```

### Step 4: Frontend Setup (Next.js)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend available at: http://localhost:3001
```

---

## 🌐 Access Points (Local Development)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOCAL DEVELOPMENT URLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend (Next.js):     http://localhost:3001
Backend API (FastAPI):  http://localhost:8000
API Documentation:      http://localhost:8000/docs
API Redoc:              http://localhost:8000/redoc

Supabase Services:
  PostgREST API:        http://localhost:3000
  Auth (GoTrue):        http://localhost:9999
  Realtime:             http://localhost:4000
  Storage:              http://localhost:5000

Databases:
  PostgreSQL:           localhost:5432
  Qdrant:               http://localhost:6333
  Qdrant Dashboard:     http://localhost:6333/dashboard
  Redis:                localhost:6379

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔧 Environment Variables

### `.env` (Root Directory)

```bash
# Copy from .env.example and fill in your values

# Database
POSTGRES_PASSWORD=your_secure_password_here
DATABASE_URL=postgresql://postgres:your_secure_password_here@localhost:5432/kash_info

# Supabase / Auth
JWT_SECRET=your_jwt_secret_min_32_chars_here
ANON_KEY=your_anon_key_here
SERVICE_ROLE_KEY=your_service_role_key_here
SITE_URL=http://localhost:3001

# Email (for auth)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@kashinfo.local

# AI APIs
OPENAI_API_KEY=sk-your-openai-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
PERPLEXITY_API_KEY=pplx-your-perplexity-key-here
DATAFORSEO_API_KEY=your-dataforseo-key-here

# Qdrant
QDRANT_URL=http://localhost:6333

# Redis
REDIS_URL=redis://localhost:6379

# Development
ENVIRONMENT=development
DEBUG=true
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000
```

---

## 🚀 Moving to VPS (Production Deployment)

Once you've tested locally and ready to deploy:

### Step 1: Prepare VPS

```bash
# SSH into VPS
ssh root@your-vps-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Git
apt update && apt install -y git

# Clone repository
cd /var/www
git clone your-repo-url kash_info
cd kash_info
```

### Step 2: Production Environment

```bash
# Copy production env file
cp .env.example .env.prod

# Edit with production values
nano .env.prod

# IMPORTANT: Change these for production:
# - POSTGRES_PASSWORD (strong password)
# - JWT_SECRET (new secret)
# - ANON_KEY, SERVICE_ROLE_KEY (regenerate)
# - SITE_URL (your domain)
# - SMTP settings (production email)
# - AI API keys (production keys)
```

### Step 3: Deploy

```bash
# Start production stack
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend alembic upgrade head

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 📝 Next Steps

1. ✅ **Complete local setup** (this guide)
2. □ **Create database schema** (Week 2)
3. □ **Build OmniBot** (Week 5-6)
4. □ **Build Deep Research Agent** (Week 7-8)
5. □ **Test locally** (Week 13-14)
6. □ **Deploy to VPS** (Week 15)

---

**Happy coding! 🚀**
