# webmatze-skills

Persönlicher Claude-Code-Skill-Marketplace.

## Installation

```
/plugin marketplace add webmatze/skill_marketplace
/plugin install writing@webmatze-skills
/plugin install knowhow@webmatze-skills
```

## Plugins

| Plugin | Skills | Zweck |
|--------|--------|-------|
| `writing` | `book-writer`, `create-author` | Bücher schreiben; Autoren-Personas erstellen |
| `knowhow` | `lernen` | Strukturiertes Lernen im Workspace |

## Struktur

```
.claude-plugin/marketplace.json   # listet die Plugins
plugins/<plugin>/
  .claude-plugin/plugin.json
  skills/<skill>/SKILL.md
```

Ein neuer Skill: unter `plugins/<plugin>/skills/<name>/SKILL.md` ablegen — er wird automatisch Teil des Plugins.
