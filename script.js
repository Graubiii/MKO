document.addEventListener("DOMContentLoaded", function () {

    //naglowek
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
    //  nowe zglos blad
    const btnZglos = document.createElement("button"); 
    btnZglos.textContent = "🐞 Zgłoś błąd";
    btnZglos.classList.add("modal-close-btn"); 
    btnZglos.style.padding = "10px 20px"; 
    btnZglos.addEventListener("click", function (e) {
        e.preventDefault();
        modalZgloszenie.classList.add("modal-active"); 
    });

    headerControls.append(formSearch, btnFavTop, btnZglos);
    header.append(h1, headerControls);  

    //GŁÓWNA ZAWARTOŚĆ
    const main = document.createElement("main"); 

    // GŁÓWNA TABELA
    const topHitsSection = document.createElement("section");  
    const h2Top = document.createElement("h2"); 
    h2Top.textContent = "TOP HITÓW W POLSCE"; 

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = "<tr><th>Tytuł</th><th>Artysta</th><th>Czas</th><th></th></tr>"; 

    const tbody = document.createElement("tbody"); 
    table.append(thead, tbody); 
    topHitsSection.append(h2Top, table); 

    //NIESKOŃCZONA ROLKA ZDJĘĆ
    const karuzelaSection = document.createElement("section"); 
    const h2Karuzela = document.createElement("h2"); 
    h2Karuzela.textContent = "GALERIA WYNIKÓW";

    const karuzelaKontener = document.createElement("div"); 
    karuzelaKontener.classList.add("carousel-container"); 

    // taśma w której znajdą się tylko obrazki
    const karuzelaTrack = document.createElement("div"); 
    karuzelaTrack.classList.add("carousel-track");  

    karuzelaKontener.appendChild(karuzelaTrack); 
    karuzelaSection.append(h2Karuzela, karuzelaKontener); 

    // TRENDUJACE PLAYLISTY
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

    //NOWOŚCI
    const nowosciSection = document.createElement("section");
    const h2Nowosci = document.createElement("h2");
    h2Nowosci.textContent = "NOWOŚCI";
    const ulNowosci = document.createElement("ul");
    ulNowosci.innerHTML = "<li>Ładowanie nowości...</li>"; 
 
    nowosciSection.append(h2Nowosci, ulNowosci);
 
    main.append(topHitsSection, karuzelaSection, playlistySection, nowosciSection); 

    // STOPKA
    const footer = document.createElement("footer");
    const pFooter = document.createElement("p");
    pFooter.innerHTML = "&copy; 2026 Wszelkie prawa zastrzeżone przez MKO.corp.";
    footer.appendChild(pFooter);

    document.body.append(header, main, footer); 

    //LOGIKA APLIKACJI

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
    //NIESKOŃCZONa ROLKA ZDJĘĆ
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

            const czasNaJednoZdjecie = 6;
            const calkowityCzasAnimacji = tracks.length * czasNaJednoZdjecie;

            karuzelaTrack.style.animationDuration = calkowityCzasAnimacji + "s"; 

            karuzelaTrack.innerHTML = obrazyHTML + obrazyHTML; 
            karuzelaKontener.style.display = "block"; 
        } else {
            karuzelaKontener.style.display = "none";
        }
    }

    //LOGIKA ZARZĄDZANIA UTWORAMI
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
                tbody.innerHTML = "<tr><td colspan='4' class='error-msg'>Błąd łączenia z API Apple.</td></tr>"; 
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

    //WALIDACJA FORMULARZA
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
    //NOWE RZECZY
    const modalZgloszenie = document.createElement("div");
    modalZgloszenie.classList.add("modal-overlay");

    const supportBox = document.createElement("div");
    supportBox.classList.add("modal-box", "support-modal");

    const supportTitle = document.createElement("h2");
    supportTitle.classList.add("modal-title", "support-title");
    supportTitle.textContent = "Zgłoś problem / Błąd";

    const supportForm = document.createElement("form");
    supportForm.id = "support-form";
    supportForm.classList.add("support-form");

    // email
    const fieldEmail = document.createElement("div");
    fieldEmail.classList.add("support-field");
    const labelEmail = document.createElement("label");
    labelEmail.classList.add("support-label");
    labelEmail.textContent = "Twój e-mail:";
    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.id = "sup-email";
    inputEmail.classList.add("search-input", "support-input");
    inputEmail.placeholder = "np. kowal@gmail.com";
    fieldEmail.append(labelEmail, inputEmail);

    // kategoria
    const fieldKategoria = document.createElement("div");
    fieldKategoria.classList.add("support-field");
    const labelKategoria = document.createElement("label");
    labelKategoria.classList.add("support-label");
    labelKategoria.textContent = "Kategoria zgłoszenia:";
    const selectKategoria = document.createElement("select");
    selectKategoria.id = "sup-kategoria";
    selectKategoria.classList.add("search-input", "support-input", "support-select");

    const op1 = document.createElement("option"); op1.value = ""; op1.textContent = "Wybierz kategorię";
    const op2 = document.createElement("option"); op2.value = "bug"; op2.textContent = "Niedziałający odtwarzacz";
    const op3 = document.createElement("option"); op3.value = "song"; op3.textContent = "Brakująca piosenka";
    const op4 = document.createElement("option"); op4.value = "other"; op4.textContent = "Inny problem techniczny";
    selectKategoria.append(op1, op2, op3, op4);
    fieldKategoria.append(labelKategoria, selectKategoria);

    // pole do opisow-
    const fieldOpis = document.createElement("div");
    fieldOpis.classList.add("support-field");
    const labelOpis = document.createElement("label");
    labelOpis.classList.add("support-label");
    labelOpis.textContent = "Opis problemu (min. 10 znaków):";
    const textareaOpis = document.createElement("textarea");
    textareaOpis.id = "sup-opis";
    textareaOpis.classList.add("search-input", "support-input", "support-textarea");
    textareaOpis.placeholder = "Opisz swój problem";
    fieldOpis.append(labelOpis, textareaOpis);

    // checkbox
    const fieldCheckbox = document.createElement("div");
    fieldCheckbox.classList.add("support-checkbox-group");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = "sup-regulamin";
    inputCheckbox.classList.add("support-checkbox");
    const labelCheckbox = document.createElement("label");
    labelCheckbox.setAttribute("for", "sup-regulamin");
    labelCheckbox.classList.add("support-checkbox-label");
    labelCheckbox.textContent = "Akceptuję regulamin przesyłania zgłoszeń";
    fieldCheckbox.append(inputCheckbox, labelCheckbox);

    // bledy i przyciski
    const supError = document.createElement("span");
    supError.id = "sup-error";
    supError.classList.add("error-msg", "support-error");

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("support-actions");

    const supAnuluj = document.createElement("button");
    supAnuluj.type = "button";
    supAnuluj.id = "sup-anuluj";
    supAnuluj.classList.add("modal-close-btn", "btn-cancel");
    supAnuluj.textContent = "Anuluj";

    const supZapisz = document.createElement("button");
    supZapisz.type = "submit";
    supZapisz.classList.add("modal-close-btn", "btn-submit");
    supZapisz.textContent = "Wyślij zgłoszenie";

    actionDiv.append(supAnuluj, supZapisz);

    // zlozenie all
    supportForm.append(fieldEmail, fieldKategoria, fieldOpis, fieldCheckbox, supError, actionDiv);
    supportBox.append(supportTitle, supportForm);
    modalZgloszenie.appendChild(supportBox);
    document.body.appendChild(modalZgloszenie);

    // walidacja

    supAnuluj.addEventListener("click", function () {
        modalZgloszenie.classList.remove("modal-active");
        supportForm.reset();
        supError.textContent = "";
    });

    supportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = inputEmail.value.trim();
        const kategoria = selectKategoria.value;
        const opis = textareaOpis.value.trim();
        const regulamin = inputCheckbox.checked;

        if (!email.includes("@") || !email.includes(".")) {
            supError.textContent = "Błąd! Podaj poprawny e-mail (musi posiadać @ i kropkę)!";
            return;
        }

        if (kategoria === "") {
            supError.textContent = "Błąd! Nie wybrano kategorii!";
            return;
        }

        if (opis.length < 10) {
            supError.textContent = "Błąd! Opis jest za krótki (minimum 10 znaków)!";
            return;
        }

        if (!regulamin) {
            supError.textContent = "Błąd! Zaakceptuj regulamin!";
            return;
        }

        supError.textContent = "";
        pokazKomunikat("✅ Dziękujemy! Zgłoszenie zostało wysłane do działu IT.", "#5cb85c");

        modalZgloszenie.classList.remove("modal-active");
        supportForm.reset();
    });
    fetchNowosciAPI();
    fetchMusic("polskie hity");
});