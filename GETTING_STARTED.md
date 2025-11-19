# KASH_INFO - Getting Started Guide

**Welcome to KASH_INFO local development!** Follow these steps to get your local environment running.

---

## 📋 Prerequisites Check

Before starting, ensure you have:

- ✅ **Docker Desktop** installed and running
- ✅ **Node.js 18+** installed (`node --version`)
- ✅ **Python 3.11+** installed (`python --version`)
- ✅ **Git** installed

---

## 🚀 Quick Start (5 Steps)

### Step 1: Environment Setup (2 minutes)

```bash
# Navigate to project directory
cd d:\VSCODE\Archon\kash_info

# Copy environment file
cp .env.example .env

# Edit .env file (IMPORTANT!)
code .env
```

**REQUIRED:** Update these values in `.env`:
- `POSTGRES_PASSWORD` - Set a secure password
- `JWT_SECRET` - Generate using: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
- `OPENAI_API_KEY` - Your OpenAI API key (get from https://platform.openai.com/api-keys)

**OPTIONAL** (for full features):
- `ANTHROPIC_API_KEY` - For Claude models
- `PERPLEXITY_API_KEY` - For research features
- `DATAFORSEO_API_KEY` - For SEO tools

---

### Step 2: Start Docker Services (3 minutes)

```bash
# Start all services (PostgreSQL, Qdrant, Redis, Supabase stack)
docker-compose up -d

# Wait for services to be ready (30 seconds)
docker-compose ps

# Check logs if needed
docker-compose logs -f postgres
```

**Expected output:** All services should show as "healthy" or "running"

---

### Step 3: Setup Backend (3 minutes)

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

# Install dependencies (this may take 2-3 minutes)
pip install -r requirements.txt

# Initialize database
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Keep this terminal open!** Backend will run here.

---

### Step 4: Setup Frontend (2 minutes)

```bash
# Open NEW terminal
cd d:\VSCODE\Archon\kash_info\frontend

# Copy frontend environment
cp .env.local.example .env.local

# Install dependencies (this may take 2-3 minutes)
npm install

# Start frontend development server
npm run dev
```

**Keep this terminal open too!** Frontend will run here.

---

### Step 5: Verify Everything Works

Open your browser and check:

✅ **Frontend:** http://localhost:3001
✅ **Backend API Docs:** http://localhost:8000/docs
✅ **Backend Health:** http://localhost:8000/health
✅ **Qdrant Dashboard:** http://localhost:6333/dashboard

---

## 🎯 What You Have Now

Your local environment includes:

### 🖥️ **Backend (FastAPI)**
- URL: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Interactive API testing at `/docs` endpoint

### 🌐 **Frontend (Next.js)**
- URL: http://localhost:3001
- Hot reload enabled (changes update automatically)

### 🗄️ **Database Services**
- PostgreSQL: localhost:5432
- Qdrant (vectors): http://localhost:6333
- Redis (cache): localhost:6379

### 🔐 **Supabase Stack**
- PostgREST API: http://localhost:3000
- Auth (GoTrue): http://localhost:9999
- Realtime: http://localhost:4000
- Storage: http://localhost:5000

---

## 🛠️ Common Commands

### Docker Services

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Restart a service
docker-compose restart [service-name]

# Check service status
docker-compose ps
```

### Backend

```bash
# Activate virtual environment
cd backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Start backend
uvicorn app.main:app --reload

# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# Run tests
pytest
```

### Frontend

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint code
npm run lint
```

---

## 🐛 Troubleshooting

### Issue: Docker services won't start

**Solution:**
```bash
# Stop all containers
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# Start fresh
docker-compose up -d
```

### Issue: Backend can't connect to database

**Check:**
1. Is PostgreSQL running? `docker-compose ps postgres`
2. Is `DATABASE_URL` correct in `.env`?
3. Is password correct?

**Solution:**
```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Test connection
docker exec -it kash_info_postgres psql -U postgres
```

### Issue: Frontend can't reach backend

**Check:**
1. Is backend running on port 8000?
2. Is `NEXT_PUBLIC_API_URL` correct in `frontend/.env.local`?

**Solution:**
```bash
# Test backend directly
curl http://localhost:8000/health
```

### Issue: Port already in use

**Solution:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :[PORT]
taskkill /PID [PID] /F

# Mac/Linux
lsof -ti:[PORT] | xargs kill -9
```

### Issue: Module not found errors

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Project Structure

```
kash_info/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py      # FastAPI application
│   │   ├── core/        # Config, security, database
│   │   ├── api/         # API routes (TODO)
│   │   ├── models/      # Database models (TODO)
│   │   ├── schemas/     # Pydantic schemas (TODO)
│   │   ├── services/    # Business logic (TODO)
│   │   ├── agents/      # PydanticAI agents (TODO)
│   │   └── rag/         # RAG system (TODO)
│   ├── alembic/         # Database migrations
│   ├── tests/           # Backend tests
│   └── requirements.txt
│
├── frontend/            # Next.js frontend
│   ├── app/             # Next.js 14 app directory
│   ├── components/      # React components (TODO)
│   ├── lib/             # Utilities
│   └── package.json
│
├── docker-compose.yml   # Development environment
├── .env.example         # Environment template
└── README.md            # Full documentation
```

---

## ✅ Next Steps

Now that your local environment is running:

1. **Explore the API:** http://localhost:8000/docs
2. **Check the Frontend:** http://localhost:3001
3. **Review the Planning Docs:**
   - Read [`KASH_INFO_COMPREHENSIVE_SUMMARY.md`](./KASH_INFO_COMPREHENSIVE_SUMMARY.md)
4. **Start Building Features:**
   - Week 1-2: Database schema
   - Week 5-6: OmniBot
   - Week 7-8: Deep Research Agent

---

## 🆘 Need Help?

1. **Check logs:**
   ```bash
   docker-compose logs -f
   ```

2. **Verify services:**
   ```bash
   docker-compose ps
   curl http://localhost:8000/health
   ```

3. **Reset everything:**
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

---

**Happy coding! 🚀**

Your local KASH_INFO development environment is ready. Time to build something amazing!
