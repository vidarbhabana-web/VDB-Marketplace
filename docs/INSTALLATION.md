# VDB Marketplace - Installation & Setup Guide

## 📦 Installation Steps

### Step 1: Clone Repository
\`\`\`bash
git clone https://github.com/vidarbhabana-web/VDB-Marketplace.git
cd VDB-Marketplace
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Setup Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your Project URL and Anon Key

#### Setup Database
1. Go to SQL Editor
2. Create new query
3. Copy all SQL from \`docs/DATABASE_SETUP.sql\`
4. Run the query
5. Create storage buckets (follow instructions in SQL file)

### Step 4: Environment Variables
\`\`\`bash
# Copy template
cp .env.example .env

# Edit .env and add Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

### Step 5: Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Access at: http://localhost:5173

---

## 🚀 Development Tips

### Project Structure
\`\`\`
src/
├── components/        # Reusable components
│   ├── Dashboard/    # Dashboard components
│   ├── Home/         # Homepage components
│   └── ...
├── pages/            # Page components
│   ├── Auth/         # Authentication pages
│   ├── Dashboard/    # Dashboard pages
│   └── ...
├── services/         # API services (Supabase)
├── store/            # Zustand stores (state management)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript types
├── styles/           # Global styles
└── App.tsx          # Main app component
\`\`\`

### Adding New Pages

1. Create page in \`src/pages/YourPage.tsx\`
2. Add route in \`src/App.tsx\`
3. Add navigation link in \`src/components/Header.tsx\`

### Adding New Components

1. Create in \`src/components/YourComponent.tsx\`
2. Export from component
3. Import in page/other components

### API Integration

\`\`\`typescript
import { businessesAPI } from '@/services/supabaseAPI'

// Get businesses
const businesses = await businessesAPI.getBusinesses()

// Create business
await businessesAPI.createBusiness(data)

// Update business
await businessesAPI.updateBusiness(id, updates)
\`\`\`

### State Management

\`\`\`typescript
import { useAuthStore } from '@/store/authStore'
import { useBusinessStore } from '@/store/businessStore'

// Use in components
const { user, login, logout } = useAuthStore()
const { businesses, filteredBusinesses } = useBusinessStore()
\`\`\`

---

## 🔑 Authentication Setup

### User Roles
- **customer** - Can view businesses and contact vendors
- **vendor** - Can create and manage businesses
- **admin** - Can approve businesses and manage platform

### Secure Protected Routes
\`\`\`typescript
<Route 
  path="/vendor-dashboard" 
  element={
    <ProtectedRoute requiredRole="vendor">
      <VendorDashboard />
    </ProtectedRoute>
  } 
/>
\`\`\`

---

## 📱 PWA Features

### Testing PWA
1. Open DevTools (F12)
2. Go to Application → Service Workers
3. Check "Offline" to test offline functionality

### Install App
- Chrome: Three dots → "Install app"
- iPhone: Share → "Add to Home Screen"
- Android: Three dots → "Install app"

---

## 🏗️ Building for Production

\`\`\`bash
# Build
npm run build

# Output in dist/ folder
# Deploy to Vercel, Netlify, or any static host

# Test build locally
npm run preview
\`\`\`

---

## 🐛 Debugging

### Enable Debug Mode
\`\`\`typescript
// In main.tsx
localStorage.setItem('debug', 'vdb:*')
\`\`\`

### Common Issues

**"Cannot find module" error**
- Clear node_modules: \`rm -rf node_modules\`
- Reinstall: \`npm install\`

**Supabase connection error**
- Check .env file credentials
- Verify Supabase project is active
- Check API key permissions

**Service Worker not registering**
- Clear browser cache
- Check console for errors
- Verify public/sw.js exists

---

## 📚 Documentation

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 💡 Tips & Best Practices

### Performance
- Use React.lazy() for code splitting
- Optimize images
- Minimize re-renders with proper memoization
- Use Supabase realtime subscriptions wisely

### Security
- Never commit .env file
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting

### Code Quality
- Run linting: \`npm run lint\`
- Follow naming conventions
- Add comments for complex logic
- Write tests for critical features

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create PR

---

## 📞 Support

Email: support@vdb.vidarbha.com

---

**Happy Building! 🚀**
