# Phase 2: Plotting

Goal of this phase: a chapter-by-chapter outline detailed enough that drafting becomes "expand the beats", plus character sheets and (for fiction) a world doc covering anything that needs to stay consistent.

The temptation in this phase is to keep refining until the outline is perfect. Don't. The outline is a working document — the draft will deviate, and that's fine. Aim for "specific enough to write from", not "exhaustive".

## Beat the book before chapter-by-chapter

Before listing chapters, sketch the macro shape. For most genre fiction, a four-act structure works:

1. **Setup** (~25%): introduce protagonist, world, status quo, inciting incident, the "door" the protagonist walks through
2. **Rising action — first half** (~25%): protagonist tries the obvious approach; it gets harder; midpoint reversal flips the situation
3. **Rising action — second half** (~25%): stakes escalate, false victory or false defeat, all-is-lost moment
4. **Resolution** (~25%): climax, denouement, aftermath

Non-fiction has its own structure (problem → framework → application → case studies → action) — see the bottom of this doc.

For each act, write 2–4 sentences. This is the "beat sheet" at the top of `outline.md`. If the four-act sketch doesn't hold together, fix it now. Restructuring later means rewriting.

## From beats to chapters

Once the four acts feel right, divide them into chapters. Use the length target from `book-spec.md` and divide:

- 30,000-word novella ÷ ~2,000 words/chapter = ~15 chapters
- 70,000-word novel ÷ ~2,500 words/chapter = ~28 chapters

For each chapter, write a one-paragraph beat covering:

- **Where we are** (location, timing relative to previous chapter)
- **POV** (if multi-POV)
- **What the POV character wants in this chapter** (scene goal)
- **What goes wrong / who opposes them** (conflict)
- **How the chapter ends** (outcome — usually one of: yes-but, no-and, twist, cliffhanger)
- **What changes** (so the chapter isn't just incident — something has to shift)

This is the unit of plotting. If a chapter doesn't have a goal, conflict, and change, it's filler. Cut it or merge it.

Use `assets/outline-template.md` as the skeleton.

## Characters

Create a sheet for every character who appears in more than one scene. For protagonists and antagonists, fill out the full sheet from `assets/character-template.md`. For minor recurring characters, a short version is fine (name, role, one defining trait, voice marker).

Each protagonist sheet should answer:

- **External goal**: what they're chasing in the plot
- **Internal want**: the emotional thing they think will fix them (often wrong)
- **Need**: the emotional thing they actually need to learn (the arc)
- **Flaw**: the part of them that resists the need
- **Voice markers**: 2–3 specific verbal habits, vocabulary tells, or sentence rhythms

The voice markers matter most. They're how the dialogue stays distinct between characters in phase 3. Without them, every character will start sounding like the narrator.

## World (fiction) or research (non-fiction)

For fiction, create `world.md` only if the setting needs rules — fantasy magic systems, sci-fi tech limits, period-specific customs, an invented town's geography. Skip it for contemporary realistic settings; just put any specifics in the chapter outline.

For non-fiction, create `research.md` listing sources, key statistics, quotations the user wants to include, and any expert interviews or anecdotes. The drafting phase will refer back to this; don't make Claude invent facts in chapter 5 that contradict the source list.

## Continuity ledger

Add a small section at the bottom of `outline.md` called "Continuity ledger." This is where you record details that get fixed in chapter 1 and have to stay consistent: physical descriptions, ages, the colour of the protagonist's car, a sister's name, a town's geography. Update it whenever a new fixed detail is introduced. The editing phase will use it to find inconsistencies.

## Non-fiction structure

Adapt the four-act shape to:

1. **Problem and reader's reality** — establish what the reader is struggling with and why current advice falls short
2. **Framework** — the central model or method the book teaches
3. **Application** — chapters that apply the framework to specific situations
4. **Action** — implementation guidance, common pitfalls, what to do tomorrow morning

Each chapter still needs a goal (what the reader will be able to do or believe by the end), conflict (a misconception or obstacle the chapter addresses), and change (what shifts in their understanding).

## Done when

- `outline.md` has a beat sheet at the top and one paragraph per chapter
- Every protagonist and antagonist has a full character sheet; minor recurring characters have a short one
- Continuity ledger exists (even if mostly empty)
- For fiction with invented worlds, `world.md` exists
- For non-fiction, `research.md` exists with at least the sources/facts the book leans on
- User has read the outline and either approved it or sent edits

Then move to phase 3.
