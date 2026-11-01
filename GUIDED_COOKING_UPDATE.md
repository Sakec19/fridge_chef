# Guided Cook section

Dedicated **Guide** tab for dish-name cooking instructions. Built-in and saved guides are searched first; when none match, the existing `/api/recipes` Gemini backend generates a guide if configured. Generated guides are saved locally. Users can check off ingredients, add them to their shopping list, and navigate through numbered steps.

All current meal planning, diet, cuisine, appearance, and app icon assets are retained. This release renames the service-worker cache to prompt an update. After deployment, refresh or reinstall a stale PWA if needed.

Set `GEMINI_API_KEY` and a valid `GEMINI_MODEL` in Vercel (the API code defaults to `gemini-2.5-flash-lite`). No OpenAI, Muse, or Groq provider is used.
