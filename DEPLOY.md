# Deploying to GitHub Pages

## Prerequisites

- GitHub repository for your portfolio
- Node.js 18+ installed locally

## Step 1: Transfer Files to This Project

Your existing repo has an `images` folder. This project expects assets in `public/media/`.

### Option A: Merge images into public/media (recommended)

1. Copy all files from your repo's `images/` folder into this project's `public/media/` folder
2. If filenames conflict, keep the version you prefer
3. Ensure all media referenced in the code exists in `public/media/` (the code uses paths like `/media/evolution-hand.gif`)

### Option B: Use images folder as media

1. Rename `public/media` to `public/media-backup` (if you need to keep current files)
2. Copy your `images` folder content into `public/media/` — or create `public/media/` and copy `images/*` into it
3. Make sure filenames match what the code expects (see `src/data/projects.js` and page components for paths)

### Required media files (from project references)

- **Hero / projects.js**: nest-hero-banner.mp4, pixel-7-video.mp4, evolution-hand.gif, onetutor-hero.mp4, tenmin-demo.mp4, onetutor-award.png
- **Stickers**: sticker-1.png, sticker-2.png, tenmin-team-2.JPG, sticker-4.png
- **CV**: CV_Juna_Han.pdf (in `public/`)
- Plus all media referenced in DNAEvolution, Nest, OneTutor, Tenmin, Pixel page components

## Step 2: Configure Base Path (Project Sites Only)

If your site is `https://username.github.io/repo-name/` (project site):

1. The GitHub Actions workflow already sets `VITE_BASE_PATH` from the repo name
2. No config changes needed

For local builds:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

If your site is `https://username.github.io/` (user/org site), keep `base: '/'` in `vite.config.js` (default).

## Step 3: Enable GitHub Pages

1. In your repo: **Settings** → **Pages**
2. Under **Build and deployment**:
   - **Source**: GitHub Actions
3. Save

## Step 4: Push and Deploy

1. Push your code (including `public/media/` with all assets) to the `main` branch
2. The workflow runs automatically and deploys to GitHub Pages
3. Check **Actions** for build status
4. Your site will be at: `https://<username>.github.io/<repo-name>/`

## Manual Build (Optional)

```bash
npm install
VITE_BASE_PATH=/repo-name/ npm run build
```

The `dist/` folder contains the deployable static site.

## Troubleshooting

- **404 on refresh**: Ensure `base` and `basename` match your repo path (with leading and trailing slashes)
- **Images not loading**: Verify files are in `public/media/` and paths in code use `/media/filename`
- **CV not opening**: Ensure `CV_Juna_Han.pdf` is in `public/` and the link uses the correct path
