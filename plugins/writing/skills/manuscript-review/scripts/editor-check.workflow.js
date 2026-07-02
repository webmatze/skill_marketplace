export const meta = {
  name: 'editor-check',
  description: 'Reviews a manuscript against the fiction-editing principles of Stephen King\'s first editor (show-dont-tell, backstory, visualization, pull, character necessity, sympathy, empathy)',
  whenToUse: 'When a manuscript should be checked for craft (not continuity): info-dumps, telling-not-showing, weak visualization, sagging pull, superfluous characters, unlikable/perfect protagonist, missing empathy',
  phases: [
    { title: 'Chapter diagnosis', detail: 'per chapter: backstory, show-dont-tell, visualization, pull, prose vanity' },
    { title: 'Manuscript level', detail: 'character necessity, protagonist, people/memorability, pull/empathy' },
    { title: 'Synthesize', detail: 'deduplicate, prioritize, report' },
  ],
}

// --- args contract (passed via the Workflow tool's `args`) ---
//   dir:        absolute path to the chapters directory
//   chapters:   [{ n:<number>, file:'<filename relative to dir>' }, ...]
//   manuscript: absolute path to the compiled single-file manuscript (for manuscript-level dimensions)
//   charDir:    optional absolute path to a characters/ directory
//   language:   manuscript language, e.g. 'German'
//   context:    optional one-paragraph note on genre/premise/intent
const A = typeof args === 'string' ? JSON.parse(args) : args
if (!A || !A.dir || !Array.isArray(A.chapters) || !A.chapters.length || !A.manuscript) {
  throw new Error('editor-check requires args { dir, chapters:[{n,file}], manuscript, charDir?, language?, context? }; got ' + (typeof args) + ': ' + JSON.stringify(args))
}
const DIR = A.dir
const CHAPTERS = A.chapters
const MANUSCRIPT = A.manuscript
const CHAR_DIR = A.charDir || null
const LANG = A.language || 'the manuscript language'
const CONTEXT = A.context || 'No special context provided.'

const PRINCIPLES_PER_CHAPTER = `
- BACKSTORY: backstory is woven in gradually, not dumped up front. Flag info-dumps / explanatory paragraphs that halt the flow.
- SHOW-DONT-TELL: the story unfolds in scenes like a good movie, not in summary narration. Flag spots that assert a feeling/fact ("he was angry", "it was eerie") instead of showing it.
- VISUALIZATION: the reader can picture every scene (spatial/sensory clarity). Flag scenes that stay unclear: where do figures stand, what does the place look like, what is concretely visible.
- PULL: the chapter holds the reader. Early in the book the pull must be especially strong. Flag sags, long-winded passages, drops in tension.
- PROSE VANITY: story over showing off craft. Flag over-written / self-admiring passages where language seems more important than story/clarity.
`

const PER_CHAPTER_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    chapter: { type: 'number' },
    title: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          principle: { type: 'string', enum: ['backstory', 'show-dont-tell', 'visualization', 'pull', 'prose-vanity'] },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          location: { type: 'string', description: 'verbatim quote or exact spot' },
          issue: { type: 'string' },
          suggestion: { type: 'string' },
        },
        required: ['principle', 'severity', 'location', 'issue'],
      },
    },
    strengths: { type: 'array', items: { type: 'string' } },
  },
  required: ['chapter', 'title', 'findings'],
}

const MANUSCRIPT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    dimension: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          principle: { type: 'string' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          entity: { type: 'string' },
          issue: { type: 'string' },
          evidence: { type: 'array', items: { type: 'string' }, description: 'chapter + quote' },
          suggestion: { type: 'string' },
        },
        required: ['principle', 'severity', 'issue'],
      },
    },
    assessment: { type: 'string' },
  },
  required: ['dimension', 'findings', 'assessment'],
}

const SYNTH_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    topIssues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          principle: { type: 'string' },
          title: { type: 'string' },
          chapters: { type: 'array', items: { type: 'number' } },
          description: { type: 'string' },
          evidence: { type: 'array', items: { type: 'string' } },
          suggestion: { type: 'string' },
        },
        required: ['severity', 'principle', 'title', 'description'],
      },
    },
    strengths: { type: 'array', items: { type: 'string' } },
  },
  required: ['summary', 'topIssues'],
}

// --- Phase 1: Chapter diagnosis ---
phase('Chapter diagnosis')
const chapterReviews = await parallel(
  CHAPTERS.map((c) => () =>
    agent(
      `You are an experienced fiction editor in the tradition of Stephen King's first editor. Read ${DIR}/${c.file} (chapter ${c.n}) in full.\n\n` +
        `Manuscript language: ${LANG}. Quote verbatim in that language.\n\n` +
        `Check the chapter against these craft principles:\n` +
        PRINCIPLES_PER_CHAPTER +
        `\nStory context (deliberate atmosphere/ambiguity is WANTED — do not flag it):\n${CONTEXT}\n\n` +
        `A finding is only something that genuinely violates a principle (an explain-dump, an asserted-not-shown feeling, a spatially unclear scene, a tension sag, a self-indulgent over-written spot). Be precise: quote verbatim, give a concrete suggestion. Also name 1-3 craft strengths. If the chapter is clean, return an empty findings list — invent nothing.`,
      { label: `chapter:C${c.n}`, phase: 'Chapter diagnosis', schema: PER_CHAPTER_SCHEMA }
    )
  )
)
const chapters = chapterReviews.filter(Boolean).sort((a, b) => a.chapter - b.chapter)
log(`${chapters.length}/${CHAPTERS.length} chapters diagnosed`)

// --- Phase 2: Manuscript level ---
phase('Manuscript level')
const charNote = CHAR_DIR ? ` You may also read character notes under ${CHAR_DIR}/ if helpful.` : ''
const DIMENSIONS = [
  {
    key: 'character-necessity',
    label: 'Character necessity',
    focus:
      `Principle: "Every character needs a reason to be there. If there's no good reason, cut them."\n` +
      `List ALL named characters with their narrative function. Flag characters with no clear reason to exist, redundant ones, or ones that could be cut/merged. Note: in an ensemble, minor characters may legitimately exist as texture/evidence — flag only genuinely functionless ones.`,
  },
  {
    key: 'protagonist',
    label: 'Protagonist (likable, not perfect)',
    focus:
      `Principles: "The protagonist should not be perfect, but likable." + "The most important trait of a writer is empathy."\n` +
      `Assess the protagonist (and POV side characters): likable AND drawn with real flaws/edges (not idealized)? Do they become too perfect/heroic? Do their flaws make them human? Cite chapter + quote.`,
  },
  {
    key: 'people-memorability',
    label: 'People at the center & memorability',
    focus:
      `Principles: "Novels are about people — settings/events are only backdrop for human drama." + "Great novels make the reader miss the characters afterwards."\n` +
      `Assess: are the people (their relationships, fears, wants) at the center, or does the premise/concept dominate? Are the main characters vivid enough to be missed after reading? Where is character neglected in favor of atmosphere/concept? Cite.`,
  },
  {
    key: 'pull-empathy',
    label: 'Reader pull & emotional impact',
    focus:
      `Principles: "Let the novel unfold like a good movie." + "New authors must work harder early to hold attention." + empathy.\n` +
      `Assess across the whole arc: where does it pull strongly, where does the pull sag (especially opening and middle)? Does the emotional core work? Does the ending earn real feeling? Name concrete chapters with pace/emotion problems.`,
  },
]
const manuscriptReviews = await parallel(
  DIMENSIONS.map((d) => () =>
    agent(
      `You are an experienced fiction editor. Read the entire manuscript: ${MANUSCRIPT}.${charNote}\n\n` +
        `Manuscript language: ${LANG}. Story context:\n${CONTEXT}\n\n` +
        `Review the book on the dimension "${d.label}":\n` +
        d.focus +
        `\n\nAssess fairly against the principle, not against personal taste. Back every finding with chapter + verbatim quote (in ${LANG}). Also give a short overall assessment of the dimension.`,
      { label: `manuscript:${d.key}`, phase: 'Manuscript level', schema: MANUSCRIPT_SCHEMA }
    )
  )
)
const mReviews = manuscriptReviews.filter(Boolean)
log(`${mReviews.length}/${DIMENSIONS.length} manuscript dimensions reviewed`)

// --- Phase 3: Synthesize ---
phase('Synthesize')
const synthesis = await agent(
  `You are the lead editor merging two finding sets that check a book against the fiction-editing principles of Stephen King's first editor.\n\n` +
    `CHAPTER FINDINGS (JSON):\n` + JSON.stringify(chapters) +
    `\n\nMANUSCRIPT FINDINGS (JSON):\n` + JSON.stringify(mReviews) +
    `\n\nManuscript language: ${LANG}. Story context (NOT errors):\n${CONTEXT}\n\n` +
    `Task:\n` +
    `1. Deduplicate and bundle findings about the same problem (across chapters/dimensions).\n` +
    `2. Discard pseudo-findings: deliberate atmosphere, ambiguity and dense prose are NOT errors.\n` +
    `3. Prioritize the genuinely actionable points (topIssues), sorted by severity, each with a concrete suggestion and evidence.\n` +
    `4. Summarize the book's recurring craft strengths.\n` +
    `Output a concise overall assessment (summary), the prioritized list (topIssues) and the strengths, in ${LANG}.`,
  { label: 'synthesis', phase: 'Synthesize', schema: SYNTH_SCHEMA }
)

return { chapters, manuscript: mReviews, synthesis }
