# create-author

Erzeugt eine wiederverwendbare **Autoren-Persona** als eigenen Skill, der Bücher in einer bestimmten Stimme schreibt — indem er den [`book-writer`](../book-writer/README.md)-Skill antreibt. Die Persona implementiert das Bücherschreiben nicht neu; sie liefert nur die vorgefüllte *Stimm-Schicht*.

## Installation

```
/plugin marketplace add webmatze/skill_marketplace
/plugin install writing@webmatze-skills
/reload-plugins
```

Setzt `book-writer` voraus (steckt im selben `writing`-Plugin — wird also mitinstalliert).

## Auslösen

Greift, sobald du eine Schreibstimme in etwas Wiederverwendbares gießen willst:

- „Erstell einen Autoren-Skill für X"
- „Mach eine Persona, die wie Stephen King schreibt"
- „Bau ein Autoren-Profil aus diesen Textproben"
- „Ich will einen Skill, der in meiner Stimme schreibt"

## Denkmodell

```
create-author   →  erzeugt   →  author-<name>/ (neuer Skill: SKILL.md + author-profile.md)
author-<name>   →  füllt vor →  book-spec.md (Stimm-Schicht)
book-writer     →  schreibt  →  das eigentliche Buch (Phasen 1–6)
```

## Stimme erfassen — beste Quelle zuerst

1. **Deine eigenen Textproben** → persönlicher Stimm-Skill. Am authentischsten, keine IP-Reibung.
2. **Bereitgestellte Passagen** eines Zielautors → werden direkt analysiert. Genauer als Erinnerung.
3. **Wissen über einen bekannten Autor** → Stil aus vorhandenem Wissen charakterisieren; Unsicherheit offenlegen, später mit Probe verfeinern.

## Ablauf

1. **Persona + Referenztyp klären** (Name, Sprache, echter Autor / eigene Stimme / fiktiv) — rechtlich-ethisches Gate anwenden (siehe unten).
2. **Stil-Evidenz sammeln/prüfen.**
3. **Autoren-Profil füllen** — neues Top-Level-Verzeichnis `author-<slug>/`, `author-profile.md` vollständig und *konkret* ausfüllen. Der Pastiche-Anker ist eine **selbst geschriebene Original-Imitation**, nie kopierte Prosa.
4. **Autoren-Skill scaffolden** — `author-<slug>/SKILL.md`, das auf den Namen triggert, das Profil lädt, `book-spec.md` seedet und an `book-writer` übergibt.
5. **Bestätigen & testen** — Profil zeigen (v. a. Pastiche-Anker + Anti-Patterns); optional ein Test-Absatz in der Stimme.

## Rechtlich-ethisches Gate (bei echten Autoren)

- Schreiben *im Stil von* ist legitim (Pastiche/Hommage) — Stil selbst ist nicht urheberrechtlich geschützt.
- **Keine** wörtliche Übernahme geschützter Prosa; **nicht** unter dem Namen des echten Autors veröffentlichen (Impersonation, verstößt gegen KDP/Amazon).
- Saubere Wege: Veröffentlichung unter eigenem/fiktivem Namen (optional Hommage-Credit) oder rein private Nutzung.

## Wichtig zum Output-Layout

Jeder Autoren-Skill muss ein **Top-Level-Verzeichnis** `author-<slug>/` sein (Geschwister von `book-writer`/`create-author`), nicht verschachtelt — Skill-Discovery findet nur `skills/*/SKILL.md` (Tiefe 1). Verzeichnisse in die Versionskontrolle aufnehmen.

## Was der Skill *nicht* macht

- **Schreibt nicht das Buch** — das macht `book-writer`, angetrieben von der Persona.
- **Wäscht keinen geschützten Text** — Pastiche-Anker sind Original-Imitationen.
- **Segnet keine Veröffentlichung unter echtem Autornamen ab.**
