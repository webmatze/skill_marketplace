---
name: book-writer
description: Write full-length books (novels, novellas, non-fiction) end-to-end as a structured, file-based project. Use this skill whenever the user wants to write, draft, plot, outline, edit, or publish a book of any length, even when they don't say the word "skill" — phrases like "help me write a novel", "I want to write a book about X", "let's plot a story", "draft chapter 3", "polish my manuscript", "prep this for KDP/Kindle", or "make a cover brief" should all trigger it. Covers the full workflow from niche selection through plotting, chapter-by-chapter drafting, editing, cover briefing, and Kindle/KDP publishing prep. Works for fiction and non-fiction in any language (the user's writing language is preserved; only the skill's instructions are in English).
---

# Book Writer

A structured, file-based workflow for writing a full book inside Claude Code. Each book lives in its own directory. State is kept on disk so context never has to hold the whole manuscript at once — load only what the current step needs.

## Core principle

**The book is files, not a chat.** Every artifact (spec, outline, character sheet, chapter, blurb) is a markdown file in the project directory. Claude works on one phase at a time, reading only the files it needs. This is how you write 60,000+ words without the context window collapsing.

## Project structure

When starting a new book, create this layout (replace `<book-slug>` with a kebab-case slug derived from the working title):

```
<book-slug>/
├── book-spec.md          # Premise, themes, audience, tone, voice — the constitution
├── outline.md            # Chapter-by-chapter beats
├── characters/
│   ├── <name>.md         # One file per significant character
│   └── ...
├── world.md              # (Fiction) Setting, rules, atmosphere — only if needed
├── research.md           # (Non-fiction) Sources, facts, references
├── chapters/
│   ├── 01-<slug>.md
│   ├── 02-<slug>.md
│   └── ...
├── manuscript.md         # Compiled output — generated, not hand-edited
├── blurb.md              # Back-cover / Amazon description
├── cover-brief.md        # Brief for cover designer / image generator
├── keywords.md           # KDP keywords + categories
└── notes.md              # Open questions, todos, scratch
```

Don't create empty placeholder files. Create each file when its phase begins.

## The workflow

The book moves through six phases. Each phase has a dedicated reference file in `references/` — load it when entering that phase, not before. Don't try to keep all phase guidance in context at once.

| Phase | Goal | Reference to load | Output files |
|---|---|---|---|
| 1. Niche & premise | Pick a market and a hook that fits it | `references/01-niche-and-premise.md` | `book-spec.md` (draft) |
| 2. Plotting | Outline the whole book before writing prose | `references/02-plotting.md` | `outline.md`, `characters/*.md`, `world.md` |
| 3. Drafting | Write chapter by chapter | `references/03-writing-chapters.md` | `chapters/NN-*.md` |
| 4. Editing | Continuity → prose → dialogue → final pass | `references/04-editing.md` | edits applied to chapters |
| 5. Publishing prep | Blurb, cover brief, keywords, manuscript compile | `references/05-publishing-prep.md` | `blurb.md`, `cover-brief.md`, `keywords.md`, `manuscript.md` |
| 6. Quality control | Anti-AI-slop pass + final polish | `references/avoiding-ai-slop.md` | revisions across chapters |

Phase 6 is not a sequential step — it's a lens you apply during phases 3 and 4. Read it once early so you know what to avoid while drafting.

## How to start a session

When the user asks to start or continue a book, do this in order:

1. **Locate the project.** If a `book-spec.md` exists in the working directory or a subdirectory, treat that as the project. Otherwise ask the user where to create it (or propose `./<book-slug>/`).

2. **Read the spec first.** Every session begins by reading `book-spec.md` if it exists. This is the book's constitution — voice, tone, audience, themes. Everything else flows from it.

3. **Identify the current phase.** Look at which files exist:
   - No `book-spec.md` → phase 1
   - Spec but no `outline.md` → phase 2
   - Outline but `chapters/` is empty or partial → phase 3
   - All chapters drafted → phase 4
   - Edits done → phase 5

4. **Load only the relevant reference.** Don't preload all six. Read the one for the current phase, do the work, move on.

5. **Confirm scope before writing.** Especially before drafting a chapter, restate what you're about to do and roughly how long it will be, so the user can redirect cheaply.

## Working language

The book is written in whatever language the user uses with you. If they're writing in German, all prose, character names, dialogue, the spec, the outline, and the blurb stay in German. The skill's instructions and file names stay in English so the skill keeps triggering reliably; the *content* of the files is the user's language.

When starting phase 1, ask explicitly: "In which language are we writing this book?" if it's not already obvious.

## Length targets

Use these as defaults; the user may override.

| Format | Word count | Chapters | Per chapter |
|---|---|---|---|
| Short story | 5,000–10,000 | 1–3 | 3,000–5,000 |
| Novella | 20,000–40,000 | 10–20 | ~2,000 |
| Novel | 60,000–90,000 | 25–40 | ~2,500 |
| Non-fiction | 30,000–60,000 | 8–15 | ~3,500 |

Faster Kindle-style genre fiction (the kind the source video targets) tends to sit at the novella end: 25,000–35,000 words across 20–25 short chapters. Don't push for novel length unless the user wants it.

## The compile step

Once chapters are drafted, run the compile script to assemble `manuscript.md`:

```bash
python scripts/compile_manuscript.py <book-slug>/
```

It concatenates `chapters/*.md` in numeric order, prepends a title page from `book-spec.md`, and writes `<book-slug>/manuscript.md`. Pass `--docx` to also produce a Word document (requires `pandoc`), or `--epub` for EPUB. The compiled file is regenerable — never edit `manuscript.md` directly; edit the chapter files and recompile.

The script also reports word counts per chapter and total, which is the easiest way to spot pacing issues (a 700-word chapter sandwiched between two 3,000-word ones usually wants attention).

## What this skill does not do

- **Generate cover images.** The cover *brief* is created here; the actual image is made elsewhere (Midjourney, Nano Banana, Canva, a human designer). The brief is structured so any of those work.
- **Upload to KDP.** The skill prepares the manuscript, blurb, keywords, and categories. The actual KDP submission happens in the Amazon dashboard.
- **Replace the writer's judgment.** Even with a strong spec, the user is the final eye on voice, plausibility, and what's funny vs. what's flat. Surface choices, don't bury them.

## Reference files

- `references/01-niche-and-premise.md` — Phase 1 details
- `references/02-plotting.md` — Phase 2 details, including the beat sheet and character sheet structure
- `references/03-writing-chapters.md` — Phase 3 details, including the "what to load before each chapter" checklist
- `references/04-editing.md` — Phase 4 multi-pass editing protocol
- `references/05-publishing-prep.md` — Phase 5 (blurb formula, KDP keywords, categories, cover brief structure)
- `references/avoiding-ai-slop.md` — The single most-loaded reference; concrete patterns to avoid and concrete patterns to prefer

## Asset templates

- `assets/book-spec-template.md` — Skeleton for `book-spec.md`
- `assets/outline-template.md` — Beat-sheet skeleton
- `assets/character-template.md` — Per-character sheet
- `assets/chapter-template.md` — Per-chapter scaffold (POV, goal, conflict, outcome, beat list)
- `assets/cover-brief-template.md` — Designer-ready brief
- `assets/blurb-template.md` — Back-cover / Amazon description structure

Copy a template into the project and fill it in; don't just point the user at it.
