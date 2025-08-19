


Playwright Präsentation mit Demo-Projekt
1. Einführung in Playwright

Playwright ist ein modernes Open-Source-Testframework von Microsoft.
Es ermöglicht End-to-End-Tests über mehrere Browser-Engines hinweg (Chromium, Firefox, WebKit).
Besonders stark ist es im Bereich Cross-Browser-Testing, parallele Testausführung und bei der Stabilität durch automatische Warte-Mechanismen.

2. Installation & Setup

Node.js installieren (empfohlen LTS-Version).

Neues Projekt anlegen: npm init -y

Playwright installieren: npm install -D @playwright/test

Browser installieren: npx playwright install

Test starten: npx playwright test

3. Demo-Projekt

Im Demo-Projekt wird gezeigt, wie ein einfacher Anlegen eines Tierhalters-Test aufgebaut wird.
Konzepte:

Projektstruktur: Trennung von Tests, Page Objects und Konfiguration

Einfacher Testfall (Login-Formular)

Ausführung mit npx playwright test

Reports: Allure Report, Screenshots, Trace Viewer

4. Vorteile von Playwright

Unterstützt alle großen Browser (Chromium, Firefox, WebKit, auch mobil)

Sehr schnelle und parallele Testausführung

Automatisches Warten reduziert Flakiness

Moderne, einfache API und gute Dokumentation

Integrierte Reports (Screenshots, Videos, Trace Viewer)

5. Nachteile von Playwright

Noch kleinere Community als Selenium

Nicht für alle Legacy-Browser (z. B. Internet Explorer)

Einrichtung in CI/CD-Umgebungen manchmal komplexer

Weniger Plugins und Ökosystem als Cypress

6. Vergleich mit Selenium und Cypress

Selenium: Sehr etabliert, viele Sprachen, große Community, aber eher langsamer

Cypress: Einfach zu starten, tolles Tooling, aber nur JS/TS und eingeschränkter Browser-Support

Playwright: Schnell, modern, mehrere Sprachen, voller Browser-Support, gute Balance

7. Fazit

Playwright kombiniert die Einfachheit von Cypress mit der Flexibilität von Selenium.
Es eignet sich besonders für moderne Web-Anwendungen mit Cross-Browser-Tests.
Für Teams, die Geschwindigkeit und Stabilität brauchen, ist Playwright oft die beste Wahl.






NB

UI-Automatisierung für die Anwendung „Pet Clinic“ mit Playwright
Voraussetzung: Bevor Sie Tests ausführen, legen Sie Umgebungsvariablen fest: Mit Powershell - $env:BASE_URL=„http://localhost:8080/“
Installieren Sie Node – Version 18+ oder neuer
Führen Sie den Test mit npm run UI_TEST aus         
Um die Testergebnisse mit Allure anzuzeigen:  npm run allure:open    
Verwenden Sie „npm install“, um alle Module zu installieren, falls diese nicht verfügbar sind. Verwenden Sie „npm playwright install“, um alle erforderlichen Browser zu installieren, falls diese noch nicht installiert sind.

