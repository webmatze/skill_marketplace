# Phase 5: Publishing prep

Goal of this phase: produce everything needed to publish the book on Kindle (or anywhere else) — blurb, cover brief, keywords, categories, and a compiled manuscript file in a publishable format.

This phase has clear, finite outputs. None of it is creative the way drafting was; most of it is filling out templates well.

## The compiled manuscript

Run the compile script:

```bash
python scripts/compile_manuscript.py <book-slug>/ --docx --epub
```

This produces `manuscript.md`, `manuscript.docx`, and `manuscript.epub`. The docx is what KDP accepts directly; the epub is useful for reviewing on an e-reader before publishing.

If `pandoc` isn't installed, the script will say so. On Debian/Ubuntu: `apt install pandoc`. On macOS: `brew install pandoc`.

Spot-check the compiled file before treating it as final:

- Title page renders correctly (title, author, copyright if used)
- Chapter headings are present and consistent
- No leftover scaffold blocks (`<!-- scaffold -->` and contents)
- No editor's notes left in the prose

If anything is wrong, fix the source chapter files and recompile. Do not edit `manuscript.md` directly; it'll be overwritten on next compile.

## The blurb

The blurb is the back-cover / Amazon description. It's the highest-leverage piece of marketing copy in the whole book — readers decide whether to click "buy" based on it. Spend real time here.

Use `assets/blurb-template.md`. The general fiction structure:

1. **Hook** — one line that hints at the conflict or the wrongness in the protagonist's world. Often a question or a stark statement.
2. **Stakes paragraph** — who the protagonist is, what they want, what stands in the way. Three to five sentences. Concrete, not abstract.
3. **Twist or escalation** — the line where things get worse, the reader realizes the book has more than the obvious plot.
4. **Tagline** — one short line, often italicized, that captures the emotional pitch. "Some doors should stay locked." "She didn't want a second chance. She wanted revenge."

For non-fiction:

1. **Pain hook** — the reader's specific problem
2. **Promise** — what the book delivers that other books don't
3. **Credibility** — why this book / this author can deliver it (one or two sentences)
4. **Outcome** — what the reader will be able to do after reading
5. **Call to action** — gentle, like "If you've ever [pain], this book is your [solution]."

Keep the blurb short. 150–200 words is the sweet spot. Longer blurbs lose readers in the Amazon "Read more" cut-off.

## The cover brief

Even if the user is generating the cover with AI, a brief makes the output ten times better. Use `assets/cover-brief-template.md`. Cover the:

- **Genre signals** — what conventions readers expect (e.g. "thriller covers in this niche use high-contrast urban photography with red title text")
- **Mood and palette** — 3–5 colour anchors and a one-line tonal direction ("damp, after midnight, neon-tinted")
- **Required visual elements** — the specific concrete things that should appear (the bakery, the locked door, a single cherry blossom)
- **Typography direction** — serif vs sans-serif, weight, treatment
- **Title and author placement** — top, middle, or bottom; relative sizes
- **Comp covers** — three published books in the niche whose covers feel right (not to copy — to anchor genre fit)
- **What to avoid** — common AI cover failures: garbled text, six-fingered hands, mismatched perspective. Plus genre-specific avoids (no shirtless men if it isn't that kind of romance).

The brief should be short enough to paste into a Midjourney/Nano Banana prompt or hand to a designer. One page max.

## Keywords and categories

KDP gives you up to 7 keyword fields and 2 category selections. These determine 80% of organic discoverability. Spend time here.

Use `assets/blurb-template.md`'s sibling section or `keywords.md`. For keywords:

- Each keyword can be a phrase up to 50 characters
- Don't repeat words from the title or subtitle (those are already indexed)
- Mix broad ("small town romance") with specific ("single dad romance with bakery")
- Look at top books in the chosen sub-category — what reader-facing language do their blurbs use? That's what readers search for.

For categories:

- KDP lists are deep. Use the most specific sub-category that fits (e.g. "Cozy Mystery → Culinary" rather than "Mystery & Thrillers").
- Submit a request for additional categories via KDP support after publishing — Amazon will let you be in up to 10 categories total, but only 2 via the upload form.

Save final picks in `keywords.md`:

```markdown
# Keywords (KDP, max 7)
1. ...
2. ...
...

# Categories
Primary: Kindle eBooks > Mystery, Thriller & Suspense > Mystery > Cozy > Culinary
Secondary: Kindle eBooks > Romance > Contemporary > Small Town
Additional (request via support after launch):
- ...
```

## Author bio

Short bio for the author page and the back of the book. 60–120 words. What they write, why, and one humanising detail. If the user is publishing under a pen name, ask whether they want a fully fictional bio or a generic one.

Save in `bio.md`.

## Front and back matter

Decide what goes in front (before chapter 1) and back (after the final chapter). Defaults:

**Front matter**: title page, copyright page, dedication (optional), table of contents (auto-generated by most epub readers; skip in markdown).

**Back matter**: about the author, "if you enjoyed this, please leave a review", links to other books in series, mailing list signup. The "leave a review" ask is high-leverage — a simple line at the very end ("If this story stayed with you, a quick Amazon review really helps. Thank you.") materially increases review counts.

Add front and back matter as the first and last entries the compile script picks up. By convention:

- `chapters/00-front-matter.md`
- `chapters/99-back-matter.md`

The script orders by leading number, so 00 sorts first and 99 sorts last regardless of how many chapters are in between.

## KDP upload checklist

Before clicking "publish" in KDP:

- [ ] Manuscript file (.docx or .epub) compiled and spot-checked
- [ ] Cover designed at correct dimensions (KDP's current spec; check the dashboard)
- [ ] Blurb finalized
- [ ] 7 keywords chosen
- [ ] 2 categories chosen, additional categories listed for post-launch support request
- [ ] Author bio written
- [ ] Pricing decided (typical genre fiction novella: $0.99–$3.99; novel: $2.99–$5.99; non-fiction: higher)
- [ ] AI disclosure form filled out per KDP's current rules (mandatory; check current language on the upload form)
- [ ] Pen name vs real name decided

Save the checklist in `notes.md` so the user can tick through it.

## Done when

- `manuscript.docx` and `manuscript.epub` exist and have been spot-checked
- `blurb.md`, `cover-brief.md`, `keywords.md`, and `bio.md` are filled
- The KDP checklist is ticked
- Cover has been generated/designed (this happens outside the skill)

The book is now ready for the KDP upload. The skill's job ends at the dashboard door.
