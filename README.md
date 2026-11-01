# Fridge Chef

A no-build, offline-first Progressive Web App. Includes pantry, dietary-filtered recipe matching, monthly dinner planning, planning for selected days, nutrition estimates, shopping lists, local persistence, and backups.

## Run locally

You need an HTTP server for PWA/service worker installation:

```sh
python -m http.server 8080
```

Visit http://localhost:8080. Opening `index.html` directly works for much of the UI, but service workers require HTTP(S).

## Deploy to Vercel

Upload all project files to a GitHub repository. On Vercel, Import Project, select the repository, choose framework **Other**, leave build command blank, set output directory to `.` (or leave default for static deployment), then Deploy. Future pushes to your production branch trigger redeployments. Use the HTTPS URL on iPhone; Safari Share → Add to Home Screen.

## Guided cooking: local database → Gemini

Search a dish in **Cook a dish by name**. The app checks bundled local guides, saved AI guides, and matching cached recipes *before* making an API request. If there is no local match and the device is online, `/api/recipes` calls Google Gemini first. If Gemini fails, is unavailable, or provides invalid recipe data, the app reports the issue and local recipes remain usable; it does not fabricate an answer.

All other AI integrations and the manual provider selector have been removed. Meal-idea generation uses Gemini only, while offline meal planning stays intact. Legacy `aiProvider` saved preference is ignored and removed on next save.

For Vercel set server-only `GEMINI_API_KEY`; optional `GEMINI_MODEL` defaults to `gemini-2.5-flash-lite`. Remove `OPENAI_API_KEY`, `OPENAI_MODEL`, `MODEL_API_KEY`, `MUSE_MODEL`, and any historical Groq variables from Vercel after confirming they aren't used by other deployed services. Redeploy. Never expose credentials in the browser.

Run tests with `node backend.test.cjs`. Local static servers cannot execute `/api/recipes`; use a Vercel preview deployment or `vercel dev` for live provider tests. Serverless in-memory rate limiting is not adequate for public use; add shared rate limiting, bot protection, and provider spending alerts. Ingredient and food safety details are informational, not verified.
