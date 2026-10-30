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
tools/series-parallel/        # series/parallel resistance calculator
README.md
CLAUDE.md
```

Update this section as files and folders are added.

## Key Requirements
1. Every page must be responsive and work on desktop, tablet and phone.
2. Users can toggle between a light and a dark theme. The default is the dark terminal theme.
3. Text must stay easy to read, with good contrast, in both the light and the dark theme.

## Design Direction
Terminal style: monospace type throughout (system monospace fonts, no web fonts), green text on a near-black background, square corners and thin borders, and "> " / "$ " prompt marks. Dark is the default theme. The light theme is a "paper terminal" (pale green-grey background, dark green text). All colors are CSS variables at the top of `css/style.css`; change colors there only.

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
2. **Phase 2 (done): series/parallel resistance calculator.** Enter two or more resistor values and pick series or parallel; get the total resistance. Series: add the values. Parallel: 1 ÷ (1/R1 + 1/R2 + …).
   - [x] Page in `tools/series-parallel/` (html + js) with the shared header, theme toggle and "All tools" link.
   - [x] Inputs: start with 2 boxes, "Add resistor" / "Remove" buttons, and a series/parallel switch.
   - [x] Rules and messages: values above zero, empty boxes skipped, at least 2 values, plain error messages.
   - [x] Short plain-language "how it works" note.
   - [x] One new card on the homepage; update the file list above.
   - [x] Test at phone, tablet and desktop widths in both themes (100 Ω + 200 Ω in series = 300 Ω; two 100 Ω in parallel = 50 Ω; three 300 Ω in parallel = 100 Ω).
   - Out of scope: unit prefixes like `4.7k`, mixed series/parallel networks, other tools.
3. **Phase 3 (planned): RC charge-time calculator.** Enter a resistance and a capacitance, each with a unit dropdown (Ω, kΩ, MΩ and pF, nF, µF, mF). Get the time constant τ = R × C and the time to charge to about 63% (1τ), 90% (2.3τ) and 99% (4.6τ), shown in µs, ms or s.
   - [ ] Page in `tools/rc-charge-time/` (html + js) with the shared header, theme toggle and "All tools" link.
   - [ ] Inputs: two number boxes, each with a unit dropdown beside it (under it on a phone).
   - [ ] Rules and messages: both values required and above zero, plain error messages.
   - [ ] Short plain-language "how it works" note (what a time constant is; charging slows as the capacitor fills).
   - [ ] One new card `[03]` on the homepage; update the file list above.
   - [ ] Test at phone, tablet and desktop widths in both themes (1 kΩ × 1 µF = 1 ms; 10 kΩ × 100 µF = 1 s; 1 MΩ × 1 nF = 1 ms).
   - Out of scope: discharge timing, charge-curve graphs, typed prefixes like `4.7k`, other calculators.

## Rules for Claude
- Explain technical terms in plain language.
- Ask before making big changes.
- Ask rather than guess.
