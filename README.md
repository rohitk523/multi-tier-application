# Containerized Multi-Tier E-Commerce Application

## Overview
A containerized e-commerce application with React frontend, Node.js backend, and PostgreSQL database, deployed to AWS ECS with ECR for container management.

## Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │───▶│   (Node.js)     │───▶│  (PostgreSQL)   │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Local Development

### Prerequisites
- Docker Desktop
- Node.js 18+
- AWS CLI configured

### Quick Start
```bash
# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Testing Endpoints
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Backend Health: http://localhost:5000/health

## Deployment
Deployed to AWS ECS with ECR for container registry.

## Technology Stack
- **Frontend**: React with TypeScript, Nginx
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Cloud**: AWS ECS, ECR, RDS, ALB 