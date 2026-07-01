# Phase 1: Niche and premise

Goal of this phase: end with a filled-in `book-spec.md` that names the genre, audience, premise, voice, and themes clearly enough that every later decision can be measured against it.

This phase is short — usually one focused conversation. Don't over-research; the book gets written in phase 3.

## If an author persona is driving this

If an author-persona skill invoked book-writer (it will have pointed you at an `author-profile.md`), don't interview the user for voice from scratch. **Seed `book-spec.md` from the profile** — Voice DNA and pastiche anchor → Voice and tone + Voice sample + Pastiche anchor; anti-patterns → Anti-patterns; obsessions/motifs → Idiosyncrasies & obsessions; themes → Themes; genre/comps/length → Genre and Format fields. Then only ask the user for what the persona can't supply: the specific premise, characters, and any deviations from the persona's defaults. The persona supplies *how* the book is written; the user supplies *what* it's about.

## What "niche" means here

Niche = the specific reader who will buy this book and the specific thing they expect when they do. "Romance" is not a niche. "Small-town second-chance contemporary romance with a single-dad hero" is a niche. The narrower the niche, the easier it is to write something that hits the mark, and the easier it is to find readers on Amazon.

For Kindle/KDP-style publishing, look for niches that are:

- **Active**: people are publishing in it within the last 6–12 months
- **Underserved**: top results aren't all from huge publishers; new books can chart
- **Defined**: readers know the conventions and expect them (tropes, length, heat level, ending type)

Do not pick a niche just because it's "trending" — write something the user can actually finish. A medical thriller is a bad niche if the user doesn't know any medicine.

## Research, if the user wants market signal

The user may already know what they want to write — in that case, skip the research and go straight to the premise. If they want market input, gather signal from:

- Amazon's bestseller lists for sub-categories (the deeper the sub-category, the more useful)
- "Customers also bought" patterns
- Recent (last 6 months) self-published titles in the niche, looking at length, blurb pattern, cover style
- Reader reviews — what they praise and what they complain about. Complaints are gold; they tell you what's missing.

If web search is available, run a few targeted queries. If not, work from what the user already knows about the genre.

Output a short summary in `notes.md` (or inline in the conversation) covering:

- 2–3 candidate sub-niches
- Typical length and pricing in each
- 1–2 recurring reader complaints in each (= opportunities)

Then ask the user which one to commit to. Don't pick for them.

## The premise

Once the niche is chosen, write the premise. A strong premise has four moving parts:

1. **Protagonist** with a clear identity (not just a name — a role, a stake, a flaw)
2. **Inciting situation** that pulls them out of equilibrium
3. **Goal or stakes** — what they want or stand to lose
4. **Obstacle or twist** — why it's hard or surprising

Test it with the **one-sentence pitch** (the logline). If you can't write the book in a single sentence, you don't know it well enough yet. Keep iterating.

**Examples**

- *Genre fiction:* "A reformed cat burglar agrees to one last job — stealing a painting that turns out to be the only proof her dead sister was murdered."
- *Cozy mystery:* "When the new owner of a small-town bakery finds her landlord dead in the walk-in freezer, she has 48 hours to clear her name before the inspector decides her sourdough starter is a murder weapon."
- *Non-fiction:* "A practical guide to migrating legacy Rails monoliths to a modular architecture without freezing the team's feature roadmap."

## Voice and tone

This is the part most "AI books" skip and it's the reason they read flat. Decide before writing:

- **POV**: first / close third / omniscient / multi-POV
- **Tense**: past or present
- **Register**: literary / commercial / pulpy / dry / wry / earnest
- **Reading speed**: page-turner (short sentences, lots of dialogue, fast scenes) or immersive (longer paragraphs, more interiority)
- **Comparable books**: name 2–3 books or authors as anchors. "Like X meets Y" works. The user doesn't have to imitate them; the comps just calibrate.

Write 2–3 sentences in the chosen voice as a sample. Paste it in `book-spec.md` under "Voice sample." This becomes the touchstone the drafting phase keeps checking against.

## Filling in book-spec.md

Copy `assets/book-spec-template.md` into the project as `book-spec.md` and fill in every section. Leave nothing as `[TBD]` — if a field doesn't apply, write "n/a" with a one-line reason. The spec is the constitution; vague constitutions produce vague books.

Show the filled spec to the user before moving to phase 2 and ask: "Anything you'd change before we plot?" Surface the questions that were hardest to answer; those are usually the parts where the book is still mushy.

## Done when

- `book-spec.md` exists and has every section filled
- User has confirmed the premise, voice, and length target
- User knows what genre and length they're committing to

Then move to phase 2.
