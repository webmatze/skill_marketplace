# Deriving an author profile

Goal of this step: turn evidence of a voice (samples, or your knowledge of an author) into a concrete, usable `author-profile.md`. The profile is only as good as the specificity you put in it — "varied sentences, vivid description" describes every competent writer and will produce a generic book.

## Characterize, don't copy

This is the core discipline, legal and craft both:

- **Never paste copyrighted prose** into the profile or the pastiche anchor. Describe the style in your own words, and write the pastiche anchor as an *original imitation*.
- Extract the *mechanics* — sentence shapes, diction level, structural habits — not the content. Mechanics aren't copyrightable; specific text is.
- A pastiche you wrote yourself is the better style model anyway: it isolates the rhythm and texture from any particular story, which is exactly what you want to transfer.

## What to extract from samples

When the user provides sample passages, read closely and pull out the *measurable* features. Work through these:

**Sentence mechanics**
- Typical length and how much it varies. Where do long sentences appear — tension, calm, interiority?
- Fragments? Run-ons? Comma splices? Parentheticals?
- Paragraph length and shape. Do paragraphs end on action or reflection?

**Diction**
- Anglo-Saxon and plain, or Latinate and ornate? Reading level?
- Profanity, slang, regionalisms, brand/pop-culture specificity, jargon.
- Favored and avoided words.

**Punctuation signature**
- Em-dashes, ellipses, italics for interiority, semicolons (used or never), how dialogue is tagged.

**Interiority & distance**
- How close is the narration to the character's head? How is thought rendered — italics, free indirect, stated?
- How is emotion handled — named, or rendered through body/action?

**Structure & pacing** (from a whole book or its description)
- Chapter length and rhythm; how chapters open and end; cliffhanger habits.
- Scene-vs-summary balance; how tension builds and releases.
- POV structure: single, multi, rotating, head-hopping.

**Thematic fingerprint**
- Recurring themes, settings, character types, obsessions, motifs.
- Tonal range: where it sits on dread, humor, sentimentality, irony.

**Dialogue**
- Realistic and fragmentary vs. stylized and quotable; subtext load; regional speech.

**Anti-patterns**
- What this author conspicuously never does. As defining as the habits.

## Working from knowledge (no samples)

If the persona is a well-known author and the user hasn't supplied samples:

- Characterize from what you reliably know, concretely, in your own words.
- Be honest about uncertainty — flag features you're inferring vs. confident about.
- Offer to refine once the user provides a sample passage; a single representative page sharpens the profile dramatically.
- Still write the pastiche anchor as your own imitation, not a remembered quote (memory of copyrighted text is still copyrighted text).

## Writing the pastiche anchor

The single most valuable field. Write 1–3 short original paragraphs that *sound like* the author writing some neutral, invented scene — not their actual content. Aim to reproduce the rhythm, diction, punctuation, and interiority you extracted above. Then sanity-check: if you read your anchor next to a real (uncopied) sense of the author's voice, does it ring true? If it reads generic, the profile will too — push it further toward the specific tics.

## Filling for `book-writer` compatibility

Several profile fields map straight into `book-writer`'s `book-spec.md`. Fill them so the seeding step (see `scaffolding-an-author-skill.md`) is mechanical:

- Profile **Voice DNA + pastiche anchor + anti-patterns + obsessions** → book-spec **Voice and tone** block.
- Profile **themes** → book-spec **Themes**.
- Profile **genre & comps + default length** → book-spec **Genre and niche** + **Format and length**.
- Profile **content boundaries** → book-spec **heat/content level** and the **"what this book is not"** section.

## Language

Write the profile's content (samples, anti-patterns, the pastiche anchor) in the **language the books will be written in** — German by default for this user unless they say otherwise. Only the structural headings stay English, matching the book-writer convention so triggering stays reliable.
