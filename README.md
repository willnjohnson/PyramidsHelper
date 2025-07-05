# Neopets Pyramids Helper & Autoplayer

This repository contains two GreaseMonkey scripts, a helper (visual highlighting) and an autoplayer (visual highlighting + autoplaying) for the Pyramids card game on Neopets.

## Features

### Pyramids Helper

* **Highlighting Best Move:**
  * Evaluates all playable cards and highlights the one that leads to the longest possible chain.
  * If no cards are playable, it highlights the draw pile.

* **Visual Guidance:**
  * Uses a magenta outline to indicate the best card to play.

### Pyramids Autoplayer

* **Automatic Gameplay:**
  * Automatically plays the best available move based on future potential chains.
  * Automatically draws from the pile when no pyramid cards are playable.
  * Automatically clicks “Collect Winnings” and “Play Again” when a game ends.

* **Human-Like Delays:**
  * Adds randomized click delays to avoid looking robotic. You can change these values in the script, if you desire.

## Installation

These scripts require a user script manager like Tampermonkey or Greasemonkey.

1. **Install a User Script Manager:**

2. **Create a New User Script:**

    * Click on the Greasemonkey/Tampermonkey icon in your browser’s toolbar.
    * Select “Create a new script...” (or “New script”).

3. **Paste the Script:**

    * Delete any existing code in the new script editor.
    * Copy and paste the code from either the `Pyramids Helper` or `Pyramids Autoplayer` script.

4. **Save the Script:**

    * Save the script (usually `Ctrl+S` or `File > Save`).

## Usage

1. Navigate to the Pyramids game on Neopets.

2. The script will run automatically:

    * If using the **Helper**, follow the magenta-highlighted card for the best move.
    * If using the **Autoplayer**, the script will handle all actions for you, including restarting games.

## Compatibility

* **Browser:** Compatible with Chrome, Firefox, Edge, and Opera using a user script manager.
* **Game:** Designed specifically for the Neopets Pyramids game.

## Contributing

Suggestions and improvements are welcome, although these scripts are already well-optimized. Feel free to share fixes or strategy refinements.

## License

This project is open-source and available under the MIT License.

**Disclaimer:** "Neopets" is a registered trademark of Neopets, Inc. This script is an unofficial fan-made tool and is not affiliated with or endorsed by Neopets, Inc.
