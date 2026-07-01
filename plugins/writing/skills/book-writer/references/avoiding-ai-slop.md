# Avoiding AI slop

This is the most-loaded reference in the skill. Read it once at the start of phase 3 and keep it in mind through phases 3 and 4. Most "AI-written" books read flat for one of the patterns below. Avoiding them is most of what separates "looks like AI" from "looks like a person who can write."

## The single biggest tell

**Generic atmospheric writing without concrete detail.** AI prose loves to describe a *quality* of a thing rather than the thing itself.

- "The room had a strange feeling about it." — generic
- "The room smelled faintly of vinegar, and the lamp on the desk was on even though it was noon." — concrete

Always reach for the specific. Even when the specific is invented, it has to be one specific. Not "she felt a sense of unease" — "her hand wouldn't quite hold still on the cup."

## Structural tells (the deeper layer)

The phrase list below catches surface slop. But a draft can avoid every banned word and still read unmistakably as AI, because the *shape* of the sentences and paragraphs gives it away. These structural habits are the harder, more important tells. Hunt them the same way you hunt phrases.

**The bow-tie ending.** This is one of the strongest tells. AI almost always ends a paragraph, a scene, or a chapter on a reflective summary sentence that ties a neat bow on what just happened.

- "Und in diesem Moment wusste sie, dass nichts mehr so sein würde wie zuvor."
- "Es war der Anfang von etwas, das sie noch nicht benennen konnte."
- "Vielleicht, dachte er, war das genau der Punkt gewesen."

A human writer far more often ends mid-motion, on a concrete action or an unfinished gesture, and trusts the reader to feel the weight. Cut the summarizing sentence and end on the beat before it. If the scene was doing its job, the meaning is already there; stating it deflates it.

**Negation-then-correction as a rhythm crutch.** "It wasn't X. It was Y." / "Nicht X, sondern Y." / "Es war kein Zufall — es war Absicht." One instance is fine; AI reaches for it constantly because it manufactures a sense of insight cheaply. When you see two or three in a chapter, that's the tell. Rewrite most of them as a plain positive statement: just say the Y.

**The rule of three.** AI loves the tricolon — three parallel items, three parallel clauses, three beats to a sentence. "Sie war müde, hungrig und allein." "Er kam, sah und verlor." Real prose is lopsided: sometimes two, sometimes five, sometimes one blunt thing. When three parallel items appear, ask whether the third is earning its place or just completing a rhythm. Often cutting to two, or padding to four, breaks the machine cadence.

**Over-balance and symmetry.** AI paragraphs tend to be the same size and the same internal shape — setup, development, a closing reflective beat — repeated down the page like floor tiles. Real chapters are uneven: a three-page paragraph next to a four-word one. Vary paragraph length deliberately. If every paragraph on a page is four to six lines, that uniformity alone reads as generated.

**Em-dash inflation.** AI overuses the em-dash (—) as an all-purpose pause for asides, emphasis, and afterthoughts. A page peppered with em-dashes is a tell. Keep them rare and deliberate; convert most to a full stop, a comma, or parentheses, and vary which.

**The "the X of Y" abstraction stack.** "the weight of her decision", "the silence of the empty house", "the cost of his loyalty" / "das Gewicht ihrer Entscheidung", "die Stille des leeren Hauses" — genitive abstractions that sound profound and say little. One can land. Stacked, they're filler. Prefer the concrete thing over the abstraction-of-a-thing.

When you spot any of these, the fix is rarely a word swap — re-think the thought, don't just trade the word (see the editing note at the end of this file).

## Phrases and constructions to cut on sight

These show up so often in LLM prose that readers spot them immediately. Some of them are perfectly good English in isolation; the problem is the cumulative density. Cut every one you see unless it's truly the right word.

**Tells most readers now recognise as AI:**

- "It's not just X — it's Y" / "It's not merely X, but Y"
- "Navigate the complexities of..."
- "In a world where..."
- "Tapestry" (almost any usage)
- "Delve into..."
- "Embark on a journey..."
- "Testament to..."
- "Stark contrast" / "stark reminder"
- "Bustling" (city, market, street)
- "Whispered through" (the wind, the leaves, the rumour)
- "A symphony of..." (sights, sounds, anything)
- "A tale as old as time"
- "Ever-evolving" / "ever-changing landscape"
- "At the heart of..."
- "Resonates deeply"
- "Speaks volumes"

**Empty intensifiers:**

- "Truly", "really", "absolutely", "completely", "utterly" — almost always cuttable
- "Very", "quite", "rather" — almost always cuttable

**Stage-direction adverbs:**

- "Slowly", "carefully", "gently", "softly" — usually weakening a strong verb. "She slowly opened the door" → "She eased the door open."

**Telling-the-mood-of-the-scene phrases:**

- "An eerie silence fell"
- "Tension filled the air"
- "Time seemed to stand still"
- "A chill ran down her spine"

These don't render the moment; they label it. Render it instead.

## Working in a language other than English

**The phrase list above is English. AI slop is language-specific, and so are its tells.** A book in German, French, or Spanish has its own catalogue of generated-prose habits, and the English list will not catch them. When the book is not in English:

1. At the start of phase 3, create a **language-specific slop list** in `notes.md` (heading: "Slop-Liste <Sprache>"). Seed it from the starter list below if the language is German; otherwise build it from what you notice.
2. Add to it whenever a phrase recurs across chapters and feels generated. The list is a living artifact — the user will recognise their own language's tells faster than you will, so invite them to add to it.
3. In phase 4, pass 2, scan against *this* list as well as the structural tells above.

### German starter list (Deutsch)

These are the German equivalents of the English tells — high-frequency in generated German prose. Cut on sight unless truly the right word.

**Filterkonstruktionen (the German "filter word" problem — distancing the reader):**

- "Sie spürte, wie ..." / "Er fühlte, wie ..." → render the thing directly. *"Sie spürte, wie ihr Herz schneller schlug"* → *"Ihr Herz schlug schneller."*
- "Ein Gefühl von ... überkam sie" / "stieg in ihr auf"
- "Sie bemerkte, dass ..." / "Ihr wurde bewusst, dass ..." / "Sie konnte nicht anders, als ..."

**Stimmungs-Etiketten (labelling the mood instead of rendering it):**

- "Eine unheimliche Stille legte sich über ..."
- "Die Anspannung lag in der Luft" / "war zum Greifen nah"
- "Ein kalter Schauer lief ihr über den Rücken"
- "Die Zeit schien stillzustehen"

**Füllwörter und Weichmacher (empty intensifiers / hedges — almost always cuttable):**

- "irgendwie", "regelrecht", "förmlich", "geradezu", "ein Stück weit"
- "ein Hauch von ...", "eine gewisse ...", "so etwas wie ..."
- "natürlich", "selbstverständlich", "letztendlich", "im Grunde"

**Übergangskitt (mechanical connectives that pad sentences):**

- "dennoch", "nichtsdestotrotz", "gleichwohl", "indes", "dabei" (as filler)
- Sentence-initial "Dabei ...", "Doch dann ...", "Und so ..." used as automatic glue

**Nominalstil (the Latinate-register problem in German — noun-heavy, verb-starved):**

- "unter Aufbietung aller Kräfte" → *"sie riss sich zusammen"*
- "in Anbetracht der Tatsache, dass ..." → *"weil ..."*
- "zur Durchführung bringen", "in Erfahrung bringen", "Verwendung finden" → use the plain verb (*durchführen, herausfinden, benutzen*)
- Default to a strong verb over a noun-plus-helper-verb construction.

**Dialog-Register (everyone speaks textbook written German):**

- Generated German dialogue is grammatically complete, fully articulated, and far too written. Real speech contracts ("ich hab", "kann's", "is' gut"), uses particles (*ja, halt, eben, doch, mal, schon*), breaks off, and answers a different question than was asked. Strip the schoolbook grammar out of spoken lines.
- "Es ist nicht nur ..., sondern ..." is as much an AI tell in German as in English. So is "in einer Welt, in der ...".

Keep the structural tells in mind too — the **bow-tie ending** and the **negation-then-correction** crutch are if anything *more* common in German generated prose than in English.

## Sentence rhythm

LLM prose tends to converge on a uniform sentence length — usually medium-long and grammatically complete. Real prose varies. Short sentences land. Long sentences do work that short ones can't, building a thought across clauses, but they need company. After three sentences of similar length, vary.

Two specific habits:

- **One-line paragraphs are allowed.** Sometimes a single beat needs its own line. AI prose underuses this.
- **Sentence fragments are allowed.** Especially in close third or first POV. Real thought isn't always sentence-complete.

## Dialogue

The AI tells:

- Every character is articulate, sentence-complete, on-topic
- Dialogue tags are mostly "said" and "asked," but with adverbs ("said angrily")
- Characters explain their feelings to each other in clean paragraphs

The fix:

- Some characters interrupt, repeat themselves, trail off. Use ellipses, em-dashes, fragments
- Replace tags with action beats: "She closed the laptop. 'I quit.'"
- Characters often don't say what they mean. Subtext is dialogue's job.
- If two people in a scene argue and end the scene having understood each other's positions cleanly, the scene is too tidy. Real arguments leave residue.

## Description

The AI defaults:

- Adjectives stack up ("a tall, dark, handsome man")
- Setting gets atmospheric paragraphs that don't connect to the scene's action
- Faces are described in feature-by-feature inventories

The fix:

- One vivid detail beats five generic ones. "His left ear had a notch in it where someone had bitten through the cartilage" tells you more than three paragraphs of physical description.
- Description should serve the POV character's attention. What does the protagonist *notice*? That's what gets described, and the noticing tells you about the protagonist.
- For setting: pick details that double as mood. A flickering corridor light tells you "horror" faster than three sentences calling it creepy.
- **Vary the sense.** AI describes almost everything through the eyes — what things look like. People live in five senses. Smell is the most memory-laden and the least used; sound, temperature, texture, the body's own discomfort (a full bladder, a stone in the shoe, sweat at the hairline) ground a scene more than another visual ever will. When a paragraph is all sight, swap one detail to a different channel.

## Emotion

The AI default: state the emotion. "She was furious." "He felt deeply sad."

The fix: emotion is a body. Render the body.

- Anger: jaw, hands, breath, voice volume, a sudden interest in something neutral to look at
- Sadness: weight, depth of breath, slowed movement, eyes that drift
- Fear: peripheral awareness, time dilation, dry mouth, cold hands
- Joy: lightness, looser jaw, eye crinkle, quicker speech

Pick *one* physical signal and use it. Don't pile up four. One specific signal beats four generic ones.

The character sheets should record each character's signature emotional tells (the calm one whose calm becomes a tell when she stops blinking; the loud one who goes very quiet when actually upset). Dialogue and emotion get sharper when characters have idiosyncratic responses.

## Trust the reader — cut the gloss

AI distrusts the reader. It shows something, then immediately explains what it showed:

- "Sie knallte die Tür. Sie war wütend." — the second sentence undoes the first.
- "He left without a word. It was clear he was hurt." — the gloss tells the reader what they already felt.
- "She didn't answer, which meant she had no answer." — explaining the silence kills it.

The pattern: a vivid shown beat, followed by a sentence that interprets it. The shown beat was working; the interpretation is the tell. **When a sentence explains the sentence before it, cut the explainer.** The reader is smarter than the gloss assumes, and the meaning they reach themselves lands harder than the one handed to them. This is the same instinct as the bow-tie ending, at sentence scale — resist the urge to make sure the reader "got it."

The exception is voice-driven narration where the gloss *is* the voice (a wry first-person narrator commenting on their own behaviour). There the interpretation is character, not redundancy. Everywhere else, cut it.

## Cliché openings to avoid

In short fiction and especially in AI fiction, certain openings are so overused they have to clear a high bar to work.

- A character waking up
- A character looking in a mirror and describing their reflection
- Weather, unless the weather is plot
- Someone driving / on a train, thinking about their life
- "Little did she know..." / "If only X had known..."
- A dream sequence
- A long flashback before the present-day plot has its own footing

These can all work — but they're the default LLM grab, so they almost always read as cliché unless the user specifically wants the convention.

Strong openings tend to: drop the reader in mid-action, make the situation slightly wrong in a way the reader can't immediately resolve, give a voice you immediately want to hear more of, or open on a vivid concrete image that becomes meaningful within the first scene.

## Formal register vs. story register

AI prose drifts toward formal register — Latinate verbs, passive constructions, abstract nouns. Story register prefers Anglo-Saxon roots, active verbs, concrete nouns.

- "She utilized the implement to extract the obstruction" — formal
- "She used the screwdriver to pry the splinter loose" — story

The fix is to read the prose aloud (or read it slowly enough to hear the rhythm). Latinate paragraphs feel stately and slow. That's fine for some scenes, deadly for most.

## What to do when you spot slop in your own draft

Don't try to fix everything in one pass. Phase 4 is built around this — pass 1 is continuity, pass 2 is prose, pass 3 is dialogue. Slop hunting belongs in pass 2.

When you do hunt:

1. Read each paragraph and ask: does it have *one* specific concrete detail? If not, add one or cut the paragraph.
2. Scan for the listed phrases above — and the language-specific slop list in `notes.md` if the book isn't in English.
3. Scan for the **structural tells**: bow-tie endings, negation-then-correction, rule-of-three, redundant gloss, em-dash inflation.
4. Read dialogue aloud. If it sounds like a press release, rewrite.
5. Look at sentence lengths. If three in a row are similar, vary one.

### Don't swap the word, re-think the thought

This is the rule the structural-tells section pointed to, and it's the difference between editing that works and editing that just relocates the slop. When you catch a generated phrase, the reflex is to find a synonym — *"stark contrast"* becomes *"krasser Gegensatz"*, *"a sense of unease"* becomes *"ein mulmiges Gefühl"*. That swaps one piece of slop for another, because the **thought** underneath was generic, not just the word.

Instead: delete the phrase and ask what the moment actually *is*. What are the two specific things in contrast? What is the body doing that reads as unease? Rebuild the line from the concrete answer. A word swap edits the surface; re-thinking the thought edits the thing that made it read as AI. If you can't say what the concrete version is, the sentence may have nothing under it — cut it.

### Compare against the anchor

When a passage feels off but you can't name why, hold it next to the **pastiche anchor** and the **comp titles** named in `book-spec.md`. Read a paragraph of the anchor, then your paragraph. The gap between them is usually the slop — the anchor commits to specifics and a real rhythm where the draft hedges and smooths. This comparison catches what a checklist can't.

Don't sand the prose down to nothing — over-edited prose has its own dead quality. Aim for "transparent and specific," not "perfect."

## A closing note

The user is writing the book. The skill helps. The voice on the page should be the user's voice, not an averaged-out LLM voice. When the user reads a chapter and says "this isn't how I'd say it" — that's the most important feedback in the whole project. Take it seriously. Adjust the voice sample in `book-spec.md` and recalibrate.
