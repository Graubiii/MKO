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


---

## 5. 🐞 Formularz zgłoszeń błędów

Aplikacja zawiera wbudowany formularz zgłoszeń dostępny z poziomu przycisku **„Zgłoś błąd”** w nagłówku.

### Możliwości:
- wysyłanie zgłoszeń problemów
- wybór kategorii błędu
- walidacja danych użytkownika

### Walidacja:
- e-mail musi zawierać `@` i `.`
- opis musi mieć minimum 10 znaków
- wymagane zaznaczenie zgody (checkbox)

---

## 🔔 System powiadomień (toast)

Aplikacja posiada system powiadomień:

- ✅ dodanie do ulubionych
- ❌ usunięcie z ulubionych

Powiadomienia automatycznie znikają po 3 sekundach.

---

## Zarządzanie ulubionymi

- zapis utworów w `localStorage`
- klucz: `ulubioneMKO`
- możliwość dodawania i usuwania
- dedykowany widok „Twoje Ulubione”

---

## Modal szczegółów utworu

Po kliknięciu utworu wyświetla się okno zawierające:
- okładkę w wyższej jakości
- tytuł
- artystę
- album
- odtwarzacz audio (preview 30s)

---

## Stylowanie i responsywność

Projekt wykorzystuje:
- dark mode (`#121212`)
- layout grid
- responsywność (mobile + duże ekrany)


## 6. Zespół Projektowy

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

## 7. Podsumowanie

Music Kingdom Online to lekka, dynamiczna aplikacja SPA, która:

- działa bez frameworków,
- wykorzystuje nowoczesny JavaScript,
- integruje się z zewnętrznym API,
- oferuje intuicyjny interfejs użytkownika,
- umożliwia zapis ulubionych utworów lokalnie.

## 8. Podgląd strony

![Ogólna storna](IMG/image-4.png)

![Wyszukiwarka](IMG/image-1.png)

![Polubione utwory](IMG/image-2.png)

![Formularz zgłoszenia błędu](IMG/image-3.png)