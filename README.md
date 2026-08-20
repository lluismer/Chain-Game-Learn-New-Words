# Chain Game — Learn New Words

A browser-based word chain game where you play against an AI opponent that's designed to teach you new vocabulary.

🔗 **Live demo:** https://lluismer.github.io/Chain-Game-Learn-New-Words/

## How it works

Word chain is a simple game: each new word must start with the last letter of the previous word. In this version:

- You play against an AI, taking turns
- Every word you submit is checked against a real dictionary — no gibberish allowed
- The AI doesn't just pick any valid word, it queries live word-frequency data and intentionally picks words that are real but uncommon, aiming for words you'll likely encounter for the first time
- The game tracks used words, enforces the letter-chain rule, and ends when either side can no longer respond (or the player gives up)

## Features

- Turn-based gameplay with a visual turn indicator ("Your turn" / "AI is thinking...")
- Real-word validation via the Free Dictionary API
- AI opponent powered by live frequency data from the Datamuse API, selecting words from a "moderately rare" band rather than the most common or most obscure results
- Duplicate-word and letter-chain validation, with clear inline feedback on invalid input
- Win/loss conditions for both sides, including a "Give Up" option for the player
- Graceful handling of third-party API failures, so a flaky network response doesn't unfairly block valid words
- Responsive UI built with vanilla CSS (flexbox layout, styled feedback states, chip-style word chain)

## Tech stack

- **HTML / CSS / JavaScript** — no frameworks, built from scratch
- **Datamuse API** — word frequency data, used to rank candidate words by rarity
- **Free Dictionary API** — real-word validation for player input
- Deployed via **GitHub Pages**

## Running it locally

1. Clone the repo:
   ```bash
   git clone https://github.com/lluismer/Chain-Game-Learn-New-Words.git
   ```
2. Open the folder in VS Code (or your editor of choice)
3. Use a local server to run it. The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code works well, since the game makes API calls that require a proper local origin (not just opening `index.html` directly as a file)
4. Right-click `index.html` → "Open with Live Server"

No build steps, no dependencies to install — it's plain HTML/CSS/JS.

## What I learned building this

- Working with asynchronous JavaScript (`async`/`await`, chained `fetch` calls) to coordinate multiple API calls before updating the UI
- Designing around unreliable third-party APIs — handling rate limits and server errors gracefully instead of letting them break the game
- Managing application state (turn order, used words, win/loss) across multiple interacting functions
- Iteratively building a project in stages (static UI → core validation → AI opponent → polish), rather than trying to build everything at once

## Possible future improvements

- Per-turn timer for a more time-pressured game feel
- Difficulty levels controlling how rare the AI's word choices are
- Displaying definitions for the AI's chosen words, so the vocabulary-learning goal is more explicit
- Score tracking across multiple games