# Beradinox - Metal Trading Platform

Pixel-perfect clone of metal trading website with full admin panel and backend.

## Features

- 🏭 Metal products catalog (pipes, sheets, profiles)
- 📦 Product categories and subcategories
- 🔍 Advanced filtering system
- 📱 Responsive design
- 👨‍💼 Admin panel for content management
- 🔐 Authentication system
- 🐳 Docker containerization

## Tech Stack

### Frontend
- React 18
- TailwindCSS
- React Router
- Axios
- Lucide Icons

### Backend
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Multer (file uploads)

### Admin Panel
- React Admin
- Material-UI

## Quick Start

### Using Docker (Recommended)

```bash
# Clone and navigate to project
cd "Beradinox Uz"

# Start all services
docker-compose up -d

# Access applications
# Frontend: http://localhost:3000
# Admin Panel: http://localhost:3001
# Backend API: http://localhost:5000
```

### Manual Setup

```bash
# Install backend dependencies
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev

# Install frontend dependencies
cd ../frontend
npm install
npm start

# Install admin dependencies
cd ../admin
npm install
npm start
```

## Default Admin Credentials

- Email: admin@beradinox.uz
- Password: admin123

## Project Structure

```
Beradinox Uz/
├── backend/          # Express API server
├── frontend/         # Customer-facing website
├── admin/           # Admin panel
├── docker-compose.yml
└── README.md
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - Get all categories
- `POST /api/auth/login` - Admin login
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

## Contact

- 📞 Phone: +998-78-113-62-18
- 📧 Email: zakaz@beradinox.uz
- 💬 Telegram: [@mirrauf](https://t.me/mirrauf)

## License

MIT
# beradinox-web-page
