# lernen

Bringt dir ein neues Thema oder einen Skill bei — über mehrere Sessions hinweg, im aktuellen Verzeichnis. Behandelt den Ordner als **Lern-Workspace**, in dem Fortschritt, Lektionen und Referenzen auf der Festplatte wachsen.

## Installation

```
/plugin marketplace add webmatze/skill_marketplace
/plugin install knowhow@webmatze-skills
/reload-plugins
```

## Auslösen

Anders als die Schreib-Skills wird `lernen` **nicht automatisch** ausgelöst (`disable-model-invocation: true`) — du startest ihn bewusst:

```
/lernen Was möchtest du lernen?
```

z. B. `/lernen Rust-Ownership` oder `/lernen Yoga für Anfänger`.

Am besten legst du pro Thema ein eigenes Verzeichnis an und startest den Skill dort — dieser Ordner wird dein Lern-Workspace.

## Wie es funktioniert

Der Skill hält den Lernfortschritt in Dateien fest:

| Datei / Ordner | Zweck |
|---|---|
| `MISSION.md` | Der *Grund*, warum du das Thema lernst — Basis aller Lehrentscheidungen |
| `RESOURCES.md` | Vertrauenswürdige Quellen zum Vertiefen/Validieren |
| `./lessons/*.html` | Einzelne, in sich geschlossene Lektionen (schön, druckbar, verkettet) |
| `./reference/*.html` | Verdichtete Cheat Sheets / Glossare zum schnellen Nachschlagen |
| `./learning-records/*.md` | Was du gelernt hast — Grundlage für die nächste Session |
| `./assets/*` | Wiederverwendbare Komponenten (Stylesheet, Quiz-Widgets …) |
| `NOTES.md` | Deine Präferenzen, wie du unterrichtet werden willst |

## Prinzipien

- **Mission zuerst.** Ist unklar, warum du lernst, fragt der Skill zuerst danach. Ohne Mission fühlen sich Lektionen abstrakt an.
- **Zone der nächsten Entwicklung.** Jede Lektion soll sich „gerade richtig" gefordert anfühlen — abgeleitet aus deinen Learning Records und der Mission.
- **Storage Strength statt Fluency.** Lektionen bauen über *desirable difficulty* (Retrieval Practice, Spacing, Interleaving) langfristiges Behalten auf, nicht nur kurzfristigen Abruf.
- **Vertrauenswürdige Quellen.** Wissen kommt aus belegten Quellen (in `RESOURCES.md`), nicht aus parametrischem Wissen. Beste Quelle schlägt Sprache — englische Top-Quellen werden `(EN)` markiert, Erklärungen bleiben deutsch.
- **Wissen → Fertigkeit → Weisheit.** Erst Wissen vermitteln, dann per Feedback-Schleife üben lassen, schließlich an eine reale Community zum Erproben verweisen.

## Fortsetzen

In einer späteren Session ins Workspace-Verzeichnis wechseln und `/lernen` erneut aufrufen (oder sagen, was du als Nächstes lernen willst). Der Skill liest `MISSION.md` + Learning Records und macht dort weiter, wo du warst.
