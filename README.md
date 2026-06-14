# Music Kingdom Online (MKO)

## 1. Opis Ogólny Projektu

**Music Kingdom Online (MKO)** to w pełni dynamiczna aplikacja webowa służąca do:
- wyszukiwania,
- przeglądania,
- odsłuchiwania fragmentów utworów muzycznych.

Aplikacja korzysta z zewnętrznego API (**iTunes Search API**) i jest generowana w całości za pomocą JavaScript, bez statycznego HTML — wszystko powstaje dynamicznie poprzez manipulację DOM.

---

## 2. Architektura i Technologie

- **Język programowania:** JavaScript 
- **Zarządzanie stanem:** localStorage 
- **Zewnętrzne API:** Apple iTunes Search API 

### Główne mechanizmy:
- Asynchroniczne pobieranie danych (`fetch`)
- Obsługa zdarzeń (Event Listeners)
- Dynamiczne tworzenie DOM (`document.createElement`)

---

## 3. Interfejs Użytkownika (UI)

Aplikacja składa się z kilku głównych sekcji generowanych po zdarzeniu `DOMContentLoaded`.

### 3.1 Nagłówek (Header)

- **Logo / Tytuł**
  - Klikalne: „Music Kingdom Online [MKO]”
  - Resetuje widok do „polskie hity”

- **Wyszukiwarka**
  - Walidacja: minimum 3 znaki
  - Enter → wyszukiwanie utworów

- **Przycisk „Twoje Ulubione”**
  - Wyświetla zapisane utwory (localStorage)

---

### 3.2 Główna sekcja (Main)

#### Tabela wyników
- Wyświetla:
  - tytuł
  - artystę
  - czas trwania
  - przycisk akcji 
- Maksymalnie **10 unikalnych wyników**

#### Galeria wyników (karuzela)
- Nieskończona animacja okładek
- 6 sekund na każdą okładkę

#### Trendujące playlisty
- Przykłady:
  - Top 10 Global
  - Chillout
- Kliknięcie → automatyczne wyszukiwanie

#### Nowości
- 6 najnowszych polskich utworów
- Pobierane przy starcie aplikacji

---

### 3.3 Elementy nakładkowe (Overlay)

#### Modal szczegółów utworu
Zawiera:
- okładkę (wysoka jakość)
- tytuł
- artystę
- album
- odtwarzacz audio (30 sekund preview)

#### System powiadomień (Toast)
- ✔ zielony → dodano do ulubionych 
- ❌ czerwony → usunięto 
- Automatycznie znika po 3 sekundach

---

## 4. Przebieg działania

### Inicjalizacja
- Nasłuchiwanie `DOMContentLoaded`
- Budowa struktury DOM

### Automatyczne zapytania
- `fetchNowosciAPI()`
- `fetchMusic("polskie hity")`

### Bezpieczeństwo i wymagania
- API: metoda **GET**
- Parametry zabezpieczone przez `encodeURIComponent`
- Brak zewnętrznych bibliotek (pure JS)

### Wymagania przeglądarki
- ES6:
  - `let`, `const`
  - arrow functions
  - `Set`
  - `fetch`
- obsługa `localStorage`

### LocalStorage
- Klucz: `ulubioneMKO`

---

## 5. Zespół Projektowy

### Jakub B
- Integracja API i przetwarzanie danych
- Obsługa iTunes API
- Funkcje:
  - `fetchMusic`
  - `fetchNowosciAPI`
- Filtrowanie danych i usuwanie duplikatów (`Set`)

---

### Michał T
- Struktura interfejsu
- Dynamiczne generowanie DOM
- Wyszukiwarka (logika + walidacja)
- Renderowanie tabeli (`renderRows`)

---

### Oliwier P
- Warstwa wizualna i UX
- Zarządzanie stanem (`localStorage`)
- System ulubionych
- Modal z odtwarzaczem audio
- Powiadomienia (toast)
- Karuzela okładek (JS + CSS)

---

## 6. Podsumowanie

Music Kingdom Online to lekka, dynamiczna aplikacja SPA, która:

- działa bez frameworków,
- wykorzystuje nowoczesny JavaScript,
- integruje się z zewnętrznym API,
- oferuje intuicyjny interfejs użytkownika,
- umożliwia zapis ulubionych utworów lokalnie.

