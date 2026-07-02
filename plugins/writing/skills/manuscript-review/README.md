# manuscript-review

Zwei Multi-Agent-Qualitätspässe für ein dateibasiertes Buchmanuskript. Jeder Pass fächert einen Agenten pro Kapitel auf, prüft mehrere Dimensionen parallel und fasst dann einen deduplizierten, priorisierten Report zusammen. Läuft auf jedem Buchprojekt in beliebiger Sprache — pairt mit dem [`book-writer`](../book-writer/README.md)-Skill.

## Installation

```
/plugin marketplace add webmatze/skill_marketplace
/plugin install writing@webmatze-skills
/reload-plugins
```

Steckt im selben `writing`-Plugin wie `book-writer` — wird also mitinstalliert.

## Auslösen

Greift, sobald du ein Manuskript prüfen lassen willst — das Wort „Skill" ist nicht nötig:

- „Prüf mein Manuskript"
- „Find Kontinuitätsfehler"
- „Ist mein Roman konsistent?"
- „Mach einen Editor-Pass"
- „Prüf das Manuskript" / „Kontinuitätsfehler finden"

## Die zwei Pässe

| Pass | Prüft | Ergebnis |
|---|---|---|
| **continuity** | Personen, Orte, Handlungen, Zeit & Routen über Kapitel hinweg auf Widersprüche (Attribute, Anwesenheit, Chronologie, Reisezeiten, Requisiten) | `issues` |
| **editor** | Handwerk gegen die Lektorats-Prinzipien von Stephen Kings erstem Editor (show-don't-tell, verwobene Backstory, Visualisierung, Leser-Sog, Figuren-Notwendigkeit, sympathisch-aber-fehlerhafter Protagonist, Menschen im Zentrum, Empathie) | `topIssues` + `strengths` |

**Wann welcher:** Plot/Figuren/Timeline geändert oder Publish-Vorbereitung → *continuity*. Handwerklicher Lektorats-Read → *editor*. Unsicher oder voller QA-Sweep → *beide*.

## Ablauf

Die Review-Logik liegt in zwei Workflow-Skripten unter `scripts/`. Die Workflow-Sandbox hat **keinen Dateisystemzugriff** — die Kapitel werden also selbst entdeckt und über `args` übergeben.

1. **Projekt lokalisieren** — Kapitel-Verzeichnis (`<book>/chapters/`) und das kompilierte Manuskript (`<book>/manuscript.md`; der Editor-Pass braucht es — vorher kompilieren, falls es fehlt).
2. **Kapitel entdecken** (nach führender Nummer sortiert), `chapters`-Array bauen, Sprache erkennen.
3. **Pass/Pässe starten** via Workflow-Tool mit `args` (`dir`, `chapters`, `manuscript` nur Editor, `charDir` optional, `language`, `context`).
4. **Zurückgegebene `synthesis` lesen.**

## Wichtig: vor jeder Änderung verifizieren

Die Synthese kann **Extraktions-Artefakte** enthalten (False Positives, wo ein Agent den Text falsch gelesen hat). Für jeden Befund, den du umsetzen willst, **erst das zitierte Kapitel öffnen und die tatsächlichen Zeilen lesen**. Viele „high"-Befunde lösen sich bei Ansicht auf. Der Report liefert Leads, keine Urteile.

## Hinweise

- Jeder Pass spawnt ~27 Agenten (1/Kapitel + Dimensionen + Synthese) und ist token-intensiv — nur bei Bedarf laufen lassen.
- Die Skripte sind self-contained; iterieren durch Editieren und erneutes Aufrufen mit demselben `scriptPath`.

## Verwandt

- [`book-writer`](../book-writer/README.md) — schreibt das Buch, das dieser Skill prüft (Editing-Phase 4 & Qualitäts-Phase 6).
