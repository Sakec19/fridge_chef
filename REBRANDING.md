# Flavyntra brand update

This build renames the visible app brand from Fridge Chef to **Flavyntra**. It retains the existing recipe-bowl icons and all current cooking, cuisine, diet, planning, shopping and Gemini functionality.

## Existing saved data

The app intentionally preserves its preexisting `fridge-chef-*` localStorage keys and backup filenames so that existing installed users do not lose saved recipes, meal plans, diet/cuisine preferences, shopping lists or theme selection when the brand changes. Do not rename those keys without adding a tested migration.

## Deploy

Upload the contents of `fridge_chef-main/` to the root of your existing GitHub repository (`Sakec19/fridge_chef`), keeping its directory structure. Do not upload secrets. Verify the new deployment on Vercel, then hard-refresh/reopen or reinstall the PWA if its name is cached by your device. The GitHub repository name and Vercel domain have intentionally not been changed.

**Trademark and domain clearance is not complete.** Renaming the visible brand is not a legal availability determination.
