# Digitalna Vizualizacija Socijalnih Mreža: Analiza Interaktivnih Sustava na Primjeru Serije Smallville

**Sažetak**

Ovaj rad istražuje primjenu računalne vizualizacije u analizi kompleksnih narativnih struktura, fokusirajući se na televizijsku seriju *Smallville*. Razvijena aplikacija "Smallville: Mreža Veza" koristi algoritme temeljene na silama (force-directed graphs) kako bi prikazala dinamiku odnosa između likova. Rezultati pokazuju jasnu klasterizaciju likova oko ključnih osi (Kents vs. Luthors), pružajući uvid u evoluciju prijateljstava i rivalstava kroz deset sezona serije.

---

## Uvod

Suvremena televizijska produkcija, osobito u žanru superherojske drame, često uključuje stotine likova s isprepletenim povijestima. Serija *Smallville* (2001.–2011.) predstavlja idealan model za mrežnu analizu zbog tranzicije glavnog lika, Clarka Kenta, iz ruralnog okruženja u globalni kontekst heroja. Tradicionalne metode tekstualne analize često ne uspijevaju obuhvatiti nelinearne promjene u odanostima. Cilj ovog projekta bio je stvoriti alat koji omogućuje vizualno istraživanje tih "klastera" utjecaja.

## Metoda

### Arhitektura sustava
Aplikacija je izgrađena kao Single Page Application (SPA) koristeći:
- **React 19:** Za upravljanje stanjem i komponentama korisničkog sučelja.
- **react-force-graph-2d:** Knjižnica temeljena na D3-force engineu za renderiranje grafova.
- **Tailwind CSS:** Za implementaciju dizajnerskog jezika (tzv. "dark mode") koji odražava ton serije.

### Modeliranje podataka
Podaci su strukturirani u dva osnovna skupa:
1. **Čvorovi (Nodes):** Predstavljaju likove s atributima kao što su uloga, biološko porijeklo i pripadnost grupi.
2. **Veze (Links):** Predstavljaju odnose s definiranim tipom (npr. obitelj, rivalstvo) i snagom (strength), što direktno utječe na vizualnu privlačnost ili odbijanje čvorova u simulaciji.

## Rezultati

Vizualizacija je otkrila tri primarna društvena klastera:
1. **Osovina Kent-Sullivan:** Karakterizirana visokom gustoćom veza temeljenih na povjerenju i tajnosti.
2. **Korporativno-obiteljski blok Luthor:** Prikazuje centralizirane, ali često antagonističke veze, s Lexom Luthorom kao centralnim čvorom koji povezuje ljudske i izvanzemaljske prijetnje.
3. **Justice League (Liga Pravde):** Odvojeni, ali povezani klaster koji se razvija u kasnijim fazama narativa, primarno spojen preko Clarka Kenta i Olivera Queena.

Algoritam uspješno prostorno odvaja antagonističke entitete (npr. Brainiac, Zod) od jezgre obitelji Kent, vizualno demonstrirajući narativni konflikt.

## Rasprava

Primjena interaktivnih mapa omogućuje korisniku (istraživaču ili fanu) da uoči obrasce koji su u linearnom gledanju serije skriveni. Na primjer, poveznica Chloë Sullivan i Brainiaca ("Infection") služi kao most između ljudskog i kriptonskog klastera, što je ključna točka osme sezone. Alat također podržava dinamičku manipulaciju, dopuštajući korisnicima da testiraju hipoteze o "što-ako" scenarijima dodavanjem novih veza.

## Zaključak

Projekt "Smallville: Mreža Veza" uspješno demonstrira kako digitalni alati mogu obogatiti analizu popularne kulture. Korištenje force-directed grafova pruža intuitivan uvid u socijalnu dinamiku fikcionalnih svjetova, otvarajući prostor za daljnja istraživanja u domeni digitalne humanistike. Analiza je dodatno potkrijepljena sintetičkim uvidima generiranim kroz *NotebookLM* procesiranje izvornih materijala serije.

---

## Reference

- DC Comics. (2001-2011). *Smallville* [Televizijska serija]. The CW / WB.
- Bostock, M. (2024). *D3.js: Force-directed graphs documentation*. Preuzeto s d3js.org.
- NotebookLM Analysis. (2026). *Smallville Character Relations & Network Insights*. [Digitalni Bilježnik].
- Google AI Studio. (2026). *Analiza likova i međusobnih odnosa u seriji Smallville*.
