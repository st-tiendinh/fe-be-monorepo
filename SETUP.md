# 🛍️ Shopping Page Monorepo - Quick Start

## ✨ What's Been Created

A complete full-stack shopping application monorepo with:

### 📦 Applications
- **Frontend** (Next.js 15 + Tailwind CSS) - Port 3000
- **Backend** (NestJS) - Port 3001

### 🎯 Features Implemented

#### Frontend
- ✅ Product grid display with images
- ✅ Category filtering (Electronics, Fashion, Home)
- ✅ Shopping cart with add/remove/quantity controls
- ✅ Responsive design with Tailwind CSS
- ✅ Connected to NestJS backend API
- ✅ Next.js Image optimization for product photos

#### Backend
- ✅ RESTful API with NestJS
- ✅ Products module with controller and service
- ✅ 6 sample products with categories
- ✅ CORS enabled for frontend
- ✅ API endpoints for products and categories

## 🚀 Quick Start

### 1. Run Development Servers
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### 2. View the Shopping Page
Open your browser to: **http://localhost:3000**

You should see:
- 6 products displayed in a grid
- Category filter buttons at the top
- Shopping cart button in the header
- Add to cart functionality

## 📁 Project Structure

```
fe-be-monorepo/
├── apps/
│   ├── frontend/          # Next.js + Tailwind
│   │   ├── app/
│   │   │   ├── page.tsx   # Main shopping page
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── backend/           # NestJS API
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   └── products/
│       │       ├── products.controller.ts
│       │       ├── products.service.ts
│       │       └── products.module.ts
│       └── package.json
│
├── packages/              # Shared packages
├── turbo.json            # Turborepo config
└── package.json          # Root config
```

## 🔌 API Endpoints

All accessible at `http://localhost:3001`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| GET | `/products/categories` | Get all categories |
| GET | `/products/category/:category` | Get products by category |

## 🎨 Technologies Used

### Frontend Stack
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety

### Backend Stack
- **NestJS 11** - Progressive Node.js framework
- **TypeScript** - Type safety
- **Express** - HTTP server

### Tooling
- **Turborepo** - Monorepo build system
- **npm workspaces** - Package management
- **ESLint** - Linting
- **Prettier** - Code formatting

## 📝 Available Scripts

From the root directory:

```bash
# Development (starts both apps)
npm run dev

# Build all apps
npm run build

# Lint all apps
npm run lint

# Format code
npm run format

# Type checking
npm run check-types
```

## 🧪 Testing the Application

### Frontend Tests
1. Open http://localhost:3000
2. Click on category filters (All, Electronics, Fashion, Home)
3. Click "Add to Cart" on any product
4. Click the Cart button to open cart sidebar
5. Update quantities with +/- buttons
6. Remove items from cart

### Backend Tests
Test API with curl:

```bash
# Get all products
curl http://localhost:3001/products

# Get categories
curl http://localhost:3001/products/categories

# Get specific category
curl http://localhost:3001/products/category/Electronics
```

## 🔧 Configuration Files

### Frontend Config
- `.env.local` - Environment variables (API URL)
- `tailwind.config.ts` - Tailwind theme
- `next.config.js` - Next.js settings
- `postcss.config.js` - PostCSS plugins

### Backend Config
- `src/main.ts` - CORS and port configuration
- `nest-cli.json` - NestJS CLI settings

## 📚 Documentation

- `README.md` - Main project overview
- `GUIDE.md` - Detailed setup and development guide
- `SETUP.md` - This quick start guide

## 🎯 Next Steps

### Immediate Enhancements
1. **Add Database**: Replace in-memory data with PostgreSQL/MongoDB
2. **Authentication**: Add user login/signup
3. **Order System**: Create orders and checkout flow
4. **Search**: Add product search functionality

### Advanced Features
1. **Admin Dashboard**: Manage products and orders
2. **Payment Integration**: Stripe or PayPal
3. **User Profiles**: Order history and favorites
4. **Product Reviews**: Rating and reviews system
5. **Real-time Updates**: WebSocket for live inventory

### DevOps
1. **Docker**: Containerize applications
2. **Testing**: Add Jest and E2E tests
3. **CI/CD**: GitHub Actions or similar
4. **Deployment**: Vercel (frontend) + Railway/Render (backend)

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Frontend Can't Connect to Backend
1. Ensure backend is running on port 3001
2. Check `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:3001`
3. Verify CORS is enabled in backend

### Tailwind Styles Not Working
1. This project uses **Tailwind CSS v4** with `@import "tailwindcss"` syntax
2. Ensure `@tailwindcss/postcss` is installed
3. Check `postcss.config.js` uses `'@tailwindcss/postcss'` plugin
4. Restart the dev server
5. Clear `.next` folder and rebuild
6. See `TAILWIND_V4_NOTES.md` for more details

### Tailwind CSS v4 PostCSS Error
If you see an error about PostCSS plugin:
```bash
cd apps/frontend
npm install @tailwindcss/postcss
```
Then update `postcss.config.js` to use `'@tailwindcss/postcss'` instead of `'tailwindcss'`

## 🎉 Success!

Your monorepo is ready! Both the frontend and backend should be running, and you can:
- Browse products at http://localhost:3000
- Add items to cart
- Filter by category
- The frontend fetches data from the NestJS backend

Happy coding! 🚀
