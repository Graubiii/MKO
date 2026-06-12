document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. NAGŁÓWEK (HEADER)
    // ==========================================
    const header = document.createElement("header");
    header.classList.add("header-flex");

    const h1 = document.createElement("h1");
    h1.textContent = "Music Kingdom Online [MKO]";
    h1.classList.add("clickable-title");
    h1.addEventListener("click", function () {
        h2Top.textContent = "TOP HITÓW W POLSCE";
        errorMsg.textContent = "";
        fetchMusic("polskie hity");
    });

    const headerControls = document.createElement("div");
    headerControls.style.display = "flex";
    headerControls.style.alignItems = "flex-start";
    headerControls.style.gap = "15px";

    const formSearch = document.createElement("form");
    formSearch.classList.add("search-form");

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Szukaj (wciśnij Enter)...";
    searchInput.classList.add("search-input");

    const errorMsg = document.createElement("span");
    errorMsg.classList.add("error-msg");

    formSearch.append(searchInput, errorMsg);

    const btnFavTop = document.createElement("button");
    btnFavTop.textContent = "❤️ Twoje Ulubione";
    btnFavTop.classList.add("modal-close-btn");
    btnFavTop.style.padding = "10px 20px";
    btnFavTop.addEventListener("click", function (e) {
        e.preventDefault();
        h2Top.textContent = "TWOJE ZAPISANE UTWORY";
        errorMsg.textContent = "";
        renderFav();
    });

    headerControls.append(formSearch, btnFavTop);
    header.append(h1, headerControls);

    // ==========================================
    // 2. GŁÓWNA ZAWARTOŚĆ (MAIN)
    // ==========================================
    const main = document.createElement("main");

    // --- SEKCJA 1: GŁÓWNA TABELA ---
    const topHitsSection = document.createElement("section");
    const h2Top = document.createElement("h2");
    h2Top.textContent = "TOP HITÓW W POLSCE";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = "<tr><th>Tytuł</th><th>Artysta</th><th>Czas</th><th></th></tr>";

    const tbody = document.createElement("tbody");
    table.append(thead, tbody);
    topHitsSection.append(h2Top, table);

    // --- SEKCJA 2: NIESKOŃCZONA ROLKA ZDJĘĆ ---
    const karuzelaSection = document.createElement("section");
    const h2Karuzela = document.createElement("h2");
    h2Karuzela.textContent = "GALERIA WYNIKÓW";

    const karuzelaKontener = document.createElement("div");
    karuzelaKontener.classList.add("carousel-container");

    // To jest nasza "taśma", w której znajdują się tylko obrazki
    const karuzelaTrack = document.createElement("div");
    karuzelaTrack.classList.add("carousel-track");

    karuzelaKontener.appendChild(karuzelaTrack);
    karuzelaSection.append(h2Karuzela, karuzelaKontener);

    // --- SEKCJA 3: TRENDUJĄCE PLAYLISTY ---
    const playlistySection = document.createElement("section");
    const h2Playlisty = document.createElement("h2");
    h2Playlisty.textContent = "TRENDUJĄCE PLAYLISTY";
    const ulPlaylisty = document.createElement("ul");

    const playlisty = ["Top 10 Global", "Top 10 USA", "Chillout", "Trening", "Impreza", "Do auta"];
    playlisty.forEach(function (nazwa) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = nazwa;

        a.addEventListener("click", function (e) {
            e.preventDefault();
            h2Top.textContent = "PLAYLISTA: " + nazwa.toUpperCase();
            errorMsg.textContent = "";
            fetchMusic(nazwa + " hit");
        });

        li.appendChild(a);
        ulPlaylisty.appendChild(li);
    });
    playlistySection.append(h2Playlisty, ulPlaylisty);

    // --- SEKCJA 4: NOWOŚCI (Lista z prawej strony) ---
    const nowosciSection = document.createElement("section");
    const h2Nowosci = document.createElement("h2");
    h2Nowosci.textContent = "NOWOŚCI";
    const ulNowosci = document.createElement("ul");
    ulNowosci.innerHTML = "<li>Ładowanie nowości...</li>";

    nowosciSection.append(h2Nowosci, ulNowosci);

    main.append(topHitsSection, karuzelaSection, playlistySection, nowosciSection);

    // ==========================================
    // STOPKA
    // ==========================================
    const footer = document.createElement("footer");
    const pFooter = document.createElement("p");
    pFooter.innerHTML = "&copy; 2026 Wszelkie prawa zastrzeżone przez MKO.corp.";
    footer.appendChild(pFooter);

    document.body.append(header, main, footer);

    // ==========================================
    // 3. LOGIKA APLIKACJI, MODAL
    // ==========================================

    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    const modalBox = document.createElement("div");
    modalBox.classList.add("modal-box");

    const modalImg = document.createElement("img");
    modalImg.classList.add("modal-img");

    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");

    const modalArtist = document.createElement("p");
    modalArtist.classList.add("modal-artist");

    const modalAlbum = document.createElement("p");
    modalAlbum.classList.add("modal-album");

    const modalAudio = document.createElement("audio");
    modalAudio.controls = true;
    modalAudio.style.width = "100%";
    modalAudio.style.marginBottom = "20px";
    modalAudio.style.outline = "none";
    modalAudio.style.borderRadius = "20px";

    const btnCloseModal = document.createElement("button");
    btnCloseModal.textContent = "Zamknij";
    btnCloseModal.classList.add("modal-close-btn");

    btnCloseModal.addEventListener("click", function () {
        modalOverlay.classList.remove("modal-active");
        modalAudio.pause();
        modalAudio.currentTime = 0;
    });

    modalBox.append(modalImg, modalTitle, modalArtist, modalAlbum, modalAudio, btnCloseModal);
    modalOverlay.appendChild(modalBox);
    document.body.appendChild(modalOverlay);

    function pokazSzczegoly(track) {
        let zdjecie = track.artworkUrl100;
        if (zdjecie) zdjecie = zdjecie.replace('100x100bb', '200x200bb');

        modalImg.src = zdjecie || "";
        modalTitle.textContent = track.trackName;
        modalArtist.textContent = "Wykonawca: " + track.artistName;
        modalAlbum.textContent = "Album: " + (track.collectionName ? track.collectionName : "Singiel (brak albumu)");

        if (track.previewUrl) {
            modalAudio.src = track.previewUrl;
            modalAudio.style.display = "block";
        } else {
            modalAudio.src = "";
            modalAudio.style.display = "none";
        }

        modalOverlay.classList.add("modal-active");
    }

    function pokazKomunikat(tekst, kolor) {
        const dymek = document.createElement("div");
        dymek.textContent = tekst;
        dymek.classList.add("toast-notification");
        dymek.style.backgroundColor = kolor;

        document.body.appendChild(dymek);
        setTimeout(function () { dymek.remove(); }, 3000);
    }
    // --- LOGIKA NIESKOŃCZONEJ ROLKI ZDJĘĆ ---
    function uruchomKaruzele(tracks) {
        karuzelaTrack.innerHTML = ""; // Czyścimy starą taśmę

        if (tracks.length > 0) {
            let obrazyHTML = "";

            tracks.forEach(function (track) {
                let zdjecie = track.artworkUrl100;
                if (zdjecie) {
                    zdjecie = zdjecie.replace('100x100bb', '400x400bb');
                    obrazyHTML += `<img src="${zdjecie}" class="carousel-img-large" alt="Okładka">`;
                }
            });

            // NOWOŚĆ: Obliczamy czas animacji na podstawie ilości utworów
            // 6 sekund na każde okładki to idealne, wolne tempo.
            // Jeśli jest 15 utworów, animacja potrwa 90 sekund. Jeśli 3, to 18 sekund.
            const czasNaJednoZdjecie = 6;
            const calkowityCzasAnimacji = tracks.length * czasNaJednoZdjecie;

            // Nadpisujemy czas z CSS bezpośrednio z poziomu JavaScriptu
            karuzelaTrack.style.animationDuration = calkowityCzasAnimacji + "s";

            karuzelaTrack.innerHTML = obrazyHTML + obrazyHTML;
            karuzelaKontener.style.display = "block";
        } else {
            karuzelaKontener.style.display = "none";
        }
    }

    // --- LOGIKA ZARZĄDZANIA UTWORAMI ---
    function getFavs() {
        return JSON.parse(localStorage.getItem("ulubioneMKO")) || [];
    }

    function toggleFav(track) {
        let favs = getFavs();
        const existsIndex = favs.findIndex(function (f) { return f.trackName === track.trackName; });

        if (existsIndex >= 0) {
            favs.splice(existsIndex, 1);
            pokazKomunikat("💔 Usunięto utwór z polubionych", "#d9534f");
        } else {
            favs.push(track);
            pokazKomunikat("❤️ Pomyślnie dodano utwór do polubionych!", "#5cb85c");
        }
        localStorage.setItem("ulubioneMKO", JSON.stringify(favs));
    }

    function renderRows(tracks, isFavView = false) {
        tbody.innerHTML = "";

        if (tracks.length === 0) {
            tbody.innerHTML = "<tr><td colspan='4'>Brak utworów. Spróbuj poszukać czegoś innego!</td></tr>";
            return;
        }

        tracks.forEach(function (track) {
            const tr = document.createElement("tr");

            const tdTitle = document.createElement("td");
            tdTitle.textContent = track.trackName;
            tdTitle.classList.add("track-title");
            tdTitle.title = "Kliknij, aby zobaczyć szczegóły, okładkę i odtworzyć fragment!";
            tdTitle.addEventListener("click", function () { pokazSzczegoly(track); });

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

            const tdAction = document.createElement("td");
            tdAction.classList.add("action-cell");

            const btnAction = document.createElement("button");
            btnAction.classList.add("action-btn");

            if (isFavView) {
                btnAction.textContent = "❌";
                btnAction.title = "Usuń z polubionych";
                btnAction.addEventListener("click", function () {
                    toggleFav(track);
                    renderFav();
                });
            } else {
                btnAction.textContent = "❤️";
                btnAction.title = "Dodaj do polubionych";
                btnAction.addEventListener("click", function () { toggleFav(track); });
            }

            tdAction.appendChild(btnAction);
            tr.append(tdTitle, tdArtist, tdCzas, tdAction);
            tbody.appendChild(tr);
        });
    }

    function renderFav() {
        const zapisaneUtwory = getFavs();
        renderRows(zapisaneUtwory, true);
        uruchomKaruzele(zapisaneUtwory);
    }

    function fetchMusic(term) {
        tbody.innerHTML = "<tr><td colspan='4'>Ładowanie muzyki...</td></tr>";
        const url = "https://itunes.apple.com/search?term=" + encodeURIComponent(term) + "&entity=song&limit=15";

        fetch(url)
            .then(function (response) {
                if (!response.ok) throw new Error("Błąd serwera");
                return response.json();
            })
            .then(function (data) {
                const uniqueTracks = [];
                const trackNames = new Set();

                for (let i = 0; i < data.results.length; i++) {
                    const track = data.results[i];
                    if (!trackNames.has(track.trackName)) {
                        trackNames.add(track.trackName);
                        uniqueTracks.push(track);
                    }
                    if (uniqueTracks.length === 10) break;
                }
                renderRows(uniqueTracks, false);
                uruchomKaruzele(uniqueTracks);
            })
            .catch(function (error) {
                tbody.innerHTML = "<tr><td colspan='4' class='error-msg'>Błąd połączenia z API Apple.</td></tr>";
            });
    }

    function fetchNowosciAPI() {
        const url = "https://itunes.apple.com/search?term=polska+nowa+muzyka&entity=song&limit=6&country=PL";

        fetch(url)
            .then(function (response) {
                if (!response.ok) throw new Error("Błąd pobierania nowości");
                return response.json();
            })
            .then(function (data) {
                ulNowosci.innerHTML = "";

                data.results.forEach(function (track) {
                    const li = document.createElement("li");
                    li.textContent = track.artistName + " - " + track.trackName;
                    ulNowosci.appendChild(li);
                });
            })
            .catch(function (error) {
                ulNowosci.innerHTML = "<li class='error-msg'>Błąd ładowania z API</li>";
            });
    }

    // ==========================================
    // 4. WALIDACJA FORMULARZA
    // ==========================================
    formSearch.addEventListener("submit", function (event) {
        event.preventDefault();
        const wartosc = searchInput.value.trim();

        if (wartosc.length < 3) {
            errorMsg.textContent = "Wpisz minimum 3 znaki!";
        } else {
            errorMsg.textContent = "";
            h2Top.textContent = "WYNIKI: " + wartosc.toUpperCase();
            fetchMusic(wartosc);
            searchInput.value = "";
        }
    });

    fetchNowosciAPI();
    fetchMusic("polskie hity");
});