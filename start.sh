#!/bin/bash

echo "🚀 Starting Beradinox Application..."

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Desktop."
    exit 1
fi

echo "📦 Building Docker containers..."
docker-compose build

echo "🔄 Starting services..."
docker-compose up -d

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "🗄️  Running database migrations..."
docker-compose exec backend npx prisma migrate deploy

echo "🌱 Seeding database..."
docker-compose exec backend npx prisma db seed

echo ""
echo "✅ Beradinox is now running!"
echo ""
echo "📱 Access the applications:"
echo "   Frontend:    http://localhost:3000"
echo "   Admin Panel: http://localhost:3001"
echo "   Backend API: http://localhost:5000"
echo ""
echo "🔐 Admin credentials:"
echo "   Email:    admin@beradinox.uz"
echo "   Password: admin123"
echo ""
echo "📊 View logs: docker-compose logs -f"
echo "🛑 Stop:      docker-compose down"
