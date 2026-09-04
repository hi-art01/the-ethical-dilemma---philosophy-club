# Ink & Ethics

The student philosophy club site for weekly quotations, discussion topics, and club details.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Create a production build: `npm run build`

## Essay API

The essay page uses `GET /api/essays` and `POST /api/essays`. Run the API locally
with `npm run server` (it listens on port `8787`) while `npm run dev` is running;
Vite proxies `/api` requests to it. A production server can serve the built
`dist` folder and the API together with `npm start`.

GitHub Pages only hosts the static frontend, so it cannot persist essay
submissions by itself. Set `VITE_API_BASE_URL` at build time to the public URL of
the deployed API when the frontend and API are hosted separately.

## GitHub Pages

Push to `main` and the workflow in `.github/workflows/deploy.yml` builds and deploys the site automatically. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
