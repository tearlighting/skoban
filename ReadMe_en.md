## 📌 Project Overview

This project is a Sokoban game built with Vite and Vue3, originally intended for teaching reactive hooks. Eventually, it evolved into an architecture experiment focusing on separating game logic from rendering, supporting multiple front-end environments: Vue, React, and raw DOM.

## 🧠 Key Features

- 🎯 Separation of logic and view (class + IViewer interface)
- 🏗️ Supports raw DOM, Vue, and React rendering
- 🧩 Inject viewer instance with abstract factory function
- 🔁 Vue uses reactive + computed for auto update
- 📬 React uses useSyncExternalStore + pub-sub for manual sync
- 🎮 Level management via composable hooks
- 🧱 Core game implemented with pure TypeScript classes (Game / Ruler)

## 📁 Project Structure

```tree
src/
├── skoban/ # Core logic (map, character, rules)
│ ├── core/ # Main classes: Game, Ruler
│ └── viewers/ # IViewer interface & DOM/Vue/React implementations
├── hooks/ # Custom hooks (movement, level control)
├── views/
│ └──oop/
│ ├── dom # Raw DOM implementation
│ ├── vue # Vue (reactive + computed)
│ └── react # React (injected via ReactDOM)
├── store/ # Static level data
└── utils/ # Utility functions (e.g., generateMap)
```

🚀 Quick Start

```bash

pnpm install # Install dependencies
pnpm dev # Start dev server
pnpm build # Build for production
```

## Controls

Use arrow keys to move the character: ↑ ↓ ← →

## 🏗️ Development Notes

Originally built for Composition API teaching. Later evolved into a framework-independent game engine.

Vue's reactive transforms this into Proxy, causing pointer issues.

In React, useSyncExternalStore couldn't track class instances, so we used flat plain objects.

Surprisingly, the DOM implementation turned out to be the lightest and cleanest.

## 📌 TODO

Map editor UI

Custom skin support

Level import/export and save feature """
