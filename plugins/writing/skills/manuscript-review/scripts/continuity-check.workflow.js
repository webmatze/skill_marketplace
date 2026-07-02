export const meta = {
  name: 'continuity-check',
  description: 'Checks every person, place, action, time and route of a manuscript across chapters for plausibility and contradictions',
  whenToUse: 'When a multi-chapter manuscript should be checked for continuity errors (attributes, presence, chronology, travel times, props)',
  phases: [
    { title: 'Extract', detail: 'per chapter: people / places / movements / time markers / props' },
    { title: 'Check', detail: 'four dimensions against the full fact base' },
    { title: 'Synthesize', detail: 'deduplicate, prioritize, report' },
  ],
}

// --- args contract (passed via the Workflow tool's `args`) ---
//   dir:      absolute path to the chapters directory
//   chapters: [{ n: <number>, file: '<filename relative to dir>' }, ...]
//   language: manuscript language, e.g. 'German' (agents quote & report in it)
//   context:  optional one-paragraph note on genre/premise so agents don't
//             flag intentional elements (supernatural, unreliable narrator, ...)
const A = typeof args === 'string' ? JSON.parse(args) : args
if (!A || !A.dir || !Array.isArray(A.chapters) || !A.chapters.length) {
  throw new Error('continuity-check requires args { dir, chapters:[{n,file}], language?, context? }; got ' + (typeof args) + ': ' + JSON.stringify(args))
}
const DIR = A.dir
const CHAPTERS = A.chapters
const LANG = A.language || 'the manuscript language'
const CONTEXT = A.context || 'No special context provided.'

const EXTRACT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    chapter: { type: 'number' },
    title: { type: 'string' },
    timeMarkers: {
      type: 'array',
      description: 'every time reference in the chapter',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          marker: { type: 'string', description: 'verbatim quote of the time reference' },
          kind: { type: 'string', enum: ['clock', 'daytime', 'relative', 'day', 'duration', 'season'] },
          note: { type: 'string', description: 'what it refers to / what happens then' },
        },
        required: ['marker', 'kind'],
      },
    },
    characters: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          attributes: { type: 'array', items: { type: 'string' }, description: 'clothing, possessions, physical traits, visible state' },
          state: { type: 'string', description: 'mental/physical overall state' },
          actions: { type: 'array', items: { type: 'string' }, description: 'what the person concretely does' },
        },
        required: ['name'],
      },
    },
    locations: { type: 'array', items: { type: 'string' } },
    movements: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          who: { type: 'string' },
          from: { type: 'string' },
          to: { type: 'string' },
          means: { type: 'string', description: 'on foot, bus, car, ...' },
          timing: { type: 'string', description: 'when / how long, if stated' },
        },
        required: ['who'],
      },
    },
    props: {
      type: 'array',
      description: 'important objects/animals and their state',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: { object: { type: 'string' }, state: { type: 'string' } },
        required: ['object'],
      },
    },
  },
  required: ['chapter', 'title', 'characters'],
}

const FINDINGS_SCHEMA = {
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
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          type: { type: 'string' },
          chapters: { type: 'array', items: { type: 'number' } },
          entity: { type: 'string' },
          description: { type: 'string' },
          evidence: { type: 'array', items: { type: 'string' }, description: 'verbatim quotes per chapter' },
          suggestion: { type: 'string' },
        },
        required: ['severity', 'chapters', 'description'],
      },
    },
  },
  required: ['dimension', 'findings'],
}

const SYNTH_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          dimension: { type: 'string' },
          title: { type: 'string' },
          chapters: { type: 'array', items: { type: 'number' } },
          entity: { type: 'string' },
          description: { type: 'string' },
          evidence: { type: 'array', items: { type: 'string' } },
          suggestion: { type: 'string' },
          confidence: { type: 'string', enum: ['certain', 'likely', 'check'] },
        },
        required: ['severity', 'title', 'chapters', 'description'],
      },
    },
  },
  required: ['summary', 'issues'],
}

// --- Phase 1: Extract ---
phase('Extract')
const extractions = await parallel(
  CHAPTERS.map((c) => () =>
    agent(
      `You are a meticulous continuity editor. Read the file ${DIR}/${c.file} (chapter ${c.n}) in full.\n\n` +
        `Manuscript language: ${LANG}. Quote verbatim in that language.\n\n` +
        `Extract ONLY what the text actually states (no guesses, no inventions):\n` +
        `- timeMarkers: every time reference (clock times, times of day, relative like "three days ago", days, durations, season) and what it refers to.\n` +
        `- characters: every person present, with visible attributes (clothing, possessions/objects in hand, physical traits), their state (e.g. normal / changed / drunk / dead) and their concrete actions.\n` +
        `- locations: all settings.\n` +
        `- movements: every movement (who, from where, to where, by what means, and timing if stated).\n` +
        `- props: important objects and animals with their state (e.g. "the dog: with X / not with X", "sketchbook: in the trash", "cigarette: gone out").\n\n` +
        `Pay special attention to details that could later contradict: what someone wears/carries, whether an animal is present, who travels where, exact clock times and relative time gaps.`,
      { label: `extract:C${c.n}`, phase: 'Extract', schema: EXTRACT_SCHEMA }
    )
  )
)
const corpus = extractions.filter(Boolean).sort((a, b) => a.chapter - b.chapter)
log(`${corpus.length}/${CHAPTERS.length} chapters extracted`)
const corpusJson = JSON.stringify(corpus)

// --- Phase 2: Check (each dimension sees the full fact base) ---
phase('Check')
const DIMENSIONS = [
  {
    key: 'attributes',
    label: 'Character attributes & state',
    focus:
      `Check character attributes and states across chapters for contradictions:\n` +
      `- clothing/possessions/physical traits that change without motivation (e.g. hat in ch1, helmet in ch3).\n` +
      `- state logic: someone is "changed"/transformed then behaves as before without explanation; someone is dead then appears alive; age/physical condition doesn't add up.\n` +
      `- names/identities written inconsistently or confused.`,
  },
  {
    key: 'presence',
    label: 'Presence & location',
    focus:
      `Check presence and location across chapters:\n` +
      `- a person leaves in one chapter and is back in the next with no return shown.\n` +
      `- a person is in two places at once.\n` +
      `- an animal/object is somewhere that contradicts what was established earlier.\n` +
      `- a character is present although an earlier chapter said they were gone/dead.`,
  },
  {
    key: 'time',
    label: 'Time & route plausibility',
    focus:
      `Check chronology and spatial-temporal plausibility:\n` +
      `- relative time references ("three days ago", "since two days", "yesterday") must add up arithmetically across chapters.\n` +
      `- times of day / clock times must not contradict within a continuous sequence.\n` +
      `- routes: if someone walks or drives a distance, check whether the stated/implied duration is plausible and the order of stations is right.\n` +
      `- event order consistent across chapters (no effect before its cause).`,
  },
  {
    key: 'props',
    label: 'Props & object state',
    focus:
      `Check objects and animals for state continuity:\n` +
      `- an object is destroyed/discarded/used up and is later intact/present again without explanation.\n` +
      `- physical plausibility of a single scene (e.g. smoke rising from an extinguished cigarette).\n` +
      `- the description of a recurring object/landmark stays consistent.`,
  },
]
const reviews = await parallel(
  DIMENSIONS.map((d) => () =>
    agent(
      `You are a rigorous continuity editor. Here is the structured fact base of ALL chapters as JSON (extracted directly from the text):\n\n` +
        corpusJson +
        `\n\nManuscript language: ${LANG}. Story context (do NOT flag intentional elements described here as errors):\n${CONTEXT}\n\n` +
        `Your task (dimension: ${d.label}):\n` +
        d.focus +
        `\n\nReport only REAL contradictions provable from the fact base. An error is an unintended contradiction (logic, everyday physics, chronology, forgotten attributes) — NOT a deliberate device of the story. When in doubt, use low severity and explain why it might be intentional. Quote verbatim per affected chapter as evidence, in ${LANG}.`,
      { label: `check:${d.key}`, phase: 'Check', schema: FINDINGS_SCHEMA }
    )
  )
)
const allFindings = reviews
  .filter(Boolean)
  .flatMap((r) => (r.findings || []).map((f) => ({ ...f, dimension: r.dimension })))
log(`${allFindings.length} raw findings from ${reviews.filter(Boolean).length} dimensions`)

// --- Phase 3: Synthesize ---
phase('Synthesize')
const synthesis = await agent(
  `You are the lead editor. Here are raw findings from four continuity checks as JSON:\n\n` +
    JSON.stringify(allFindings) +
    `\n\nFull fact base of all chapters for cross-reference:\n\n` +
    corpusJson +
    `\n\nManuscript language: ${LANG}. Story context (these are NOT errors):\n${CONTEXT}\n\n` +
    `Task:\n` +
    `1. Deduplicate findings that concern the same contradiction (even across dimensions).\n` +
    `2. Discard pseudo-findings explained by the deliberate devices of the story.\n` +
    `3. Re-check each remaining finding critically against the fact base and assign a confidence (certain / likely / check).\n` +
    `4. Sort by severity (high first).\n` +
    `Output a short overall assessment (summary) and the cleaned, prioritized list (issues), quoting evidence in ${LANG}.`,
  { label: 'synthesis', phase: 'Synthesize', schema: SYNTH_SCHEMA }
)

return { corpus, synthesis }
