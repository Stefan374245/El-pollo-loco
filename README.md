# El Pollo Loco 🐔🌶️

Ein aufregendes 2D-Jump'n'Run-Spiel, in dem du als Pepe gegen das verrückte Hühnchen-Imperium kämpfst! Sammle Flaschen, besiege Gegner und stelle dich den mächtigen Endbossen.

## 🎮 Spielbeschreibung

**El Pollo Loco** ist ein browserbasiertes 2D-Plattformspiel, das mit purem JavaScript und HTML5 Canvas entwickelt wurde. Als Pepe, ein mutiger Charakter, durchquerst du verschiedene Level, sammelst Gegenstände und kämpfst gegen eine Vielzahl von Gegnern, einschließlich dem ultimativen Endboss.

### 🎯 Spielziel
- Durchquere alle Level und besiege den Endboss
- Sammle Münzen und Flaschen für Punkte und Munition
- Überlebe die Angriffe der Gegner und Mini-Bosse
- Nutze deine Sprungfähigkeiten und Wurfangriffe strategisch

## 🕹️ Steuerung

### Desktop-Steuerung
- **Bewegung links**: `←` oder `A`
- **Bewegung rechts**: `→` oder `D`
- **Springen**: `Leertaste`
- **Flasche werfen**: `F` oder `Enter`

### Mobile Steuerung
- **Touch-Buttons** für alle Aktionen
- **Responsive Design** für verschiedene Bildschirmgrößen
- **Vollbild-Modus** verfügbar

## 🎲 Gameplay-Features

### Charaktersystem
- **Pepe**: Der Hauptcharakter mit verschiedenen Animationen
  - Idle-Animationen
  - Lauf-Animationen
  - Sprung-Animationen
  - Schaden- und Tod-Animationen

### Gegnersystem
- **Normale Hühner**: Grundgegner mit Laufanimationen
- **Kleine Hühner**: Schnellere, kleinere Variante
- **Mini-Endboss**: Mittlere Bosse mit erweiterten Fähigkeiten
- **Hauptendboss**: Ultimativer Gegner mit verschiedenen Angriffsphasen

### Sammelgegenstände
- **Münzen**: Für Punkte und Fortschritt
- **Flaschen**: Als Wurfgeschosse gegen Gegner
- **Statusbalken**: Zeigen Gesundheit, Münzen und Flaschen an

### Level-Design
- **Mehrere Level**: Verschiedene Schwierigkeitsgrade
- **Dynamische Hintergründe**: Parallax-Scrolling-Effekte
- **Wolken-Animation**: Atmosphärische Bewegungen
- **Kollisionssystem**: Präzise Gegner- und Umgebungsinteraktionen

## 🎵 Audio-System

Das Spiel verfügt über ein umfassendes Audio-System mit:
- **Hintergrundmusik**: Verschiedene Tracks für jedes Level
- **Soundeffekte**: Für alle Aktionen (Sprung, Schaden, Sammeln, etc.)
- **Mute-Funktion**: Vollständige Audio-Kontrolle
- **Lokaler Speicher**: Einstellungen werden gespeichert

## 🏗️ Technische Architektur

### Klassenstruktur
```
DrawableObject (Basis)
├── MovableObject
│   ├── Character
│   ├── Enemy / Enemy2
│   ├── Endboss / MiniEndboss
│   ├── Bottle
│   ├── Coins
│   ├── ThrowableObject
│   └── Clouds
├── BackgroundObject
└── StatusBars (HP, Coins, Bottles, Endboss)
```

### Kern-Systeme
- **World-System**: Hauptspiel-Engine und Rendering
- **GameManager**: Spiel-Zustandsmanagement
- **AudioManager**: Audio-Verwaltung
- **CollisionHandler**: Kollisionserkennung
- **Level-Manager**: Level-Erstellung und -Konfiguration

### Dateienstruktur
```
El Pollo Loco/
├── index.html              # Haupt-HTML-Datei
├── style.css               # Basis-Styling
├── assets/                 # Spiel-Assets
│   ├── img/                # Bilder und Sprites
│   ├── audio/              # Sound-Dateien
│   ├── fonts/              # Schriftarten
│   └── icons/              # UI-Icons
├── js/                     # JavaScript-Dateien
│   ├── game.js             # Haupt-Spiel-Logik
│   └── templates.js        # HTML-Templates
├── models/                 # Klassen-Definitionen
│   ├── drawable-object.class.js
│   ├── movable-object.class.js
│   ├── character.class.js
│   ├── enemy.class.js
│   ├── world.class.js
│   ├── game-manager.class.js
│   └── ...
├── levels/                 # Level-Konfigurationen
│   └── level-manager.class.js
└── styles/                 # CSS-Module
    ├── colors.css
    ├── fonts.css
    ├── animations.css
    └── ...
```

## 🚀 Installation und Start

### Voraussetzungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Lokaler Webserver (empfohlen für beste Performance)

### Schnellstart
1. **Repository klonen oder herunterladen**
2. **Lokalen Server starten** (z.B. Live Server in VS Code)
3. **`index.html` öffnen**
4. **Spielen!** 🎮

### Entwicklungsumgebung
```bash
# Mit Live Server (VS Code Extension)
# Oder mit Python
python -m http.server 8000

# Oder mit Node.js
npx live-server
```

## 🎨 Anpassungen und Erweiterungen

### Neue Level hinzufügen
```javascript
static createLevel3() {
  return new Level(
    [/* Gegner */],
    new Endboss(3, 2500),
    [/* Wolken */],
    [/* Flaschen */],
    [/* Münzen */],
    [/* Hintergründe */]
  );
}
```

### Neue Gegner erstellen
```javascript
class NewEnemy extends Enemy {
  constructor() {
    super();
    this.speed = 2;
    this.hp = 3;
  }
}
```

### Audio hinzufügen
```javascript
this.sounds = {
  'newSound': new Audio('assets/audio/new-sound.mp3')
};
```

## 🎯 Gameplay-Tipps

### Strategien
- **Timing**: Nutze Sprungattacken, um Gegner zu besiegen
- **Sammeln**: Sammle alle Münzen und Flaschen für maximale Punkte
- **Positioning**: Halte Abstand zu Endbossen und nutze Wurfangriffe
- **Energie**: Achte auf deine Gesundheit und vermeide unnötige Kämpfe

### Steuerung-Tricks
- **Kombinationen**: Nutze Sprung + Bewegung für weitere Sprünge
- **Timing**: Perfektioniere das Timing für Sprungattacken
- **Werfen**: Ziele sorgfältig beim Flaschenwerfen

## 🐛 Bekannte Probleme und Lösungen

### Performance-Optimierung
- **Browser-Cache leeren** bei Problemen
- **Lokalen Server verwenden** für bessere Performance
- **Moderne Browser** nutzen für beste Kompatibilität

### Mobile Probleme
- **Vollbild-Modus** für bessere Spielerfahrung
- **Touch-Kalibrierung** kann je nach Gerät variieren

## 🔧 Entwicklung

### Code-Stil
- **ES6+ JavaScript**: Moderne JavaScript-Features
- **Klassen-basiert**: Objektorientierte Programmierung
- **Modular**: Getrennte Dateien für verschiedene Funktionen
- **Dokumentiert**: JSDoc-Kommentare für alle Klassen

### Debugging
- **Browser DevTools**: Für Fehlersuche und Performance-Analyse
- **Console-Logs**: Strategisch platziert für Debugging
- **Collision-Frames**: Aktivierbar für visuelle Kollisionserkennung

## 📱 Responsive Design

Das Spiel unterstützt:
- **Desktop**: Vollständige Tastatursteuerung
- **Tablet**: Touch-Steuerung mit angepasster UI
- **Mobile**: Optimierte Buttons und Layout

## 🎪 Besondere Features

### Animations-System
- **Sprite-Animationen**: Flüssige Charakter-Bewegungen
- **Parallax-Scrolling**: Tiefe durch Hintergrund-Bewegung
- **Partikel-Effekte**: Visuelle Effekte bei Kollisionen

### Sound-Design
- **Adaptive Musik**: Verschiedene Tracks für verschiedene Situationen
- **3D-Audio**: Positionsbasierte Soundeffekte
- **Dynamische Lautstärke**: Anpassung basierend auf Spielereignissen

## 🏆 Erweiterungsmöglichkeiten

### Geplante Features
- **Weitere Level**: Mehr Herausforderungen
- **Power-Ups**: Temporäre Fähigkeiten
- **Highscore-System**: Konkurrenzkampf
- **Multiplayer**: Lokaler Zwei-Spieler-Modus

### Community-Features
- **Level-Editor**: Eigene Level erstellen
- **Charakter-Anpassung**: Skins und Farben
- **Achievements**: Erfolge und Belohnungen

## 📄 Lizenz

Dieses Projekt wurde als Lernprojekt entwickelt. Alle Assets und Code sind für Bildungszwecke frei verwendbar.

## 🙏 Mitwirkende

- **Entwicklung**: DevAkademie Projekt
- **Grafiken**: Pixel-Art-Assets
- **Audio**: Retro-Gaming-Sounds
- **Design**: Klassisches Jump'n'Run-Design

## 📞 Support

Bei Problemen oder Fragen:
- **Issues**: Erstelle ein GitHub Issue
- **Discord**: Tritt der Community bei
- **Wiki**: Besuche die Dokumentation

---

**Viel Spaß beim Spielen! 🎮🐔**

*El Pollo Loco - Ein klassisches Jump'n'Run-Erlebnis im Browser!*
