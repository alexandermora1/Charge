## ⚔️ Charge! — Warhammer Battle Simulator ⚔️

This is a small experimental battle engine written in React + JavaScript that simulates a Warhammer Fantasy charge and combat round.

Two regiments of warriors face each other. One side declares a charge, and the system handles the following steps:

1. Charge declaration & range check

1. Movement into combat

1. Attacker strikes (roll dice to-hit, to-wound, and armour saves)

1. Defender strikes back

1. Combat resolution (ranks, banners, outnumbering, unsaved wounds)

1. Break test (leadership roll to see if the loser flees)

1. Post-combat cleanup

The project is a prototype and learning exercise, not an official Warhammer product (don't sue me, Games Workshop!).

## Features

- Regiment creation with profiles (Empire Swordsmen, Orc Boys, etc.)

- Dice rolling system (rollD6, multiple dice, leadership tests)

- Combat resolution logic (ranks, banners, outnumbering)

- State machine handling game phases

- Simple battlefield UI with unit boxes rendered on screen

- Logging of combat events to track each step

## Getting started

1. Clone the repository: <br/>git clone https://github.com/YOUR-USERNAME/Charge.git<br/> cd warhammer-charge

1. Install dependencies: <br/>npm install
  
1. Run locally: <br/> npm run dev
