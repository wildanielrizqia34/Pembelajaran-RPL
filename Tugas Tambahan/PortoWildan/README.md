# Web Portfolio Wildan

Full-stack portfolio MVP with React Vite frontend and Laravel API backend.

## Stack

- Frontend: React, Vite, React Router, Axios, Lucide icons
- Backend: Laravel 9, Sanctum token auth, SQLite
- Palette: maroon `#6E1423`, deep maroon `#3B0A12`, blush `#F7E8EA`, ivory `#FFF9F5`, gold `#C8A24A`

## Local Run

Backend:

```bash
cd backend
composer install
php artisan migrate:fresh --seed
php artisan serve --host=127.0.0.1 --port=8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open `http://127.0.0.1:5173`.

## Admin Login

- Email: `admin@wildan.test`
- Password: `password`

## Verification

```bash
cd backend
php artisan test

cd ../frontend
npm run lint
npm run build
```
