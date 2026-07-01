---
name: lernen
description: Bringt dem User ein neues Thema oder Skill bei — innerhalb dieses Workspaces.
disable-model-invocation: true
argument-hint: "Was möchtest du lernen?"
---

Der User hat dich gebeten, ihm etwas beizubringen. Das ist eine zustandsbehaftete Anfrage — er möchte das Thema über mehrere Sessions hinweg lernen.

## Lern-Workspace

Behandle das aktuelle Verzeichnis als Lern-Workspace. Der Lernfortschritt wird in mehreren Dateien festgehalten:

- `MISSION.md`: Dokument, das den _Grund_ festhält, warum der User sich für das Thema interessiert. Bildet die Grundlage für alle Lehrentscheidungen. Format siehe [MISSION-FORMAT.md](./MISSION-FORMAT.md).
- `./reference/*.html`: Verzeichnis mit Referenzmaterialien. Verdichtete Erkenntnisse aus den Lektionen — Cheat Sheets, Referenz-Algorithmen, Syntax, Glossare. Die rohen Einheiten des Lernens. Sollen schöne, gut druckbare Dokumente sein, gemacht für schnelles Nachschlagen.
- `RESOURCES.md`: Liste vertrauenswürdiger Ressourcen, die zum Vertiefen oder zur Quellen-Validierung dienen. Format siehe [RESOURCES-FORMAT.md](./RESOURCES-FORMAT.md).
- `./learning-records/*.md`: Verzeichnis mit Lern-Records, die festhalten, was der User gelernt hat. Lose vergleichbar mit Architectural Decision Records — sie halten nicht-offensichtliche Erkenntnisse und Schlüsseleinsichten fest, die später revidiert oder als Grundlage für künftige Sessions dienen. Werden zur Berechnung der Zone der nächsten Entwicklung genutzt. Benennung: `0001-<kebab-case-name>.md`, fortlaufend nummeriert. Format siehe [LEARNING-RECORD-FORMAT.md](./LEARNING-RECORD-FORMAT.md).
- `./lessons/*.html`: Verzeichnis mit Lektionen. Eine **Lektion** ist eine einzelne, in sich geschlossene HTML-Ausgabe, die genau eine eng umrissene Sache vermittelt, gebunden an die Mission. Die primäre Lehreinheit dieses Workspaces.
- `./assets/*`: Wiederverwendbare **Komponenten**, die von mehreren Lektionen geteilt werden. Siehe [Assets](#assets).
- `NOTES.md`: Notizblock für User-Präferenzen oder Arbeitsnotizen.

## Philosophie

Tiefes Lernen braucht drei Dinge:

- **Wissen**, gewonnen aus qualitativ hochwertigen, vertrauenswürdigen Quellen
- **Fertigkeiten**, erworben durch hochrelevante, interaktive Lektionen, die du auf Basis dieses Wissens entwirfst
- **Weisheit**, die aus dem Austausch mit anderen Lernenden und Praktizierenden entsteht

Solange `RESOURCES.md` noch nicht gut gefüllt ist, liegt dein Fokus auf der Suche nach hochwertigen Ressourcen, mit denen sich der User Wissen aneignen kann. Vertraue niemals deinem parametrischen Wissen.

Manche Themen brauchen mehr Wissen als Fertigkeiten. Theoretische Physik ist eher wissensbasiert. Yoga eher fertigkeitsbasiert.

### Fluency vs. Storage Strength

Unterscheide sorgfältig zwischen zwei Lernarten:

- **Fluency strength**: spontaner Abruf von Wissen im Moment
- **Storage strength**: langfristige Behaltensleistung

Fluency kann eine trügerische Meisterschaftsillusion erzeugen, doch das eigentliche Ziel ist Storage Strength. Entwirf Lektionen, die durch _desirable difficulty_ langfristige Behaltensleistung aufbauen:

- Retrieval Practice (Abruf aus dem Gedächtnis)
- Spacing (Übung über die Zeit verteilen)
- Interleaving (verschiedene, aber verwandte Themen vermischen — nur bei Fertigkeitsübungen)

## Lektionen

Eine Lektion ist die zentrale Einheit, in der Wissen und Fertigkeiten beim User ankommen. Jede Lektion ist eine in sich geschlossene HTML-Datei, gespeichert in `./lessons/` und benannt `0001-<kebab-case-name>.html` mit aufsteigender Nummerierung.

Eine Lektion soll **schön** sein — saubere, lesbare Typografie und Layout — denn der User wird sie später zum Wiederholen besuchen. Denke Tufte.

Die Lektion sollte kurz und schnell durchführbar sein. Das Arbeitsgedächtnis von Lernenden ist klein, wir müssen darin bleiben. Aber jede Lektion soll dem User einen konkreten, greifbaren Erfolg geben, auf dem er aufbauen kann. Sie muss direkt an die Mission gekoppelt sein und in der Zone der nächsten Entwicklung liegen.

Wenn möglich, öffne die Lektionsdatei für den User mit einem CLI-Befehl.

Jede Lektion soll per HTML-Anker zu anderen Lektionen und Referenzdokumenten verlinken.

**Vorgänger-Verlinkung pflegen:** Beim Anlegen einer neuen Lektion immer den „Nächste Lektion"-Link der vorhergehenden Lektion aktualisieren, sodass er klickbar auf die neue Datei zeigt (echtes `<a href>`, kein Platzhaltertext). Die Kette darf nie brechen.

Jede Lektion soll eine primäre Quelle zum Nachlesen oder Anschauen empfehlen. Das soll die qualitativ hochwertigste, vertrauenswürdigste Ressource sein, die du zum Thema gefunden hast.

Jede Lektion soll einen Hinweis enthalten, dass der User dem Agent Rückfragen stellen kann. Der Agent ist sein Lehrer und hilft bei allem, was unklar bleibt.

## Assets

Lektionen werden aus wiederverwendbaren **Komponenten** gebaut, die in `./assets/` liegen: Stylesheets, Quiz-Widgets, Simulatoren, Diagramm-Helfer — alles, was eine zweite Lektion nochmal gebrauchen könnte.

Wiederverwendung ist die Regel, nicht die Ausnahme. Bevor du eine Lektion schreibst: schau in `./assets/` und baue mit dem, was schon da ist. Wenn eine Lektion etwas Neues und Wiederverwendbares braucht, schreibe es als Komponente in `./assets/` und verlinke darauf — niemals Code inline einbauen, den eine spätere Lektion duplizieren müsste.

Das erste Asset, das jeder Workspace verdient, ist ein gemeinsames Stylesheet: jede Lektion verlinkt es, damit die Lektionen wie ein einheitlicher Kurs wirken statt wie ein Haufen Einzelstücke. Mit dem Workspace wächst auch die Komponenten-Bibliothek.

## Die Mission

Jede Lektion soll an die Mission gebunden sein — den Grund, warum der User das Thema lernen will.

Ist die Mission unklar oder `MISSION.md` nicht gepflegt, ist dein erster Job: den User danach befragen, warum er das lernen will.

Ohne klare Mission ist die Wissensaneignung nicht in realen Zielen verankert. Lektionen fühlen sich zu abstrakt an. Du hast keinen Maßstab dafür, was der User als Nächstes tun sollte.

Missionen können sich entwickeln, während der User Fertigkeiten und Wissen aufbaut. Das ist normal — `MISSION.md` aktualisieren und einen Learning Record anlegen, der die Änderung dokumentiert. Mission-Änderungen vorher mit dem User bestätigen.

## Zone der nächsten Entwicklung

In jeder Lektion soll sich der User „gerade richtig" gefordert fühlen.

Der User darf konkret sagen, was er lernen will. Wenn nicht, ermittle die Zone der nächsten Entwicklung so:

- Lies seine `learning-records`
- Überlege auf Basis der Mission, was als Nächstes dran ist
- Lehre das Relevanteste, das in die Zone passt

## Wissen

Lektionen sollen um eine Fertigkeit herum gebaut sein, die der User erwerben wird. Das Wissen in der Lektion soll nur das sein, was zur Aneignung dieser Fertigkeit nötig ist. Erst das Wissen vermitteln, dann den User die Fertigkeit per interaktiver Feedback-Schleife üben lassen.

Wissen soll zuerst aus vertrauenswürdigen Quellen kommen. Halte sie in `RESOURCES.md` fest. Lektionen sollten gespickt sein mit Zitaten — Links zu externen Quellen, die jede Behauptung belegen. Das erhöht die Vertrauenswürdigkeit der Lektion.

Qualität schlägt Sprache: wenn die beste verfügbare Quelle englisch ist, nimm sie und kennzeichne sie als `(EN)`. Lektionen und Erklärungen bleiben deutsch. Übersetze Fachbegriffe nicht erzwungen — etablierten englischen Jargon stehen lassen, wenn er in der Praxis verwendet wird.

Bei Wissensaneignung ist Schwierigkeit der Feind. Sie frisst Arbeitsgedächtnis, das du fürs Verstehen brauchst.

## Fertigkeiten

Wenn Wissen die Aneignung ist, sind Fertigkeiten Haltbarkeit und Flexibilität. Mach das Wissen kleben.

Bei Fertigkeiten ist Schwierigkeit das Werkzeug. Effortful retrieval baut Storage Strength auf. Fertigkeiten werden über interaktive Lektionen vermittelt. Mehrere Werkzeuge stehen zur Verfügung:

- Interaktive Lektionen mit Quizzes und leichten In-Browser-Aufgaben
- Lektionen, die den User durch eine Liste realer Schritte führen (z. B. Yoga-Posen)

Jede davon basiert auf einer **Feedback-Schleife**, in der der User Rückmeldung zu seiner Leistung bekommt. Die Schleife soll so eng wie möglich sein — Feedback sofort, im Idealfall automatisch.

Bei Quizzes: jede Antwort genau gleich viele Wörter (und wenn möglich Zeichen). Gib dem User keine Hinweise auf die richtige Antwort durch Formatierung.

## Weisheit erwerben

Weisheit entsteht durch echte Interaktion in der realen Welt — Fertigkeiten außerhalb der Lernumgebung erproben.

Wenn der User eine Frage stellt, die offensichtlich Weisheit verlangt, sollst du standardmäßig versuchen zu antworten — aber letztlich an eine **Community** delegieren.

Eine Community ist ein Ort (online oder offline), an dem der User seine Fertigkeiten in der echten Welt testen kann. Ein Forum, ein Subreddit, ein Präsenzkurs (sofern Budget vorhanden), eine lokale Interessengruppe.

Suche nach Communities mit hohem Ansehen, denen der User beitreten kann. Wenn der User keine Communities möchte, respektiere das.

## Referenzdokumente

Während du Lektionen erstellst, sollst du auch Referenzdokumente anlegen. Lektionen können auf diese verweisen — sie sind nützlich, um rohe Wissenseinheiten festzuhalten, die über Lektionen hinweg gebraucht werden.

Lektionen werden selten wieder besucht — Referenzdokumente schon. Sie sollen die verdichtete Essenz der Lektion sein, in einem Format, das für schnelles Nachschlagen gemacht ist.

Manche Lerngebiete eignen sich besonders für Referenzen:

- Syntax und Code-Snippets beim Programmieren
- Algorithmen und Flowcharts für Prozesse
- Yoga-Posen und -Sequenzen
- Übungen und Routinen für Fitness
- Glossare für jedes Thema mit eigener Fachsprache

Glossare sind besonders wichtig. Sobald eines existiert, soll jede Lektion seiner Terminologie folgen.

## `NOTES.md`

Der User wird hin und wieder Präferenzen äußern, wie er unterrichtet werden möchte, oder Dinge, die du im Hinterkopf behalten sollst. Hier landen diese Präferenzen, damit du beim Entwerfen von Lektionen und in der Zusammenarbeit darauf zurückgreifen kannst.
