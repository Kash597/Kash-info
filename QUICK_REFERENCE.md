# KASH_INFO - Quick Reference Card

**Fast reference for common commands and URLs**

---

## 🚀 Start Development (3 Steps)

```bash
# 1. Start Docker services
docker-compose up -d

# 2. Start backend (in backend/ directory)
cd backend
venv\Scripts\activate  # Windows
uvicorn app.main:app --reload

# 3. Start frontend (new terminal, in frontend/ directory)
cd frontend
npm run dev
```

---

## 🌐 Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3001 | Next.js app |
| **Backend API** | http://localhost:8000 | FastAPI |
| **API Docs** | http://localhost:8000/docs | Swagger UI |
| **API Redoc** | http://localhost:8000/redoc | ReDoc UI |
| **Health Check** | http://localhost:8000/health | Status |
| **Qdrant Dashboard** | http://localhost:6333/dashboard | Vector DB |
| **PostgreSQL** | localhost:5432 | Database |
| **Redis** | localhost:6379 | Cache |
| **PostgREST** | http://localhost:3000 | Supabase API |
| **GoTrue** | http://localhost:9999 | Supabase Auth |
| **Realtime** | http://localhost:4000 | Supabase WS |
| **Storage** | http://localhost:5000 | Supabase Files |

---

## 📦 Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f postgres
docker-compose logs -f qdrant

# Check service status
docker-compose ps

# Restart a service
docker-compose restart postgres

# Stop and remove volumes (deletes data!)
docker-compose down -v

# Rebuild services
docker-compose up -d --build
```

---

## 🐍 Backend Commands

```bash
# Activate virtual environment
cd backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app.main:app --reload

# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# Check current migration
alembic current

# Migration history
alembic history

# Run tests
pytest

# Run tests with coverage
pytest --cov=app
```

---

## 🌐 Frontend Commands

```bash
cd frontend

# Install dependencies
npm install

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

# Clean build
rm -rf .next node_modules
npm install
npm run dev
```

---

## 🗄️ Database Commands

```bash
# Connect to PostgreSQL
docker exec -it kash_info_postgres psql -U postgres

# List databases
\l

# Connect to database
\c kash_info

# List tables
\dt

# Describe table
\d members

# Run SQL query
SELECT * FROM members;

# Exit psql
\q
```

---

## 🔍 Debugging

```bash
# Check if services are running
docker-compose ps

# Test backend health
curl http://localhost:8000/health

# Test PostgreSQL connection
docker exec -it kash_info_postgres pg_isready -U postgres

# Check Qdrant status
curl http://localhost:6333/

# Check Redis status
docker exec -it kash_info_redis redis-cli ping
```

---

## 🔧 Troubleshooting

```bash
# Port already in use (Windows)
netstat -ano | findstr :8000
taskkill /PID [PID] /F

# Port already in use (Mac/Linux)
lsof -ti:8000 | xargs kill -9

# Reset everything
docker-compose down -v
docker-compose up -d
cd backend && alembic upgrade head

# Fix backend dependencies
cd backend
pip install -r requirements.txt

# Fix frontend dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Environment Files

**Backend:** `backend/.env` (copy from `.env.example`)
**Frontend:** `frontend/.env.local` (copy from `.env.local.example`)

**Required Variables:**
```bash
POSTGRES_PASSWORD=your_password
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/kash_info
JWT_SECRET=your_jwt_secret_min_32_chars
OPENAI_API_KEY=sk-...
```

---

## 🎯 Common Tasks

### Add a New API Endpoint

1. Create route in `backend/app/api/`
2. Import in `backend/app/main.py`
3. Add to router: `app.include_router(router, prefix="/api/v1/...", tags=[...])`

### Add a New Database Model

1. Create model in `backend/app/models/`
2. Import in `backend/alembic/env.py`
3. Run: `alembic revision --autogenerate -m "description"`
4. Run: `alembic upgrade head`

### Add a New Frontend Page

1. Create `frontend/app/[page]/page.tsx`
2. Access at: `http://localhost:3001/[page]`

### Add a New Component

1. Create in `frontend/components/[Component].tsx`
2. Import: `import Component from '@/components/Component'`

---

## 📚 Documentation

- **Getting Started:** [`GETTING_STARTED.md`](./GETTING_STARTED.md)
- **Full Docs:** [`README.md`](./README.md)
- **Setup Complete:** [`LOCAL_SETUP_COMPLETE.md`](./LOCAL_SETUP_COMPLETE.md)
- **Project Plan:** [`KASH_INFO_COMPREHENSIVE_SUMMARY.md`](./KASH_INFO_COMPREHENSIVE_SUMMARY.md)

---

## 🆘 Help

**Service not starting?**
```bash
docker-compose logs -f [service-name]
```

**Database connection error?**
```bash
docker-compose restart postgres
docker exec -it kash_info_postgres pg_isready
```

**Port conflict?**
```bash
# Windows
netstat -ano | findstr :[PORT]
# Mac/Linux
lsof -ti:[PORT]
```

**Reset everything?**
```bash
docker-compose down -v
docker-compose up -d
```

---

**Print this for quick reference! 📌**
