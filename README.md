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

## Important limitations

- Offline recipes are selected from a bundled catalog. Online AI recipes are generated using Gemini first and Groq on failure.
- Cost and nutrition numbers are illustrative per serving. Month plan budget only estimates *home-cooked dinners for one serving*, not total groceries, restaurant expenses, or the whole household.
- Pantry quantities do not yet decrement or constrain generated plans. The app checks ingredient names only.
- No login/sync; data is stored in device/browser localStorage and may differ between Safari and home-screen installations.
- The offline HTML download is a *read-only data snapshot*, not a full app replacement.
- Recipe preparation instructions are intentionally general; consult a tested recipe and appropriate cooking temperatures.

## Secure hybrid AI setup (Gemini → Groq → offline)

1. Get a Gemini key at https://aistudio.google.com/apikey and a Groq key at https://console.groq.com/keys . Both providers have eligibility-dependent free tiers and changing limits.
2. In Vercel Project → Settings → Environment Variables, configure **server-only** `GEMINI_API_KEY` and `GROQ_API_KEY` for Production (and Preview if desired). Redeploy after setting them. Keys are NOT entered in the app or committed to GitHub.
3. Optional model overrides: `GEMINI_MODEL` (default `gemini-2.5-flash-lite`) and `GROQ_MODEL` (default `llama-3.3-70b-versatile`). Confirm models exist on your free-tier account.
4. On your Vercel HTTPS site, open Cook, add pantry items, set diet and cook time, then tap **Generate 3 AI recipes**. The message shows Gemini or Groq when a request succeeds.
5. To test failover, temporarily set an invalid `GEMINI_API_KEY` on a test/Preview deployment and verify a valid Groq key produces results. Restore the proper Gemini key afterward. To test offline mode, disable connectivity after the PWA has been loaded at least once; prepackaged recipes and the last saved AI suggestions remain readable.

The `/api/recipes` serverless function uses Gemini `generateContent` (JSON mode) as primary and Groq OpenAI-compatible chat completions (JSON object mode) as backup. On provider failures or invalid recipe responses, it attempts Groq. The app stores up to 3 last-successful AI ideas in localStorage; no keys or provider tokens are cached. Monthly and My Days planning still use the built-in offline catalog.

**Important:** Free tiers are quota-limited, not guaranteed free forever. The endpoint does not include authentication or distributed rate limiting. Before publishing publicly, use Vercel WAF/rate limiting or a shared-store limiter, bot protection, and provider quotas/budget alerts. Client origin checks do not prevent direct scripted abuse. Recipe quantities, calories, costs and allergens are unverified estimates; check ingredient packaging and safe cooking guidance yourself. Safari and installed iPhone PWA may have separate local storage. Local static servers do not execute the `/api/recipes` function: use Vercel deployment or `vercel dev` to test cloud AI.
