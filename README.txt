
# Frontend Setup (React + Vite + TailwindCSS)

1. Open terminal and run:

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Update `tailwind.config.js`:

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: { extend: {} },
plugins: [],
```

3. In `src/index.css`, add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Replace `App.jsx` with Login/Signup/Profile forms and fetch `/signup`, `/login`, `/profile` using Axios.

---

Backend is fully ready in `server/` folder.
