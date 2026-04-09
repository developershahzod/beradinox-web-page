# 🏭 Beradinox - New Equipment Catalog

## ✅ Updated Catalog Structure

The catalog has been updated to feature **metal processing equipment and machinery** as the primary categories.

---

## 🛠️ Equipment Categories (12 Main Items)

### 1. **Вальцовочный станок** (Rolling Machine) 🔄
Metal sheet rolling equipment for bending and forming

### 2. **Трубогибочный станок** (Pipe Bending Machine) 🔧
Professional pipe bending and forming equipment

### 3. **Гильотина** (Guillotine) ✂️
Heavy-duty metal cutting guillotine shears

### 4. **Листогибочный станок** (Sheet Bending Machine) 📐
Sheet metal bending press and folding machines

### 5. **Пробивной станок** (Punching Machine) 🔨
Metal punching and hole-making equipment

### 6. **Фрезерный станок** (Milling Machine) ⚙️
Precision milling machines for metal processing

### 7. **Токарный станок** (Lathe Machine) 🛠️
Metal turning and lathe equipment

### 8. **Лазерный станок** (Laser Machine) ⚡
Laser cutting and engraving machines

### 9. **Агрегат для холодного нанесения цинка** (Cold Zinc Coating Unit) 🧪
Cold galvanizing equipment for metal protection

### 10. **Дробеструйная обработка** (Shot Blasting) 💨
Shot blasting and surface treatment equipment

### 11. **Станок для производства шнековой спиральной лопасти** (Screw Spiral Blade Machine) 🌀
Specialized equipment for manufacturing screw conveyor blades

### 12. **Изготовление Конвейерных лент** (Conveyor Belt Manufacturing) 🏭
Conveyor belt production and assembly equipment

---

## 📦 Additional Categories

The catalog also includes all previous metal product categories:
- Трубный прокат (24 subcategories)
- Листовой прокат (9 subcategories)
- Черный металлопрокат (6 subcategories)
- Цветной металлопрокат (19 subcategories)
- And 14 more categories...

---

## 🎯 Catalog Focus

**Primary:** Metal processing equipment and machinery  
**Secondary:** Metal products and materials

This structure positions Beradinox as both:
1. **Equipment supplier** - Machinery for metal processing
2. **Material supplier** - Metal products and raw materials

---

## 🔄 How to Load New Catalog

### Run Backend Locally:
```bash
cd backend
DATABASE_URL="postgresql://beradinox_user:beradinox_pass_2024@localhost:5433/beradinox" npx prisma db push
DATABASE_URL="postgresql://beradinox_user:beradinox_pass_2024@localhost:5433/beradinox" npx prisma db seed
npm run dev
```

### Or with Docker:
```bash
docker-compose up -d postgres
sleep 5
docker-compose exec postgres psql -U beradinox_user -d beradinox -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
cd backend
DATABASE_URL="postgresql://beradinox_user:beradinox_pass_2024@localhost:5433/beradinox" npx prisma db push
DATABASE_URL="postgresql://beradinox_user:beradinox_pass_2024@localhost:5433/beradinox" npx prisma db seed
```

---

## 📱 Frontend Display

All equipment categories will appear at the top of the left sidebar with:
- ✅ Unique emoji icons for each machine type
- ✅ Russian names
- ✅ SEO-friendly slugs
- ✅ Hover effects
- ✅ Professional styling

---

## 🎨 Category Icons

- 🔄 Rolling Machine
- 🔧 Pipe Bending
- ✂️ Guillotine
- 📐 Sheet Bending
- 🔨 Punching
- ⚙️ Milling
- 🛠️ Lathe
- ⚡ Laser
- 🧪 Zinc Coating
- 💨 Shot Blasting
- 🌀 Screw Blade
- 🏭 Conveyor Belt

---

## 💡 Business Model

This catalog structure supports:
- **Equipment sales** - Selling machinery to metal processing businesses
- **Service offerings** - Metal processing services using this equipment
- **Material sales** - Selling processed metal products
- **Complete solutions** - One-stop shop for metal industry needs

---

**Last Updated:** January 18, 2026  
**Status:** ✅ Ready to Deploy
