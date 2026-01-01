# Perla Beauty Center - Spa Lab

A modern, full-stack web application for Perla Beauty Center, featuring an "Ethereal Luxury" aesthetic that blends haute couture codes, editorial design, and a soothing atmosphere.

## 🌟 Features

- **Modern React Frontend** with TypeScript and Vite
- **Express Backend** with TypeScript
- **UI Components** built with Radix UI and Tailwind CSS
- **Responsive Design** optimized for all devices
- **Rate Limiting** for API security and DDoS protection

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- PostgreSQL (if using database features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RYOMA-SyY/Salon-Perla-Landing.git
cd Salon-Perla-Landing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see `.env.example`)

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📜 Available Scripts

- `npm run dev` - Start the development server (serves both API and client)
- `npm run dev:client` - Start only the Vite dev server (port 5000)
- `npm run build` - Build both client and server for production
- `npm run start` - Start the production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes (requires DATABASE_URL)

## 🏗️ Building for Production

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
NODE_ENV=production npm run start
```

Or on Windows:
```powershell
$env:NODE_ENV="production"; npm run start
```

## 🌐 Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (`development` or `production`)
- `DATABASE_URL` - PostgreSQL connection string (optional, only needed for database features)

### Rate Limiting Configuration (Optional)

- `RATE_LIMIT_GENERAL_MAX` - Max requests per window for general routes (default: 100)
- `RATE_LIMIT_API_MAX` - Max requests per window for API routes (default: 50)
- `RATE_LIMIT_AUTH_MAX` - Max requests per window for auth routes (default: 5)
- `RATE_LIMIT_UPLOAD_MAX` - Max uploads per hour (default: 10)

Rate limiting windows are 15 minutes for general/API/auth routes, and 1 hour for uploads.

## 📁 Project Structure

```
├── client/          # React frontend application
│   ├── src/        # Source files
│   ├── public/     # Static assets
│   └── index.html  # HTML template
├── server/         # Express backend
│   ├── index.ts   # Server entry point
│   ├── routes.ts  # API routes
│   ├── static.ts  # Static file serving
│   └── rate-limiter.ts  # Rate limiting configuration
├── shared/         # Shared types and schemas
├── script/         # Build scripts
└── dist/           # Production build output
```

## 🚢 Deployment

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm run start
```

### Public Directory
The built static files are located in `dist/public`

### Notes
- The server serves both the API and the client application
- In production, static files are served from `dist/public`
- The server listens on the port specified by the `PORT` environment variable
- Make sure to set `NODE_ENV=production` in your deployment environment

## 🔒 Security Features

### Rate Limiting

The application includes multiple layers of rate limiting:

- **General Routes**: 100 requests per 15 minutes per IP
- **API Routes**: 50 requests per 15 minutes per IP (stricter)
- **Authentication Routes**: 5 requests per 15 minutes per IP (very strict)
- **File Uploads**: 10 uploads per hour per IP

Rate limiters are automatically applied:
- API routes (`/api/*`) use the API limiter
- All other routes use the general limiter
- Authentication routes should use the `authLimiter` middleware explicitly

Example usage in routes:
```typescript
import { authLimiter } from "./rate-limiter";

app.post("/api/auth/login", authLimiter, async (req, res) => {
  // Your login logic
});
```

## 📝 License

MIT

