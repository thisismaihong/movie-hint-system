# MOVIE HINT (MH) - Movie Recommendation System
A movie recommendation system for graduation project.

## 1. Description
- Project Title: 
- Student: Lê Thị Mai Hồng - 2351050049
- Faculty: Information Technology.
- Major: Information Technology.
- Supervisor: M.S. Dương Hữu Thành.

## 2. Technologies Used
- Backend: Django
- Frontend: Next.js
- Database: MySQL
- Version Control: GitHub

### Requirements
- Python 3.13
- Git
- MySQL Server

### Development Period
- July 2026 – Present

## 3. Project Structure
```bash
movie-hint-system/
├── .idea/
├── .venv/
│
├── backend/
│   ├── src/
│   │   ├── apps/
│   │   │   ├── mh_movie/
│   │   │   ├── mh_oauth/
│   │   │   ├── mh_recommendation/
│   │   │   └── mh_search/
│   │   │
│   │   ├── config/
│   │   │   ├── __init__.py
│   │   │   ├── asgi.py
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   └── wsgi.py
│   │   │
│   │   ├── etl/
│   │   ├── fixtures/
│   │   ├── media/
│   │   ├── statics/
│   │   ├── templates/
│   │   │
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── manage.py
│   │
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── configs/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── libs/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── .env.local
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   └── postcss.config.mjs
│
├── .gitignore
├── LICENSE
├── README.md
└── requirements.txt
```

## 4. Setup project

### Backend Setup

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```
### Configure environment variables
- The backend provides an example environment file: `backend/src/.env.example`
- Create a new .env file based on this file: `backend/src/.env`

### Elasticsearch and Redis
- Elasticsearch for semantic search and vector similarity
- Redis for caching

Make sure Docker Desktop is running before starting the services.
- If the project contains a docker-compose.yml or compose.yml, run:
```powershell
docker compose up -d
```
- Check running containers:
```powershell
docker compose ps
```
- You can check Elasticsearch with: http://localhost:9200

### Embedding Model
- The model does not need to be manually installed or included in the project source code.
- When the application initializes the embedding model for the first time, the model can be downloaded automatically from Hugging Face, depending on the implementation in the project.
- For example:
```powershell
SentenceTransformer("BAAI/bge-m3")
```

## 5. Elasticsearch Index

- Before using the personalized recommendation feature, the movie embedding data must be indexed into Elasticsearch.
- The system uses BGE-M3 to generate movie embeddings and stores them in the index.
- To create and configure the Elasticsearch index required for the recommendation system, please follow the instructions in: 
`backend/src/apps/mh_search/docs/elasticsearch.md`

## 6. Run project

Terminal 1:
```powershell
cd backend/src
python manage.py migrate
python ../etl/load_database.py
python manage.py runserver
```
The backend API will be available at: http://127.0.0.1:8000/



Terminal 2:
```powershell
cd frontend
npm install
npm run dev
```
The frontend will normally be available at: http://localhost:3000


## 7. First-time Setup

When running the project for the first time, the following steps may take additional time:

1. Installing Python dependencies
2. Installing frontend dependencies
3. Starting Elasticsearch and Redis
4. Downloading the BGE-M3 embedding model
5. Running database migrations
6. Building or indexing movie embeddings into Elasticsearch

The embedding model should only be downloaded once and can then be reused from the local model cache.






