# Beradinox - Инструкция по установке

## Требования

- Docker Desktop (https://www.docker.com/products/docker-desktop)
- Node.js 18+ (для локальной разработки)
- Git

## Быстрый старт с Docker

### 1. Запуск приложения

```bash
# Сделать скрипт исполняемым
chmod +x start.sh stop.sh

# Запустить все сервисы
./start.sh
```

Скрипт автоматически:
- Соберет Docker контейнеры
- Запустит PostgreSQL, Backend, Frontend и Admin
- Выполнит миграции базы данных
- Заполнит базу тестовыми данными

### 2. Доступ к приложениям

- **Сайт**: http://localhost:3000
- **Админ-панель**: http://localhost:3001
- **API**: http://localhost:5000

### 3. Вход в админ-панель

```
Email: admin@beradinox.uz
Password: admin123
```

### 4. Остановка приложения

```bash
./stop.sh
```

## Локальная разработка (без Docker)

### Backend

```bash
cd backend
npm install
cp ../.env.example .env

# Настройте DATABASE_URL в .env
# DATABASE_URL=postgresql://beradinox_user:beradinox_pass_2024@localhost:5432/beradinox

# Запустите PostgreSQL локально или через Docker:
docker run -d \
  --name beradinox-postgres \
  -e POSTGRES_DB=beradinox \
  -e POSTGRES_USER=beradinox_user \
  -e POSTGRES_PASSWORD=beradinox_pass_2024 \
  -p 5432:5432 \
  postgres:15-alpine

# Миграции и seed
npx prisma migrate dev
npx prisma db seed

# Запуск сервера
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Откроется на http://localhost:3000

### Admin Panel

```bash
cd admin
npm install
npm start
```

Откроется на http://localhost:3001

## Структура проекта

```
Beradinox Uz/
├── backend/              # Express API + Prisma
│   ├── src/
│   │   ├── routes/      # API маршруты
│   │   ├── middleware/  # Middleware (auth)
│   │   └── server.js    # Главный файл сервера
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   └── Dockerfile
├── frontend/            # React клиентское приложение
│   ├── src/
│   │   ├── components/  # Компоненты (Header, Sidebar)
│   │   ├── pages/       # Страницы
│   │   └── api/         # Axios конфигурация
│   └── Dockerfile
├── admin/               # React Admin панель
│   ├── src/
│   │   ├── resources/   # CRUD ресурсы
│   │   └── authProvider.js
│   └── Dockerfile
├── docker-compose.yml   # Docker конфигурация
├── start.sh            # Скрипт запуска
└── README.md
```

## API Endpoints

### Публичные

- `GET /api/categories` - Список категорий
- `GET /api/categories/:slug` - Категория по slug
- `GET /api/products` - Список продуктов (с фильтрами)
- `GET /api/products/:slug` - Продукт по slug
- `GET /api/products/filters` - Доступные фильтры
- `GET /api/settings` - Настройки сайта

### Защищенные (требуют токен)

- `POST /api/auth/login` - Вход
- `POST /api/products` - Создать продукт
- `PUT /api/products/:id` - Обновить продукт
- `DELETE /api/products/:id` - Удалить продукт
- `POST /api/categories` - Создать категорию
- `PUT /api/categories/:id` - Обновить категорию
- `DELETE /api/categories/:id` - Удалить категорию
- `PUT /api/settings/:key` - Обновить настройку

## Управление данными

### Добавление продуктов

1. Войдите в админ-панель (http://localhost:3001)
2. Перейдите в раздел "Продукты"
3. Нажмите "Создать"
4. Заполните форму и сохраните

### Добавление категорий

1. В админ-панели перейдите в "Категории"
2. Создайте родительскую категорию
3. Создайте подкатегории, указав родителя

### Настройки сайта

Доступные ключи настроек:
- `site_name` - Название сайта
- `site_phone` - Телефон
- `site_email` - Email
- `work_hours` - Часы работы

## Troubleshooting

### Порты заняты

Если порты 3000, 3001, 5000 или 5432 заняты, измените их в `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "3002:80"  # Измените 3000 на 3002
```

### Ошибки миграций

```bash
# Сбросить базу данных
docker-compose down -v
docker-compose up -d postgres
docker-compose exec backend npx prisma migrate reset
```

### Проблемы с Docker

```bash
# Пересобрать контейнеры
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Production Deployment

Для production развертывания:

1. Измените пароли в `.env`
2. Настройте SSL сертификаты
3. Используйте managed PostgreSQL (AWS RDS, DigitalOcean)
4. Настройте CDN для статических файлов
5. Включите rate limiting и security headers

## Поддержка

Для вопросов и поддержки:
- Email: zakaz@beradinox.uz
- Telegram: [@mirrauf](https://t.me/mirrauf)
