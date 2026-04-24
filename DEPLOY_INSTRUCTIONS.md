# 🚀 Инструкция по деплою исправления админ-панели

## Проблема
Админ-панель на сервере не работает из-за неправильной конфигурации `REACT_APP_API_URL` в docker-compose.yml

## Что исправлено
Изменено в `docker-compose.yml`:
```yaml
# Было (неправильно):
REACT_APP_API_URL: http://localhost:5000/api

# Стало (правильно):
REACT_APP_API_URL: /api
```

## Способ 1: Автоматический деплой (рекомендуется)

### На вашем локальном компьютере:

1. **Загрузите исправленный docker-compose.yml на сервер:**
```bash
scp docker-compose.yml user@beradinox.uz:/path/to/project/
scp deploy.sh user@beradinox.uz:/path/to/project/
```

2. **Подключитесь к серверу:**
```bash
ssh user@beradinox.uz
```

3. **Перейдите в директорию проекта:**
```bash
cd /path/to/project
```

4. **Запустите скрипт деплоя:**
```bash
chmod +x deploy.sh
./deploy.sh
```

Скрипт автоматически:
- Остановит админ-контейнер
- Пересоберет его с новой конфигурацией
- Запустит заново
- Покажет статус и логи

## Способ 2: Ручной деплой

### Подключитесь к серверу и выполните:

```bash
# 1. Перейдите в директорию проекта
cd /path/to/Beradinox\ Uz

# 2. Обновите docker-compose.yml
# Откройте файл в редакторе (nano, vim) и измените строку 63:
nano docker-compose.yml
# Найдите:
#   REACT_APP_API_URL: http://localhost:5000/api
# Замените на:
#   REACT_APP_API_URL: /api
# Сохраните (Ctrl+O, Enter, Ctrl+X)

# 3. Остановите админ-контейнер
docker-compose stop admin

# 4. Удалите старый контейнер
docker-compose rm -f admin

# 5. Пересоберите админ-панель
docker-compose build --no-cache admin

# 6. Запустите админ-панель
docker-compose up -d admin

# 7. Проверьте статус
docker-compose ps

# 8. Проверьте логи
docker-compose logs --tail=50 admin
```

## Способ 3: Полный перезапуск (если есть проблемы)

```bash
cd /path/to/project

# Остановить все контейнеры
docker-compose down

# Пересобрать только админ-панель
docker-compose build --no-cache admin

# Запустить все сервисы
docker-compose up -d

# Проверить статус
docker-compose ps
docker-compose logs admin
```

## Проверка работоспособности

1. **Откройте админ-панель в браузере:**
   - http://your-server-ip:3001/admin
   - или http://beradinox.uz:3001/admin

2. **Войдите в систему:**
   - Email: admin@beradinox.uz
   - Password: admin123

3. **Проверьте редактирование:**
   - Откройте раздел "Категории"
   - Попробуйте отредактировать категорию
   - Откройте раздел "Продукты"
   - Попробуйте отредактировать товар

4. **Проверьте консоль браузера (F12):**
   - Не должно быть ошибок подключения к API
   - Запросы должны идти на `/api/...` а не на `http://localhost:5000/api/...`

## Диагностика проблем

### Если админка не открывается:

```bash
# Проверьте статус контейнера
docker-compose ps admin

# Проверьте логи
docker-compose logs admin

# Перезапустите
docker-compose restart admin
```

### Если API не работает:

```bash
# Проверьте backend
docker-compose ps backend
docker-compose logs backend

# Проверьте nginx конфигурацию в админ-контейнере
docker-compose exec admin cat /etc/nginx/conf.d/default.conf
```

### Если редактирование не работает:

```bash
# Проверьте переменную окружения в контейнере
docker-compose exec admin env | grep REACT_APP_API_URL

# Должно быть: REACT_APP_API_URL=/api
# Если показывает localhost - нужно пересобрать контейнер
```

## Откат изменений (если что-то пошло не так)

```bash
# Вернуть старую конфигурацию
cd /path/to/project

# Изменить обратно в docker-compose.yml
nano docker-compose.yml
# Вернуть: REACT_APP_API_URL: http://localhost:5000/api

# Пересобрать
docker-compose build admin
docker-compose up -d admin
```

## Важные замечания

1. **Пересборка обязательна** - переменная `REACT_APP_API_URL` встраивается в React приложение на этапе сборки
2. **Nginx проксирует /api** - запросы на `/api` автоматически перенаправляются на backend:5000
3. **Backend не трогаем** - изменения только в админ-контейнере
4. **Данные не теряются** - база данных и загруженные файлы остаются без изменений

## Контакты для поддержки

- Telegram: @mirrauf
- Email: zakaz@beradinox.uz

## Что проверено

✅ Роуты редактирования категорий работают (`PUT /api/categories/:id`)
✅ Роуты редактирования товаров работают (`PUT /api/products/:id`)
✅ Nginx конфигурация корректна (проксирует /api на backend)
✅ Backend API работает
✅ Исправлена только конфигурация API URL в админке
