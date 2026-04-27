# Portfolio Setup for GitHub Pages

Your portfolio is now configured for GitHub Pages deployment!

## Prerequisites

1. **Node.js** 18+ installed locally
2. **Git** repository initialized
3. **GitHub** account with a repository

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Deployment Options

### Option 1: Deploy to `username.github.io/portfolio` (Subdirectory)

**Current setup uses this configuration.**

1. Create a GitHub repository named `portfolio`
2. Add remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repository **Settings → Pages**
4. Select **Deploy from a branch** and choose `gh-pages` branch
5. Push will trigger automatic deployment via GitHub Actions

### Option 2: Deploy to `username.github.io` (Root Domain)

If you want to deploy to your root domain:

1. Update `vite.config.ts`:
   ```typescript
   base: "/", // Change from "/portfolio/"
   ```

2. Repository must be named exactly `YOUR_USERNAME.github.io`

3. Push to deploy

## Build & Deploy Manually

```bash
npm run build  # Creates optimized build in 'dist' folder
```

Upload the `dist` folder contents to your GitHub Pages manually if not using Actions.

## Key Changes Made

- ✅ Removed server-side code (Express, Drizzle ORM, etc.)
- ✅ Updated Vite config for static site generation
- ✅ Simplified npm scripts (only frontend tasks)
- ✅ Added GitHub Actions workflow for auto-deployment
- ✅ Assets output to `dist` (default GitHub Pages location)

## Troubleshooting

- **Blank page?** Check that `base` in `vite.config.ts` matches your deployment path
- **Assets not loading?** Ensure relative paths use the `base` variable
- **Styles missing?** Verify CSS imports in `src/main.tsx`

## Next Steps

1. Push your code to GitHub
2. Wait for the GitHub Actions workflow to complete
3. Visit your live portfolio at your GitHub Pages URL!
