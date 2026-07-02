# book-writer

Schreibt vollständige Bücher (Romane, Novellen, Sachbücher) end-to-end als strukturiertes, dateibasiertes Projekt in Claude Code. Jedes Buch lebt in einem eigenen Verzeichnis; der Zustand liegt auf der Festplatte, damit der Kontext nie das ganze Manuskript halten muss.

## Installation

```
/plugin marketplace add webmatze/skill_marketplace
/plugin install writing@webmatze-skills
/reload-plugins
```

## Auslösen

Der Skill greift automatisch, sobald du übers Bücherschreiben sprichst — das Wort „Skill" ist nicht nötig. Beispiele:

- „Hilf mir, einen Roman über X zu schreiben"
- „Lass uns die Handlung plotten"
- „Schreib Kapitel 3"
- „Poliere mein Manuskript"
- „Bereite das für KDP/Kindle vor"
- „Mach ein Cover-Brief"

## Ablauf (6 Phasen)

| Phase | Ziel | Ergebnis-Dateien |
|---|---|---|
| 1. Nische & Prämisse | Markt + Haken finden | `book-spec.md` |
| 2. Plotting | Ganzes Buch vor dem Prosa-Schreiben skizzieren | `outline.md`, `characters/*.md`, `world.md` |
| 3. Drafting | Kapitel für Kapitel schreiben | `chapters/NN-*.md` |
| 4. Editing | Kontinuität → Prosa → Dialog → Schlusspass | Edits in Kapiteln |
| 5. Publishing-Prep | Blurb, Cover-Brief, Keywords, Manuskript kompilieren | `blurb.md`, `cover-brief.md`, `keywords.md`, `manuscript.md` |
| 6. Qualität | Anti-AI-Slop-Pass + Feinschliff | Revisionen |

Der Skill erkennt anhand vorhandener Dateien automatisch, in welcher Phase du steckst, und lädt nur die passende Referenz.

## Session starten

1. **Neues Buch:** Sag einfach, worüber. Der Skill schlägt ein Projektverzeichnis `./<book-slug>/` vor und beginnt Phase 1.
2. **Weiterarbeiten:** Wechsle ins Buchverzeichnis (das mit `book-spec.md`) und sag z. B. „weiter mit dem Buch" oder „schreib das nächste Kapitel".

## Manuskript kompilieren

```bash
python scripts/compile_manuscript.py <book-slug>/
```

Fügt `chapters/*.md` in numerischer Reihenfolge zusammen, hängt eine Titelseite an und schreibt `manuscript.md`. `--docx` (braucht `pandoc`) oder `--epub` für weitere Formate. **Nie** `manuscript.md` direkt bearbeiten — Kapitel ändern und neu kompilieren. Die Ausgabe meldet außerdem Wortzahlen pro Kapitel (gut für Pacing-Checks).

## Sprache

Das Buch entsteht in der Sprache, die du im Chat nutzt (Prosa, Namen, Spec, Outline, Blurb). Nur Dateinamen und Skill-Instruktionen bleiben englisch, damit der Skill zuverlässig auslöst.

## Was der Skill *nicht* macht

- **Keine Cover-Bilder** — erstellt nur das Cover-*Brief* (für Midjourney, Canva, Designer o. Ä.).
- **Kein KDP-Upload** — bereitet Manuskript/Blurb/Keywords vor; die Einreichung machst du im Amazon-Dashboard.
- **Ersetzt nicht dein Urteil** — Stimme, Plausibilität und Humor bleiben deine Entscheidung.

## Verwandt

- [`create-author`](../create-author/README.md) — erzeugt wiederverwendbare Autoren-Personas, die `book-writer` in einer bestimmten Stimme antreiben.
- [`manuscript-review`](../manuscript-review/README.md) — prüft ein fertiges oder in Arbeit befindliches Manuskript auf Kontinuitätsfehler und handwerkliche Qualität (Editing-Phase 4, Qualitäts-Phase 6).
