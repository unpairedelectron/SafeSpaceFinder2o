# 🚀 Quick Start Guide

## Start Developing in 3 Steps

### 1️⃣ Open Terminal
Press `` Ctrl+` `` in VS Code to open the integrated terminal

### 2️⃣ Start the Development Server
```powershell
npm run dev
```

### 3️⃣ Open Your Browser
Navigate to **http://localhost:3000**

---

## 🎯 What You'll See

### Home Page Features:
- 🔍 **Search Bar**: Find businesses by name or type
- 🎛️ **Filters**: Filter by accessibility, identity, and neurodiversity features
- 📊 **Stats**: See community statistics
- 🏢 **Business Cards**: Browse safe spaces with ratings and features

### Try These Actions:
1. **Search**: Type "cafe" or "restaurant" in the search bar
2. **Filter**: Click on accessibility or inclusivity filters
3. **Explore**: Click on business cards to see details
4. **Navigate**: Use the header menu to explore different sections

---

## 📝 Make Your First Edit

### Edit the Home Page Title:
1. Open `src/app/page.tsx`
2. Find line with "Find Your Safe Space"
3. Change it to your custom text
4. Save the file
5. See the change instantly in your browser!

### Add a New Business:
1. Open `src/app/page.tsx`
2. Find the `mockBusinesses` array
3. Copy one business object
4. Modify the details
5. See your new business appear!

---

## 🛠️ Common Commands

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Check code quality
npm run lint
```

---

## 📂 Key Files to Explore

- `src/app/page.tsx` - Home page
- `src/components/Header.tsx` - Navigation
- `src/components/FilterBar.tsx` - Filter sidebar
- `src/components/BusinessCard.tsx` - Business cards
- `src/app/business/[id]/page.tsx` - Business detail page
- `tailwind.config.js` - Design system colors

---

## 🎨 Customize the Design

### Change Primary Color:
1. Open `tailwind.config.js`
2. Find the `primary` color definition
3. Update the color values
4. Save and see changes instantly!

### Modify Spacing:
- Use Tailwind classes: `p-4`, `m-8`, `space-x-2`
- Check [Tailwind Docs](https://tailwindcss.com/docs)

---

## 🐛 Troubleshooting

### Port Already in Use?
```powershell
# Kill the process on port 3000
npx kill-port 3000

# Then restart
npm run dev
```

### Dependencies Issues?
```powershell
# Clear and reinstall
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

### Build Errors?
```powershell
# Clear Next.js cache
Remove-Item .next -Recurse -Force
npm run dev
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🎉 You're All Set!

Start building features that make public spaces safer and more inclusive for everyone!

**Need help?** Check `PROJECT_SETUP.md` for detailed information.

Happy coding! 🌈✨
