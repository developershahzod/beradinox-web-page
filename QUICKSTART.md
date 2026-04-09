# 🚀 Beradinox - Быстрый старт

## Запуск за 3 шага

### 1️⃣ Убедитесь что Docker установлен

```bash
docker --version
docker-compose --version
```

Если нет - установите Docker Desktop: https://www.docker.com/products/docker-desktop

### 2️⃣ Запустите приложение

```bash
cd "Beradinox Uz"
./start.sh
```

### 3️⃣ Откройте в браузере

- **Сайт**: http://localhost:3000
- **Админка**: http://localhost:3001
- **API**: http://localhost:5000

## 🔐 Вход в админ-панель

```
Email:    admin@beradinox.uz
Password: admin123
```

## 📊 Что внутри?

✅ Полный клон сайта bvbalyans.uz с брендом Beradinox
✅ Категории товаров (трубы, листы, профили)
✅ Каталог продукции с фильтрами
✅ Админ-панель для управления
✅ REST API на Express + PostgreSQL
✅ Docker контейнеризация

## 🛠️ Управление

```bash
# Просмотр логов
docker-compose logs -f

# Остановка
./stop.sh

# Перезапуск
./stop.sh && ./start.sh

# Очистка и пересборка
docker-compose down -v
docker-compose build --no-cache
./start.sh
```

## 📝 Добавление контента

1. Откройте http://localhost:3001
2. Войдите с admin@beradinox.uz / admin123
3. Управляйте:
   - **Продуктами** - добавляйте товары
   - **Категориями** - создавайте разделы
   - **Настройками** - меняйте контакты

## 🎨 Дизайн

Дизайн полностью повторяет оригинальный сайт:
- Цветовая схема
- Типографика
- Структура страниц
- Фильтры и каталог
- Карточки товаров

## 🔧 Технологии

**Frontend:**
- React 18
- TailwindCSS
- React Router
- Lucide Icons

**Backend:**
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Auth

**Admin:**
- React Admin
- Material-UI

**DevOps:**
- Docker + Docker Compose
- Nginx

## ❓ Проблемы?

Смотрите полную документацию в `SETUP.md`
