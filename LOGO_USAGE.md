# 🎨 Beradinox Logo Usage Guide

## Logo Files

The Beradinox logo is available in the following locations:

- **Frontend**: `/frontend/public/logo.svg`
- **Admin Panel**: `/admin/public/logo.svg`

## Logo Description

The Beradinox logo features:
- **"Berad"** in stylized cursive/script font
- **"inox"** in clean sans-serif font
- Elegant curved line underneath
- Square border frame
- Color: Dark gray (#3d3d3d)
- Background: White

## Where the Logo Appears

### Frontend (Customer Website)
1. **Header** - Top left corner (64x64px)
2. **Favicon** - Browser tab icon
3. **Mobile Home Screen** - When saved to device

### Admin Panel
1. **App Bar** - Top left in navigation (40x40px)
2. **Favicon** - Browser tab icon
3. **Login Screen** - (can be added if needed)

## Technical Details

### Format
- **Type**: SVG (Scalable Vector Graphics)
- **Dimensions**: 280x280px (original)
- **Scalable**: Yes, maintains quality at any size

### Colors
- **Primary**: #3d3d3d (Dark Gray)
- **Background**: White
- **Border**: #3d3d3d

### Fonts
- **"Berad"**: Brush Script MT (cursive, italic, bold)
- **"inox"**: Arial (sans-serif, regular)

## Usage Guidelines

### Do's ✅
- Use the logo at appropriate sizes (minimum 32x32px)
- Maintain aspect ratio when scaling
- Keep adequate white space around the logo
- Use on light backgrounds for best visibility

### Don'ts ❌
- Don't distort or stretch the logo
- Don't change the colors
- Don't remove the border
- Don't use on dark backgrounds without adjustment
- Don't add effects or filters

## Customization

If you need to customize the logo:

1. **Change Colors**: Edit the SVG file and modify `fill` and `stroke` attributes
2. **Resize**: The SVG scales automatically, adjust the `height` and `width` in CSS
3. **Export to PNG**: Use an SVG to PNG converter for raster formats

## Implementation Examples

### React Component
```jsx
<img 
  src="/logo.svg" 
  alt="Beradinox" 
  className="h-16 w-16 object-contain"
/>
```

### HTML
```html
<img src="/logo.svg" alt="Beradinox" style="height: 64px; width: 64px;">
```

### CSS Background
```css
.logo {
  background-image: url('/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 64px;
  height: 64px;
}
```

## Brand Identity

The Beradinox logo represents:
- **Professionalism** - Clean, structured design
- **Quality** - Elegant typography
- **Trust** - Solid border frame
- **Modern** - Contemporary styling

## File Locations in Project

```
Beradinox Uz/
├── frontend/
│   └── public/
│       ├── logo.svg          # Main logo
│       └── index.html        # Uses logo as favicon
├── admin/
│   └── public/
│       ├── logo.svg          # Admin logo
│       └── index.html        # Uses logo as favicon
└── LOGO_USAGE.md            # This file
```

## Contact

For logo modifications or questions:
- 💬 Telegram: [@mirrauf](https://t.me/mirrauf)
- 📧 Email: zakaz@beradinox.uz
