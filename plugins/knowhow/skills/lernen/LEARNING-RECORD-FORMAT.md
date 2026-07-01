# Learning-Record-Format

Learning Records liegen in `./learning-records/` und haben fortlaufende Nummerierung: `0001-slug.md`, `0002-slug.md` usw. Das Verzeichnis erst beim ersten Record anlegen.

Sie sind das Lehr-Äquivalent zu ADRs: sie halten nicht-offensichtliche Erkenntnisse, Schlüsseleinsichten und erklärtes Vorwissen fest, die künftige Sessions steuern. Sie dienen der Berechnung der Zone der nächsten Entwicklung.

## Vorlage

```md
# {Kurzer Titel: was wurde gelernt oder festgestellt}

{1–3 Sätze: was gelernt wurde (oder welches Vorwissen festgestellt wurde) und warum das für künftige Sessions wichtig ist.}
```

Das ist das ganze Format. Ein Learning Record kann ein einzelner Absatz sein. Der Wert liegt darin, festzuhalten, _dass_ etwas jetzt bekannt ist und _warum_ das die nächste Lehrentscheidung ändert — nicht im Befüllen von Abschnitten.

## Optionale Abschnitte

Nur aufnehmen, wenn sie echten Mehrwert bringen. Die meisten Records brauchen sie nicht.

- **Status**-Frontmatter (`active | superseded by LR-NNNN`) — sinnvoll, wenn ein älteres Verständnis sich als falsch erweist und ersetzt wird.
- **Belege** — wie der User das Verständnis gezeigt hat (eine beantwortete Frage, eine gemachte Übung, ein zitierter Vorerfahrungspunkt). Hilfreich, wenn die Aussage später angezweifelt werden könnte.
- **Implikationen** — was das für künftige Sessions öffnet oder ausschließt. Aufschreiben, wenn nicht offensichtlich.

## Nummerierung

In `./learning-records/` die höchste vorhandene Nummer suchen und um eins erhöhen.

## Wann ein Learning Record schreiben

Schreibe einen, wenn eines der Folgenden zutrifft:

1. **Der User hat echtes Verständnis für etwas Nichttriviales gezeigt** — nicht nur Kontakt, sondern Belege, dass er das Konzept korrekt anwenden kann. Das setzt eine neue Untergrenze für das, was als Nächstes dran ist.
2. **Der User hat Vorwissen offengelegt** — „X kenn ich schon". Festhalten, damit künftige Sessions das nicht nochmal erklären. Auch die behauptete _Tiefe_ aufnehmen.
3. **Ein Missverständnis wurde korrigiert** — der User glaubte vorher etwas Falsches und sieht jetzt, warum. Diese sind hochwertvoll: sie sagen künftige Stolpersteine bei verwandten Themen voraus.
4. **Die Mission hat sich als Folge des Lernens verschoben** — der User hat gemerkt, dass ihm etwas anderes wichtig ist. Kreuzverweis auf [[MISSION.md]] und Datei aktualisieren.

### Was _nicht_ qualifiziert

- Material, das nur behandelt wurde. Behandlung ist kein Lernen. Auf Belege warten.
- Etwas, das knapp im [[GLOSSARY.md]] als Begriffsdefinition steht. Nicht duplizieren.
- Session-Tagebuch. Learning Records sind kein Journal — sie sind Erkenntnisse von Entscheidungsgewicht.

## Supersession

Wenn ein späterer Record einem früheren widerspricht (das Verständnis des Users hat sich vertieft oder korrigiert), markiere den alten Record mit `Status: superseded by LR-NNNN`, statt ihn zu löschen. Die Geschichte, wie das Verständnis sich entwickelt hat, ist selbst nützliches Signal.
