# Diet preferences update

Choose a diet in **More → Your preferences** or in the Cook tab. Selection is saved in localStorage and applies to offline recipes, monthly dinner plans, selected-day meals, AI ideas, and guided dish search. When the diet changes, existing generated meal plans are cleared; regenerate them to apply the new restriction.

Supported: unrestricted, vegetarian, vegetarian without eggs, vegan, pescatarian, dairy-free, gluten-free, and egg-free. Comma-separated avoidance terms can be specified in Settings. Client and server both screen ingredient names, including Gemini output; dietary preferences are passed to Gemini and unsafe suggestions rejected.

**Important**: This is ingredient-name screening, not certified allergen detection. Cross-contact, hidden allergens in processed products and substitutions cannot be verified. Review packaging carefully, especially for celiac disease or severe allergies. AI nutrition estimates are not clinically verified.

Existing architecture is preserved: offline recipes first for guided dish searches, Gemini only if no stored guide is found. No OpenAI or other AI services.
