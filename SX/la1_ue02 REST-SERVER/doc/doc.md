Dokumentation zum 15.01.2018
1. Datenbanken: 
    - Datenbankmanagementsystem (DBMS)
        - besteht aus einer oder mehreren Datenbanken
            - diese wiederum bestehen aus Tabellen 
                - diese wiederum bestehen aus Attributen (Spalten) und Datensätzen(Zeilen)
    - Relationale Datenbank 
        - Wenn eine Datenbank auf Daten einer anderen Datenbank zugreift 
    - Private und Fremde Schlüssel
        - Privater Schlüssel: eindeutig, nur einmal vorhanden
        - Fremder Schlüseel: Abstammung des privaten Schlüssel 
    - Shemenbehaftet: 
        - Aussehen der Datenbank wie Attribute angeordnet sind
        - Die Attribute sind fix angeordnet
    - Shemenlos: 
        - Attribute können dynamisch vergeben werden 

2. Wiederholung REST Server
    - Bodyparser
        - JSON Daten werden in Objekte umgewandelt 
        - urlencoded: 
            - Informationen die urlencoded sind werden in ihr ursprungszeichen umgewandelt
    - URL
        - Fragment 
            - wird vom Client verarbeitet 
                um zB an eine bestimmte Stelle in der Seite zu springen 
        - Querry
            - besteht aus Attributen
                - Diese geben gnauere Informationen zur Ressource an
    - Datenbank: 
        - Singelton Klasse: 
            - es kann nur ein Objekt von dieser Klasse erstellt werden
        - iterable Objekt in javascript 
            - ähnlich wie Collections in Java (Map,Liste,Feld)
                - Map: 
                    - Schlüsselwertpaar: Schlüssel werden zur Authentifizierung der Einträge verwendet. Schlüssel können Strings sein 
                    aber auch Objekte.
            - Warum gibt es keine Collections in Javascript 
                - Felder sind dynamisch
                - Maps werden mit Objekte realisiert
                    - Die Elemente werden dann als Attribut einfach dem Objekt hinzugefügt

3. Datenbank installieren 
    - MongoDB
        - 

    