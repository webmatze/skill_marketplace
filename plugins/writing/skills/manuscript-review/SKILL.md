---
name: manuscript-review
description: Use when reviewing a finished or in-progress book manuscript for continuity errors or craft quality — phrases like "check my manuscript", "find continuity errors", "is my novel consistent", "editor pass", "prüf das Manuskript", "Kontinuitätsfehler finden". Works on any file-based book project (chapters/NN-slug.md). Two passes: continuity (people/places/time/props) and editor (show-dont-tell, backstory, character, pull). Pairs with the book-writer skill.
---

# Manuscript Review

Two multi-agent quality passes for a file-based book manuscript. Each pass fans out one agent per chapter, checks several dimensions in parallel, then synthesizes a deduplicated, prioritized report. Built to run on any book project, in any language.

- **continuity** — people, places, actions, time and routes checked across chapters for contradictions (attributes, presence, chronology, travel times, props).
- **editor** — craft check against the fiction-editing principles of Stephen King's first editor (show-don't-tell, woven backstory, visualization, reader pull, character necessity, likable-but-flawed protagonist, people at the center, empathy).

## When to use which

- Changed plot/characters/timeline, or prepping for publish → **continuity**.
- Want a craft / line-and-structure editorial read → **editor**.
- Unsure or doing a full QA sweep → **both**.

## How to run

The review logic lives in two Workflow scripts under this skill's `scripts/`. The workflow sandbox has **no filesystem access**, so you discover the chapters yourself and pass them in via `args`.

1. **Locate the project.** Find the chapters dir (usually `<book>/chapters/`) and the compiled single-file manuscript (usually `<book>/manuscript.md`; the editor pass needs it — compile first if missing).

2. **Discover chapters** (sorted by leading number), build the `chapters` array, and detect the language. Example:
   ```bash
   ls -1 <book>/chapters/*.md | sort
   ```
   Build `[{ n: 1, file: '01-....md' }, ...]` (skip non-chapter files like back-matter if desired).

3. **Run the pass(es)** via the Workflow tool, passing `args`:
   - Continuity: `Workflow({ scriptPath: "<thisSkill>/scripts/continuity-check.workflow.js", args: { dir, chapters, language, context } })`
   - Editor: `Workflow({ scriptPath: "<thisSkill>/scripts/editor-check.workflow.js", args: { dir, chapters, manuscript, charDir, language, context } })`
   - Both: run them (sequentially is fine).

   `args` fields: `dir` (abs path to chapters), `chapters` (the array), `manuscript` (abs path, editor only), `charDir` (optional, editor), `language` (e.g. `"German"`), `context` (one paragraph on genre/premise so agents don't flag **intentional** devices — supernatural elements, unreliable narrator, deliberate ambiguity — as errors).

4. **Read the returned `synthesis`** (`issues` for continuity, `topIssues`+`strengths` for editor).

## CRITICAL: verify before you change anything

The synthesis can contain **extraction artifacts** — false positives where an agent misread the text. Observed failure modes: a flashback in pluperfect tense flagged as a dead character "acting"; two characters conflated; a return route mistaken for a body's location; a prop count across weeks read as a contradiction.

**For every finding you intend to act on, open the cited chapter(s) and read the actual lines first.** Confirm the contradiction is real in the prose before editing. Many "high" findings dissolve on inspection. Treat the report as leads, not verdicts.

## What to do with verified findings

- **Continuity errors** that are real → fix surgically, then verify the diff touches only intended lines.
- **Editor findings**: mechanical polish (tell-labels, info-dumps, name clashes) can be applied directly; **structural** findings (thin characters, pacing, arc) are author decisions — present them, don't unilaterally rewrite prose.
- Distinguish **intentional devices** from errors. If the report flags something the story does on purpose, record it as defensible — don't "fix" it.
- After edits: recompile the manuscript and rebuild exports, then re-run the relevant pass as a final check.
- Write the outcome to a report file in the project (e.g. `continuity-report.md` / `editor-report.md`) so findings and decisions are tracked.

## Notes

- Each pass spawns ~27 agents (1/chapter + dimensions + synthesis) and is token-intensive; run when warranted.
- The scripts are self-contained; iterate by editing them and re-invoking with the same `scriptPath`.
- The editing principles come from an account of Stephen King's first editor; the editor pass encodes them as the four chapter-level and four manuscript-level dimensions.
