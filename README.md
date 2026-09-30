# Ink & Ethics

The student philosophy club site for weekly quotations, discussion topics, and club details.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Create a production build: `npm run build`

## Essay API

The essay page uses `GET /api/essays` and `POST /api/essays`. Run the API locally
with `npm run server` (it listens on port `8787`) while `npm run dev` is running;
Vite proxies `/api` requests to it. A production server can serve the built
`dist` folder and the API together with `npm start`.

Administrator login uses `2499` unless `ADMIN_PASSWORD` is set in the API
server environment. Essay authors can delete their public essays by
confirming the email address they used when submitting.

### Persist essay data on Render

Essays, club information, quotes, topics, polls, forums, and credits are stored
in Supabase so the data is shared across visitors and survives Render deploys.
Per-browser poll receipts and administrator sign-in state remain in that
browser's local storage.

1. In Supabase, open **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql),
   and apply the migration.
2. In Render's web service **Environment**, set `SUPABASE_URL` to the project's
   URL and `SUPABASE_SECRET_KEY` to a newly generated secret key. Set a strong
   `ADMIN_PASSWORD` there as well. Keep the secret key out of `VITE_` variables,
   source control, and browser code.
3. Deploy the service. Sign in as an administrator once; that saves the
   browser's existing club data to Supabase and initializes the shared state.
   After that, admin changes persist centrally; public votes, forum threads,
   replies, and essay submissions are saved through the server API.
4. Export a backup from Supabase regularly. The club info/topics screen also
   has a JSON export for those two data sets.

If the previous Render instance still has essays in its temporary filesystem,
export them before switching. This migration does not copy the old JSON file
into Supabase automatically.

GitHub Pages only hosts the static frontend, so it cannot persist essay
submissions by itself. Set `VITE_API_BASE_URL` at build time to the public URL of
the deployed API when the frontend and API are hosted separately.

## GitHub Pages

Push to `main` and the workflow in `.github/workflows/deploy.yml` builds and deploys the site automatically. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
