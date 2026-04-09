# ✅ Beradinox - Complete Test Checklist

## 🎯 UI/UX Pixel-Perfect Verification

### Frontend Design Match

#### Header
- [ ] Logo displays correctly (Beradinox logo)
- [ ] Search bar in center
- [ ] Shopping cart icon
- [ ] Telegram button (t.me/mirrauf)
- [ ] Phone: +998-78-113-62-18
- [ ] Email: zakaz@beradinox.uz
- [ ] Work hours: пн.-пт. с 9:00 до 18:00
- [ ] Navigation menu (Металлопрокат со скидкой, Документы, О компании, Доставка, Калькулятор, Контакты)

#### Sidebar (Left)
- [ ] "Продукция" title
- [ ] Search input "Поиск по категориям"
- [ ] All categories with icons:
  - [ ] 🔧 Трубный прокат
  - [ ] 📄 Листовой прокат
  - [ ] ⚫ Черный металлопрокат
  - [ ] 🌈 Цветной металлопрокат
  - [ ] 🔩 Трубопроводная арматура
  - [ ] 🔧 Системы трубопроводов
  - [ ] 💨 Системы вентиляции
  - [ ] 🏭 Металлические изделия
  - [ ] ⚒️ Металлургическое сырье
  - [ ] 🔨 Оборудование
  - [ ] 🚂 Оснащение железных дорог
  - [ ] 🧪 Полимеры, АТИ, РТИ
- [ ] Expandable subcategories with chevron icons
- [ ] Product counts shown

#### Homepage Hero Section
- [ ] Dark gradient background (slate-700 to slate-900)
- [ ] Title: "Оказываем услуги по обработке металла"
- [ ] Subtitle: "Свой цех по обработке металла - резка, гибка, штамповка"
- [ ] "Выбрать услугу" button (white background)
- [ ] Metal processing image on right

#### Product Catalog Section
- [ ] "Каталог металлопроката" heading
- [ ] Category cards in grid (3 columns)
- [ ] Each card shows:
  - [ ] Category icon
  - [ ] Category name
  - [ ] Subcategories list
  - [ ] "Показать все" link with arrow
- [ ] Hover effects on cards

#### Product Listings
- [ ] Filter section with:
  - [ ] Марка (Brand) dropdown
  - [ ] ГОСТ dropdown
  - [ ] Диаметр (Diameter) dropdown
  - [ ] Толщина (Thickness) dropdown
  - [ ] "По умолчанию" sorting
- [ ] Product cards showing:
  - [ ] Product image/icon
  - [ ] Product name in Russian
  - [ ] Brand badge
  - [ ] GOST badge
  - [ ] Diameter and thickness specs
  - [ ] Price or "Цена договорная"
  - [ ] "Узнать цену" button (gold color)

#### Product Detail Page
- [ ] Breadcrumb navigation
- [ ] Large product image
- [ ] Product specifications table
- [ ] Contact form sidebar:
  - [ ] Name input
  - [ ] Phone input
  - [ ] "Позвонить" button (gold)
  - [ ] Phone number link
  - [ ] Email link
- [ ] Product info (В наличии, views count, category)

#### Footer/Contact Section
- [ ] Statistics section (dark background):
  - [ ] "10+ Лет на рынке"
  - [ ] "5000+ Довольных клиентов"
  - [ ] "24/7 Поддержка клиентов"

---

## 🔧 Admin Panel Tests

### Login
- [ ] Admin login page loads
- [ ] Email field: admin@beradinox.uz
- [ ] Password field: admin123
- [ ] Login button works
- [ ] Redirects to dashboard after login

### Dashboard
- [ ] Logo in app bar
- [ ] "Beradinox - Панель управления" title
- [ ] Statistics cards:
  - [ ] Total products count
  - [ ] Categories count
  - [ ] Total views count
- [ ] Welcome message
- [ ] Navigation menu (Продукты, Категории, Настройки)

### Products Management
- [ ] Products list loads
- [ ] Table shows: Name, Category, Brand, GOST, Price, Stock, Featured, Views
- [ ] "Создать" button works
- [ ] Edit button opens form
- [ ] Delete button works
- [ ] Pagination works (25 per page)
- [ ] Search/filter works
- [ ] Create product form:
  - [ ] Name (EN) field
  - [ ] Название (RU) field
  - [ ] Description fields
  - [ ] Slug field
  - [ ] Category dropdown
  - [ ] Brand field
  - [ ] GOST field
  - [ ] Diameter, Thickness, Length, Weight fields
  - [ ] Price field
  - [ ] Price type dropdown (Договорная/Фиксированная)
  - [ ] In stock checkbox
  - [ ] Featured checkbox
  - [ ] Save button works

### Categories Management
- [ ] Categories list loads
- [ ] Shows: Name, Slug, Icon, Order, Parent
- [ ] Create category works
- [ ] Edit category works
- [ ] Delete category works
- [ ] Parent category dropdown works

### Settings Management
- [ ] Settings list loads
- [ ] Shows all settings (site_name, site_phone, site_email, work_hours, telegram)
- [ ] Edit setting works
- [ ] Changes reflect on frontend

---

## 🔌 Backend API Tests

### Health Check
```bash
curl http://localhost:5000/api/health
```
Expected: `{"status":"ok","message":"Beradinox API is running"}`

### Categories
```bash
curl http://localhost:5000/api/categories
```
- [ ] Returns array of categories
- [ ] Each category has children
- [ ] Product counts included

### Products
```bash
curl http://localhost:5000/api/products
```
- [ ] Returns products array
- [ ] Pagination info included
- [ ] Category relations included

### Products with Filters
```bash
curl "http://localhost:5000/api/products?brand=Алюминий"
curl "http://localhost:5000/api/products?thickness=1.0"
```
- [ ] Filtering works correctly

### Settings
```bash
curl http://localhost:5000/api/settings
```
- [ ] Returns all settings as key-value pairs

---

## 🐳 Docker Tests

### Container Status
```bash
docker ps
```
- [ ] 4 containers running:
  - [ ] beradinox-postgres
  - [ ] beradinox-backend
  - [ ] beradinox-frontend
  - [ ] beradinox-admin

### Logs Check
```bash
docker-compose logs backend | tail -20
```
- [ ] No error messages
- [ ] "Beradinox Backend running on port 5000" message

```bash
docker-compose logs frontend | tail -20
```
- [ ] Build successful
- [ ] Nginx serving files

```bash
docker-compose logs admin | tail -20
```
- [ ] Build successful
- [ ] Nginx serving files

### Database Check
```bash
docker-compose exec postgres psql -U beradinox_user -d beradinox -c "SELECT COUNT(*) FROM \"Product\";"
```
- [ ] Returns 60+ products

```bash
docker-compose exec postgres psql -U beradinox_user -d beradinox -c "SELECT COUNT(*) FROM \"Category\";"
```
- [ ] Returns 12+ categories

---

## 📱 Responsive Design Tests

### Mobile (375px)
- [ ] Sidebar hidden
- [ ] Header responsive
- [ ] Product cards stack vertically
- [ ] Filters accessible
- [ ] Navigation menu works

### Tablet (768px)
- [ ] Sidebar visible
- [ ] 2-column product grid
- [ ] All features accessible

### Desktop (1400px+)
- [ ] Full layout visible
- [ ] 3-column product grid
- [ ] Optimal spacing

---

## 🎨 Visual Design Tests

### Colors
- [ ] Primary blue: #4f5de6
- [ ] Gold accent: #f59e0b
- [ ] Dark slate: #1e293b to #0f172a
- [ ] Gray backgrounds: #f5f5f5

### Typography
- [ ] Inter font loaded
- [ ] Consistent font sizes
- [ ] Proper line heights

### Spacing
- [ ] Consistent padding/margins
- [ ] Proper card spacing
- [ ] Aligned elements

### Icons
- [ ] Lucide icons display correctly
- [ ] Proper sizes (16px, 20px, 24px)
- [ ] Correct colors

---

## ⚡ Performance Tests

### Load Times
- [ ] Frontend loads < 3 seconds
- [ ] Admin loads < 3 seconds
- [ ] API responds < 500ms

### Database
- [ ] Queries execute quickly
- [ ] No N+1 query issues
- [ ] Proper indexing

---

## 🔒 Security Tests

### Authentication
- [ ] Cannot access admin without login
- [ ] JWT tokens work correctly
- [ ] Logout works

### API Protection
- [ ] Protected endpoints require auth
- [ ] Public endpoints accessible
- [ ] No sensitive data exposed

---

## ✅ Final Verification

### Critical Path
1. [ ] Start Docker: `./start.sh`
2. [ ] Wait for services (30-60 seconds)
3. [ ] Open http://localhost:3000
4. [ ] See homepage with hero section
5. [ ] Click category in sidebar
6. [ ] See products list
7. [ ] Apply filters
8. [ ] Click product
9. [ ] See product details
10. [ ] Open http://localhost:3001
11. [ ] Login to admin
12. [ ] See dashboard
13. [ ] Create new product
14. [ ] Verify product appears on frontend
15. [ ] Edit product
16. [ ] Delete product
17. [ ] Stop Docker: `./stop.sh`

### Success Criteria
- ✅ All 4 containers running
- ✅ Frontend accessible and functional
- ✅ Admin accessible and functional
- ✅ API responding correctly
- ✅ Database populated with products
- ✅ UI matches original design
- ✅ All CRUD operations work
- ✅ Filters and search work
- ✅ No console errors
- ✅ Responsive on all devices

---

## 📞 Support

If any tests fail:
1. Check Docker logs: `docker-compose logs -f`
2. Verify all containers running: `docker ps`
3. Check ports available: `lsof -i :3000,:3001,:5000,:5432`
4. Restart: `./stop.sh && ./start.sh`
5. Clean rebuild: `docker-compose down -v && docker-compose build --no-cache && ./start.sh`

Contact:
- Telegram: @mirrauf
- Email: zakaz@beradinox.uz
