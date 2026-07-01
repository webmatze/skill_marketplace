# Phase 4: Editing

Goal of this phase: take the rough draft and produce a clean manuscript. Four passes, each with a single focus. Don't combine passes — every time you try to fix prose and continuity in the same read, both get half-done.

## Pass 1 — Continuity

Focus: facts, timeline, character, world.

Read every chapter in order. Keep the continuity ledger from `outline.md` open. After each chapter, ask:

- Are character names, ages, descriptions, relationships consistent with the ledger and earlier chapters?
- Does the timeline hold? (How many days have passed? Is "yesterday" actually yesterday in the chapter's now?)
- Are objects, locations, and prior events referred to correctly?
- For fiction with rules (magic, tech, period): are the rules respected?
- Did anything set up earlier go unresolved? Did anything pay off without setup?

Fix continuity errors directly in the chapter files. Update the ledger as you go. If a fix is non-trivial (changing a character's profession, for instance), check every chapter that references it before moving on.

This pass is not about prose. Don't get sucked into rewriting sentences. Just notes on continuity and the smallest fixes needed to make the facts line up.

## Pass 2 — Prose quality

Focus: sentence-level writing, AI-slop removal.

This is where `references/avoiding-ai-slop.md` earns its keep. Read it before starting this pass. Then read each chapter looking for:

- Banned phrases and constructions — and the language-specific slop list in `notes.md` if the book isn't in English
- Structural tells: bow-tie endings, negation-then-correction, rule-of-three, the redundant gloss, em-dash inflation
- Cliché openings (waking up, looking in a mirror, weather, "Little did she know...")
- Overused verbs (*to be*, *to have*, *seemed*, *began*, *started*)
- Filter words (*saw*, *heard*, *felt*, *noticed*) where they buffer the reader unnecessarily
- Adverb pile-ups where strong verbs would do
- Sentence rhythm — three medium-length sentences in a row is monotonous; vary
- Description that's atmospheric but unspecific ("a sense of unease", "a strange feeling"), or all-visual where another sense would ground it
- Telling emotions ("she was angry") rather than rendering them physically

When you fix what you find, don't just swap the word — re-think the thought (see the editing note in `avoiding-ai-slop.md`). A synonym for a generated phrase is usually still generated.

Make edits in place. After editing a chapter, do a final read of just that chapter at slight reading speed — fast enough that clunky sentences trip you. Anything that trips, fix.

### The fresh-eyes problem

You are bad at spotting slop in prose you just wrote — you already judged it good once, and re-reading in the same frame mostly re-confirms it. Two ways to break the frame:

- **Reframe the read.** Don't re-read asking "is this good?" Read asking the adversary's question: *"name the three lines here that most read as AI-written."* Forcing yourself to find three surfaces things a sympathetic read glides past. If the user is open to it, this works even better as a separate agent or a fresh session that hasn't seen the draft being written.
- **Compare against the anchor.** Read a paragraph of the pastiche anchor or a comp title from `book-spec.md`, then read your paragraph. The gap between a real voice and the draft is usually exactly the slop.

Don't try to make every sentence beautiful. Aim for "transparent" — the reader doesn't notice the prose, just the story. Beauty where it serves the moment; clarity everywhere else.

## Pass 3 — Dialogue

Focus: character voice, dialogue mechanics, dialogue-narration ratio.

Read each chapter for dialogue specifically. For each scene with two or more speakers:

- Read the lines for character A in isolation. Do they sound like A's voice marker? If you covered the dialogue tags, would you know who's speaking?
- Same for character B.
- If voices have collapsed into a generic register, rewrite the weaker character's lines using the markers from the character sheet.
- Are dialogue tags and action beats varied? Long stretches of "X said / Y said / X said" feel mechanical; replace some with action beats or eliminate entirely when the speaker is clear.
- Are lines doing real work? Cut any line that's only there to deliver information the reader already has.

Common issue: every character is articulate and sentence-complete. Real speech fragments, repeats, interrupts, trails off. Use this — but sparingly. One or two characters can be more fragmentary than the others; they'll feel more alive.

## Pass 4 — Final read

Focus: pacing, reader experience.

Read the manuscript as a reader would, ideally compiled (`scripts/compile_manuscript.py`). Don't take notes mid-read for anything except: places where you got bored, places where you got confused, places where you stopped believing it.

After the read, attack those three lists.

- **Bored** = pacing problem. Either cut, or raise the stakes / add a complication.
- **Confused** = setup problem. Plant earlier or signpost more clearly.
- **Stopped believing** = motivation problem. The character did something the reader can't connect to who they are. Either earn the moment with more interiority, or change the moment.

If a single chapter accumulates two or three of these problems, consider rewriting it from scratch rather than patching.

## Word counts and chapter balance

Run `python scripts/compile_manuscript.py <book-slug>/ --report` to print word counts per chapter. Look for:

- A chapter much shorter than its neighbours (often thin scenes that wanted more)
- A chapter much longer than its neighbours (often two chapters smashed together)
- A pacing valley — three or four mid-book chapters that flatten in length and incident

Balance only if it serves the book. A novella where the climax chapter is twice as long as the rest is fine. A novella where chapter 9 is twice as long as chapters 8 and 10 because chapter 9 contains the actual idea is a sign chapter 8 or 10 is filler.

## Optional: structural pass

Only if pass 4 surfaces big problems. This is the "is the book the right shape" pass — moving chapters, cutting subplots, restructuring acts. It's expensive and rare. Most books don't need it. If you do need it, treat it as a return to phase 2 (replot the affected stretch, rewrite the affected chapters in phase 3).

## Done when

- All four passes complete
- Word count report looks balanced relative to the book's intent
- The user has read the full manuscript at least once and signed off
- The continuity ledger is internally consistent with the final text

Then move to phase 5.
