# Phase 3: Writing chapters

Goal of this phase: turn each outlined chapter into prose. Chapter by chapter. One file per chapter in `chapters/`, named `NN-<slug>.md` (e.g. `03-the-bakery-fire.md`). Zero-padded numbers so they sort correctly.

This is the longest phase. Don't try to write the whole book in one go — both the user and the model lose calibration. Work in sessions of 1–3 chapters and let the user read in between.

## Before drafting any chapter — load the right context

Reading the entire prior manuscript before each chapter wastes context and rarely helps. Instead, before writing chapter N, load:

1. **`book-spec.md`** — always. The voice sample, pastiche anchor, anti-patterns, and the **voice ledger** at the bottom go cold fast; this is what keeps the voice from drifting toward a generic average over a long book.
2. **The outline beat for chapter N** — from `outline.md`.
3. **The continuity ledger** — from the bottom of `outline.md`.
4. **Character sheets for whoever appears in chapter N** — only those, not all of them.
5. **The previous chapter's last scene** (last ~500 words) — for narrative seam continuity.
6. **Any chapter that planted setup the current chapter pays off** — only if the outline flags it.

Don't load everything. The point of the file structure is that you can be selective.

### Voice warm-up before drafting

Slop is far cheaper to *not generate* than to edit out afterwards, because editing tends to swap one generated phrase for another rather than re-thinking the line. So warm up the voice before writing prose:

1. Re-read the voice sample and pastiche anchor in `book-spec.md` so they're fresh in context, not a cold memory of "the tone."
2. Write 2–3 sentences in the book's voice and check them against the anchor: *does this read like the same hand wrote both?* If not, adjust before drafting — don't push forward in a voice that's already drifting.
3. Only then draft the chapter.

After drafting, update the **voice ledger** in `book-spec.md` with any concrete style decision you made this chapter (a usage pick, a punctuation habit, a motif introduced, a move tried and rejected) so the next chapter inherits it.

If the user says "continue where we left off" and there's no obvious last chapter, list the existing chapter files and ask which to extend.

## The chapter scaffold

Before writing prose, write a quick 5–8 line scaffold at the top of the chapter file (in a comment block or under a `<!-- scaffold -->` marker). It should match the structure from `assets/chapter-template.md`:

- POV, location, timing
- Scene goal (what the POV character pursues)
- Conflict (what stops them)
- Beats — 3–6 micro-events that make up the chapter
- Outcome
- What changes (state shift between start and end)

This is your map. It takes two minutes and prevents writing 1,500 words of dialogue that goes nowhere.

When the chapter is done, you can leave the scaffold in the file (it gets stripped at compile time — see `compile_manuscript.py`) or move it to a comment.

## Drafting a chapter

Write in continuous prose. Aim for the length target from the spec (typically ~2,000–3,000 words per chapter; shorter for pulp/genre, longer for literary or non-fiction).

While drafting, follow the principles in `references/avoiding-ai-slop.md`. The two highest-leverage ones:

- **Specific concrete detail beats general atmospheric description.** "The bakery smelled like burnt sugar" beats "The bakery had a unique atmosphere." Even if you can only commit to one detail per scene, make it a real one.
- **Dialogue carries character through verbal tics, not through dialogue tags.** Two characters with distinct voices can have a whole exchange with almost no "she said" needed; two characters with bland voices need tags every line and still blur together.

### Pacing within a chapter

A chapter is roughly: hook → escalation → turn → exit. The hook can be an image, a question, a piece of dialogue, a discovery — but the reader should know within the first paragraph whose head we're in and why we're here. The exit is a line that pulls into the next chapter — not necessarily a cliffhanger, but always a reason to keep going.

Avoid:

- Opening with weather or waking up (unless either is plot-relevant)
- Long flashbacks before the present-day chapter has its own footing
- Info dumps disguised as dialogue ("As you know, Bob...")
- Ending on equilibrium — even quiet chapters should end with something unresolved

### Dialogue

Dialogue should do at least two of: reveal character, advance plot, escalate conflict. Lines that only deliver information get cut or absorbed into narration.

Each speaker should sound different. If you swap the names, the lines should still be recognizable. The character sheets' voice markers exist for this — refer to them.

Use action beats more than dialogue tags. "She closed the laptop. 'I quit.'" is sharper than "'I quit,' she said angrily."

### Show don't tell — the working version

The cliché is right but unhelpful. The working rule is: **emotions are a body, not a label.** Don't write "she was furious." Write what fury looks like in this specific character — the user's character sheet should help. Maybe she goes very quiet. Maybe she over-pronounces consonants. Maybe she stares at a fixed point. Pick one and use it.

Same for setting. Don't establish "a creepy old house." Establish one detail (a stair that moans on the third step from the top) and let the reader generalize.

### Filter words

Cut these where you can: *saw*, *heard*, *felt*, *noticed*, *thought*, *realized*, *seemed*, *began to*, *started to*. They distance the reader by one step. "She heard the door slam" → "The door slammed." Same information, no buffer.

Don't cut them religiously — sometimes the buffer is what you want. But default to cutting.

### Length control

If a chapter is running long (over 4,000 words for genre, over 5,000 for literary), it probably contains two chapters. Look for the natural break — usually a location change, a time skip, or a POV shift — and split.

If a chapter is running short (under 1,500 words for a novel, under 1,000 for a novella), it probably needs more conflict, not more description. Adding paragraphs of weather or setting won't fix a thin scene.

## Multi-chapter sessions

If the user wants several chapters in one session, ask which ones first. Then for each one, do the load → scaffold → draft loop. Don't try to draft chapter 5 with chapter 4 still fresh in working memory and assume the seams will hold — re-read the last scene of chapter 4 from disk before starting 5.

After every 3–5 chapters, suggest the user read what's been written. Calibration drift is real; if voice or pacing has shifted, catching it after 3 chapters costs 3 chapters of revision; catching it after 20 costs 20.

## When the outline doesn't survive contact

It happens. A chapter resists the outlined beat — the character won't do what the outline says they would, or a side character is hijacking the scene. This is a signal, not a failure.

Pause. Tell the user. Two options:

1. **Hold the outline.** Force the character back. Sometimes the outline is right and the resistance is just the model improvising.
2. **Update the outline.** If the deviation is genuinely better, update `outline.md` and the affected character sheets, then continue. Don't let outline and chapters drift silently — the editing phase becomes a nightmare.

Default to option 2 if the deviation feels true to the character; option 1 if it just feels easier.

## Done when

- Every chapter in the outline has a corresponding `chapters/NN-*.md` file
- Each chapter has been drafted (not just scaffolded)
- The continuity ledger has been updated whenever new fixed details were introduced
- The voice ledger in `book-spec.md` reflects the style decisions made while drafting
- The user has read at least the first 3 chapters and confirmed the voice is right

Then move to phase 4.
