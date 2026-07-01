# Scaffolding an author skill

This produces the triggerable persona: a top-level `author-<slug>/SKILL.md`. The author skill is deliberately thin — it captures voice and delegates everything else to `book-writer`. Resist the urge to duplicate book-writing logic here; when `book-writer` improves, every author skill should inherit it for free.

**Placement matters for triggering.** The persona directory must sit directly in the skills directory as `author-<slug>/`, a sibling of `book-writer` and `create-author`. Skill discovery only scans `skills/*/SKILL.md` (depth 1) — nesting the persona under a parent folder hides it from the trigger system. Sibling placement also keeps `../book-writer/...` and `../create-author/...` resolving correctly.

## The author SKILL.md pattern

Use this structure (fill the bracketed parts from the profile):

```markdown
---
name: author-<slug>
description: Write a book in the voice of [persona] — [one-line voice descriptor]. Use when the user asks to write, draft, plot, or outline a book "like [persona]", "in [persona]'s style", or names this persona for a writing project. Drives the book-writer skill with a pre-filled voice. [Language] by default.
---

# Author: [persona]

This skill writes books in [persona]'s voice by driving the `book-writer` skill
(`../book-writer/SKILL.md`). It is the voice layer; book-writer is the engine.

[If real-author-derived: one line — private craft reference; publish original
work under your own/a fictional name, not [persona]'s.]

## On invocation

1. Read this skill's `author-profile.md` — the voice constitution.
2. Read `../book-writer/SKILL.md` and follow its workflow. Locate or create the
   book project directory as book-writer specifies.
3. **Seed `book-spec.md` from the profile** (see "Seeding" below) before plotting.
4. Ask the user for the premise/idea — or, if they want, generate one in
   [persona]'s typical territory (see the profile's thematic section).
5. Proceed through book-writer's phases. Default to book-writer's
   human-in-the-loop checkpoints unless the user asks for **autonomous mode**.

## Voice fidelity

Throughout drafting and editing, the profile's pastiche anchor and anti-patterns
are the touchstone — the same role book-writer's voice sample plays, but
pre-authored. Run book-writer's voice warm-up against this anchor before each
chapter, and check edits against it.

## Autonomous mode

[Include the autonomous-mode block below.]
```

## Seeding `book-spec.md` from the profile

The bridge between persona and engine. When book-writer reaches phase 1, instead of interviewing the user for voice, copy across from `author-profile.md`:

| author-profile.md | → | book-spec.md |
|---|---|---|
| Voice DNA, punctuation signatures | → | Voice and tone → POV / tense / register |
| Pastiche anchor | → | Voice sample **and** Pastiche anchor |
| Anti-patterns | → | Anti-patterns |
| Idée fixe / motifs | → | Idiosyncrasies & obsessions |
| Themes | → | Themes |
| Genre & comps, default length | → | Genre and niche, Format and length |
| Content boundaries | → | Heat/content level, "What this book is not" |

The premise and characters remain book-specific — the persona supplies *how*, the user (or autonomous generation) supplies *what*.

## Autonomous mode (write a whole book unattended)

This is what makes the persona able to produce a book end-to-end. It works by **replacing book-writer's human checkpoints with automated self-review** — using exactly the QC mechanisms book-writer already defines (voice ledger, anchor comparison, the adversarial fresh-eyes pass, word-count balance).

Set expectations honestly in the skill: autonomous mode yields a **complete, consistent draft**, not a guaranteed publishable masterpiece. The human checkpoints exist because calibration drift is real; automation mitigates it but doesn't equal a human read. Recommend a human pass before publishing.

The autonomous loop:

1. **Premise.** Use the user's, or generate one in the persona's thematic territory and state it back before proceeding.
2. **Phase 1–2 (spec + plot).** Seed book-spec from the profile. Build outline, characters, continuity ledger per book-writer. Self-check the outline against the persona's structural signatures (chapter rhythm, opening/ending habits, POV structure).
3. **Phase 3 (draft), per chapter:**
   - Load context per book-writer's checklist (incl. voice ledger + pastiche anchor).
   - Voice warm-up against the anchor.
   - Draft the chapter.
   - **Automated fresh-eyes pass:** re-read adversarially — "name the 3 lines that most read as AI or off-voice for this persona" — and fix. Best run as a *separate agent* so it doesn't inherit the drafting frame.
   - Update the voice ledger.
4. **Phase 4 (edit).** Run all four passes (continuity → prose/slop → dialogue → final) automatically. Apply the structural-tell and language-specific slop checks from `avoiding-ai-slop.md`.
5. **Phase 5 (publishing prep).** Compile the manuscript, generate blurb/keywords/cover-brief per book-writer.
6. **Report.** Summarize what was produced, the word-count balance, and **flag low-confidence spots** (chapters the fresh-eyes pass struggled with, voice-drift warnings) for optional human review.

Checkpoints to keep even in autonomous mode (cheap insurance):
- Confirm the premise before drafting the whole book.
- Surface the finished draft for sign-off before treating it as done.

If the user wants *fully* unattended (no confirmations), honor it, but say once that you'll do a single premise confirmation unless they decline — a wrong premise wastes the entire run.

## Keep it inheriting

Do not copy book-writer's phase guidance into the author skill. Reference it. The author skill should stay a thin voice layer so improvements to book-writer (new anti-slop patterns, better editing passes) propagate to every persona automatically.
