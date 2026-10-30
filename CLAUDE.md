# CLAUDE.md

## Tech Stack
- Plain HTML, CSS, and JavaScript only.
- No frameworks, no build step. Files open directly in a browser.

## Project Structure
```
index.html                    # portal home page, lists the tools
css/style.css                 # shared styles and light/dark colors
js/theme.js                   # shared light/dark theme toggle
tools/ohms-law/               # one folder per tool (html + js)
README.md
CLAUDE.md
```

Update this section as files and folders are added.

## Key Requirements
1. Every page must be responsive and work on desktop, tablet and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.
3. Text must stay easy to read, with good contrast, in both the light and the dark theme.

## Feature Plan
A portal where students try small Electrical Engineering web tools.

### Portal structure
- **Homepage** (`index.html`): a short intro plus one card per tool.
- **Opening a tool:** the visitor clicks a tool's card, which opens that tool's own page in `tools/<tool-name>/`.
- **Getting back:** every tool page has an "All tools" link and a header link to the homepage.
- **Adding a tool later:** create a new folder `tools/<tool-name>/` with its own page and script, then add one card for it on the homepage. Nothing else changes.

### Phases
1. **Phase 1 (done): portal + first tool.** Homepage, light/dark theme toggle, and the Ohm's law calculator (enter any two of voltage, current, resistance; get the third plus power).
   - [x] Portal homepage with a placeholder "Tool 1 — coming soon" card that opens its page and links back.
   - [x] Placeholder replaced by the real tool: the Ohm's law calculator, opened from its homepage card with an "All tools" link back.
2. **Phase 2 (not planned yet): more tools.** Which tools to add will be decided together before starting.

## Rules for Claude
- Explain technical terms in plain language.
- Ask before making big changes.
- Ask rather than guess.
