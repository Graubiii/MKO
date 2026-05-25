document.addEventListener("DOMContentLoaded", function () {


    // 1. NAGŁÓWEK (HEADER)

    const header = document.createElement("header");

    const h1 = document.createElement("h1");
    h1.textContent = "Music Kingdom Online [MKO]";

    // Atrapa wyszukiwarki (tylko wizualnie, bez żadnych blokad)
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Szukaj utworów, artystów, playlist...";

    // Zatrzymujemy domyślne działanie Entera
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            alert("Wyszukiwarka będzie aktywna na kolejnych zajęciach!");
        }
    });

    header.append(h1, searchInput);


    // 2. GŁÓWNA ZAWARTOŚĆ (MAIN)

    const main = document.createElement("main");

    //  SEKCJA 1: TOP 10 HITÓW (API) 
    const topHitsSection = document.createElement("section");
    const h2Top = document.createElement("h2");
    h2Top.textContent = "TOP HITÓW NA ŚWIECIE";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Pozycja</th>
            <th>Tytuł</th>
            <th>Artysta</th>
            <th>Czas</th>
        </tr>
    `;
    const tbody = document.createElement("tbody");
    tbody.innerHTML = "<tr><td colspan='4'>Ładowanie muzyki z bazy...</td></tr>";

    table.append(thead, tbody);
    topHitsSection.append(h2Top, table);

    //  SEKCJA 2: NOWOŚCI (Statyczna) 
    const nowosciSection = document.createElement("section");
    const h2Nowosci = document.createElement("h2");
    h2Nowosci.textContent = "NOWOŚCI";
    const ulNowosci = document.createElement("ul");

    const noweUtwory = ["Nowy utwór A", "Nowy utwór B", "Nowy utwór C", "Nowy utwór D", "Nowy utwór E", "Nowy utwór F", "Nowy utwór G", "Nowy utwór H"];
    noweUtwory.forEach(function (tytul) {
        const li = document.createElement("li");
        li.textContent = tytul;
        ulNowosci.appendChild(li);
    });
    nowosciSection.append(h2Nowosci, ulNowosci);

    // --- SEKCJA 3: TRENDUJĄCE PLAYLISTY (Statyczna) ---
    const playlistySection = document.createElement("section");
    const h2Playlisty = document.createElement("h2");
    h2Playlisty.textContent = "TRENDUJĄCE PLAYLISTY";
    const ulPlaylisty = document.createElement("ul");

    const playlisty = ["Top 10 Global", "Top 10 USA", "Chill", "Na trening", "Na dobry mood", "Na zły humor", "Do auta"];
    playlisty.forEach(function (nazwa) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = nazwa;
        li.appendChild(a);
        ulPlaylisty.appendChild(li);
    });
    playlistySection.append(h2Playlisty, ulPlaylisty);

    // --- SEKCJA 4: POWIĄZANE TREŚCI (Statyczna) ---
    const powiazaneSection = document.createElement("section");
    const h2Powiazane = document.createElement("h2");
    h2Powiazane.textContent = "Powiązane treści";
    const ulPowiazane = document.createElement("ul");

    const powiazane = ["Polubione utwory", "Trendy", "Statystyki użytkownika", "Ostatnio odtwarzane"];
    powiazane.forEach(function (nazwa) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = nazwa;
        li.appendChild(a);
        ulPowiazane.appendChild(li);
    });
    powiazaneSection.append(h2Powiazane, ulPowiazane);

    main.append(topHitsSection, nowosciSection, playlistySection, powiazaneSection);


    // 3. POBIERANIE DANYCH Z ITUNES API (FETCH)


    fetch("https://itunes.apple.com/search?term=global+pop+hits&entity=song&limit=16")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Błąd serwera");
            }
            return response.json();
        })
        .then(function (data) {
            tbody.innerHTML = "";

            if (data.results && data.results.length > 0) {
                const uniqueTracks = [];
                const trackNames = new Set();

                for (let i = 0; i < data.results.length; i++) {
                    const track = data.results[i];
                    if (!trackNames.has(track.trackName)) {
                        trackNames.add(track.trackName);
                        uniqueTracks.push(track);
                    }
                    if (uniqueTracks.length === 7) break;
                }

                uniqueTracks.forEach(function (track, index) {
                    const tr = document.createElement("tr");

                    const tdPozycja = document.createElement("td");
                    tdPozycja.textContent = (index + 1) + ".";

                    const tdTitle = document.createElement("td");
                    tdTitle.textContent = track.trackName;

                    const tdArtist = document.createElement("td");
                    tdArtist.textContent = track.artistName;

                    const tdCzas = document.createElement("td");
                    if (track.trackTimeMillis) {
                        const totalSeconds = Math.floor(track.trackTimeMillis / 1000);
                        const minutes = Math.floor(totalSeconds / 60);
                        const seconds = totalSeconds % 60;
                        tdCzas.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                    } else {
                        tdCzas.textContent = "--:--";
                    }

                    tr.append(tdPozycja, tdTitle, tdArtist, tdCzas);
                    tbody.appendChild(tr);
                });
            } else {
                tbody.innerHTML = "<tr><td colspan='4'>Brak wyników w bazie.</td></tr>";
            }
        })
        .catch(function (error) {
            console.error("Błąd fetch:", error);
            tbody.innerHTML = "<tr><td colspan='4' style='color:red;'>Nie udało się pobrać danych z API.</td></tr>";
        });


    // 4. STOPKA I PODPIĘCIE DO BODY

    const footer = document.createElement("footer");
    const pFooter = document.createElement("p");
    pFooter.innerHTML = "&copy; 2026 Wszelkie prawa zastrzeżone przez MKO.corp.";
    footer.appendChild(pFooter);

    document.body.append(header, main, footer);
});