# 🚀 Beradinox - Complete Run Instructions

## Prerequisites

✅ Docker Desktop installed and running
✅ Ports 3000, 3001, 5000, 5432 available

## Step-by-Step Launch

### 1. Start Docker Desktop

Make sure Docker Desktop is running on your Mac.

### 2. Navigate to Project

```bash
cd "/Users/shahzodakhmedov/Documents/apps/Beradinox Uz"
```

### 3. Launch Application

```bash
./start.sh
```

This will:
- Build all Docker containers (first time takes 5-10 minutes)
- Start PostgreSQL database
- Start backend API server
- Start frontend website
- Start admin panel
- Run database migrations
- Seed database with products

### 4. Wait for Services

Watch the terminal output. Wait until you see:
```
✅ Beradinox is now running!
```

### 5. Access Applications

Open in your browser:

**Frontend (Customer Website)**
```
http://localhost:3000
```

**Admin Panel**
```
http://localhost:3001
```
Login: admin@beradinox.uz
Password: admin123

**Backend API**
```
http://localhost:5000
```

## Verification Checklist

### Frontend Tests

1. ✅ Homepage loads with hero section
2. ✅ Sidebar shows all categories with icons
3. ✅ Click on category → shows products
4. ✅ Click on product → shows details
5. ✅ Filters work (brand, GOST, diameter, thickness)
6. ✅ Search functionality works
7. ✅ Contact page shows Telegram link
8. ✅ Logo appears in header
9. ✅ Responsive design on mobile

### Admin Panel Tests

1. ✅ Login page appears
2. ✅ Login with credentials works
3. ✅ Dashboard shows statistics
4. ✅ Products list loads
5. ✅ Create new product works
6. ✅ Edit product works
7. ✅ Delete product works
8. ✅ Categories management works
9. ✅ Settings can be edited
10. ✅ Logo appears in app bar

### Backend API Tests

Visit http://localhost:5000/api/health
Should return: `{"status":"ok","message":"Beradinox API is running"}`

Test endpoints:
- GET http://localhost:5000/api/categories
- GET http://localhost:5000/api/products
- GET http://localhost:5000/api/settings

## Troubleshooting

### Ports Already in Use

```bash
# Check what's using the ports
lsof -i :3000
lsof -i :3001
lsof -i :5000
lsof -i :5432

# Kill processes if needed
kill -9 <PID>
```

### Containers Not Starting

```bash
# Check Docker status
docker ps -a

# View logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs admin
docker-compose logs postgres

# Restart everything
./stop.sh
docker-compose down -v
./start.sh
```

### Database Issues

```bash
# Reset database
docker-compose down -v
docker-compose up -d postgres
sleep 10
docker-compose up -d backend
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npx prisma db seed
```

### Build Errors

```bash
# Clean rebuild
docker-compose down
docker system prune -a
docker-compose build --no-cache
./start.sh
```

## Stopping the Application

```bash
./stop.sh
```

Or manually:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```

## Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f admin
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100 backend
```

## Development Mode

For development without Docker:

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Admin
```bash
cd admin
npm install
npm start
```

## Production Deployment

1. Update environment variables in `.env`
2. Change default admin password
3. Use managed PostgreSQL (AWS RDS, DigitalOcean)
4. Set up SSL certificates
5. Configure domain names
6. Enable rate limiting
7. Set up monitoring

## Performance Tips

- First build takes 5-10 minutes
- Subsequent starts take 30-60 seconds
- Database seeding adds 10-20 seconds
- Frontend build is cached after first time

## Common Issues

**Issue: "Cannot connect to Docker daemon"**
Solution: Start Docker Desktop

**Issue: "Port already in use"**
Solution: Change ports in docker-compose.yml or kill existing processes

**Issue: "Database connection failed"**
Solution: Wait longer for PostgreSQL to start (increase sleep time in start.sh)

**Issue: "Admin login doesn't work"**
Solution: Check if database was seeded properly, reseed if needed

**Issue: "Products don't show"**
Solution: Check backend logs, verify API is running, check database has data

## Success Indicators

When everything is working:

1. ✅ `docker ps` shows 4 running containers
2. ✅ Frontend loads at localhost:3000
3. ✅ Admin loads at localhost:3001
4. ✅ API responds at localhost:5000
5. ✅ Can login to admin panel
6. ✅ Products visible on frontend
7. ✅ Categories work in sidebar
8. ✅ Filters function properly

## Support

If issues persist:
- Check all logs: `docker-compose logs -f`
- Verify Docker has enough resources (4GB+ RAM)
- Ensure no firewall blocking ports
- Try clean rebuild: `docker-compose build --no-cache`

Contact:
- Telegram: @mirrauf
- Email: zakaz@beradinox.uz
