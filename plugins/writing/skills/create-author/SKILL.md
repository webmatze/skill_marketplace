---
name: create-author
description: Create a reusable "author persona" skill that writes books in a specific author's style by driving the book-writer skill. Use whenever the user wants to capture or clone a writing voice into something reusable — phrases like "create an author skill for X", "make a persona that writes like Stephen King", "build an author profile from these samples", "I want a skill that writes in my voice", or "set up an author so I can generate books in their style" should trigger it. Produces an author-profile and a thin author skill that hands off to book-writer for the actual writing. Works for fiction and non-fiction in any language; the writing language is preserved.
---

# Create Author

A generator that turns a writing voice into a reusable **author persona skill**. The persona doesn't reimplement book-writing — it captures *voice* and then drives the existing [`book-writer`](../book-writer/SKILL.md) skill, which remains the engine for plotting, drafting, editing, and publishing prep.

## The mental model

```
create-author       →  produces  →  author-<name>/ (a new skill: SKILL.md + author-profile.md)
author-<name>        →  seeds     →  book-spec.md (voice layer pre-filled)
book-writer          →  runs      →  the actual book (phases 1–6)
```

An author skill is a **pre-filled voice layer**, nothing more. Everything `book-writer`'s `book-spec.md` asks for at the voice level — voice sample, pastiche anchor, anti-patterns, obsessions, themes, comps, length defaults — the author profile supplies up front. `book-writer` does the rest unchanged.

## Before anything: the legal/ethical gate

If the requested persona is a **real, identifiable author**, state this once, plainly, and proceed under the constraint — don't refuse, but don't skip it:

- Writing *in the style of* a real author is a legitimate craft exercise (pastiche, homage, practice). Style itself isn't copyrightable.
- **Do not** reproduce verbatim copyrighted prose (so the pastiche anchor is an *original imitation*, never a pasted excerpt), and **do not** publish the resulting book under or implying the real author's name (impersonation; violates KDP/Amazon policy).
- The clean outputs: publish original work under the user's own or a fictional name, optionally crediting inspiration as homage; or use the persona purely privately.

Record the choice in the profile's "Usage & status" section. Then continue.

## Inputs — how the voice gets captured

Work from whichever the user has, best first:

1. **The user's own writing samples** → a personal author-voice skill. Most authentic, zero IP friction.
2. **User-provided sample passages** of the target author → analyze these directly. More accurate than memory.
3. **Your knowledge of a well-known author** → characterize the style from what you know. Be concrete and honest about uncertainty; offer to refine once the user supplies a sample.

When samples are provided, read them closely before filling the profile. See `references/deriving-a-profile.md` for the analysis method (what to extract, how to characterize rather than copy).

## The workflow

1. **Identify the persona and reference type.** Name, language, real-author-vs-own-voice-vs-fictional. Apply the legal gate above.

2. **Gather/inspect style evidence.** Collect samples if available; otherwise work from knowledge. Read `references/deriving-a-profile.md`.

3. **Fill the author profile.** Create a new top-level skill directory `author-<author-slug>/` (a sibling of `book-writer` and `create-author` in the skills directory — see "Output layout"), copy `assets/author-profile-template.md` into it as `author-profile.md`, and complete every section — concretely. The **pastiche anchor must be an original imitation you write**, never copied prose. Vague profiles produce generic books; this file is where the quality is won or lost.

4. **Scaffold the author skill.** Create `author-<author-slug>/SKILL.md` from the pattern in `references/scaffolding-an-author-skill.md`. It must: trigger on the persona's name + book/story requests; load its `author-profile.md`; seed a `book-spec.md`; and hand off to `book-writer`. Include the optional **autonomous mode**.

5. **Confirm and (optionally) test.** Show the user the profile, especially the pastiche anchor and anti-patterns — those carry the voice. Offer a one-paragraph test in the voice before committing to a whole book.

## Output layout

```
skills/
  book-writer/          # the engine
  create-author/        # this generator
  author-<slug>/        # each generated persona — a TOP-LEVEL sibling
    SKILL.md            # the triggerable author persona
    author-profile.md   # the filled voice constitution
```

**Each author skill must be a top-level directory in `skills/`, named `author-<slug>/`** — a sibling of `book-writer` and `create-author`, not nested inside a parent folder. Skill discovery only finds `skills/*/SKILL.md` (depth 1); a persona nested one level deeper (e.g. `authors/<slug>/SKILL.md`) will not trigger. The sibling layout also makes the relative paths (`../book-writer/...`, `../create-author/...`) resolve at runtime. Keep these directories in version control — the running skills directory is machine-managed and may be re-extracted.

## What this skill does not do

- **Write the book.** That's `book-writer`, driven by the generated author skill.
- **Reproduce or launder copyrighted text.** Pastiche anchors are original imitations.
- **Bless publishing under a real author's name.** It builds private-reference or original-voice personas; the publishing decision and its constraints stay with the user.

## Reference files

- `references/deriving-a-profile.md` — how to analyze samples / knowledge into a profile; characterize-don't-copy; the legal framing in depth.
- `references/scaffolding-an-author-skill.md` — the author-skill SKILL.md pattern, the book-spec seeding step, and the autonomous-mode design.

## Asset templates

- `assets/author-profile-template.md` — the author voice constitution. Copy and fill; don't just point at it.
