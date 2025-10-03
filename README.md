# ⚔️ Charge! — Warhammer Battle Simulator ⚔️

This is a small experimental battle engine written in React + JavaScript that simulates a Warhammer Fantasy charge and combat round.

Two regiments of warriors face each other. One side declares a charge, and the system will handle the following steps:

1. Charge declaration & range check

1. Movement into combat

1. Attacker strikes (roll dice to hit, to wound, and armour saves)

1. Defender strikes back

1. Combat resolution (ranks, banners, outnumbering, unsaved wounds)

1. Break test (leadership roll to see if the loser flees)

1. Post-combat cleanup

The project is a prototype and learning exercise, not an official Warhammer product (don't sue me, Games Workshop!). The project has just started, so some functionality may be missing, which will be imlemented later.

## Progress so far

### Implemented:

- Dice rolling system (D6, multiple dice, leadership tests)

- Core unit profiles (Empire Swordsman, Orc Boy)

- Regiment creation and casualty removal

- Melee combat resolution (to hit, to wound, armour saves)

- Combat resolution scoring (ranks, standards, outnumbering, unsaved wounds)

- Turn sequence with state machine handling phases

- Basic UI: battlefield with unit boxes, log panel, and controls

### Planned / Work in progress:

- More unit types (spearmen, cavalry, monsters, ranged units)

- Special rules (spears fighting in extra ranks, musicians for tie-breaks, champions)

- Proper charge range & failed charge rules

- Animations and better battlefield UI (instead of colored boxes)

- Support for multiple regiments per side

## Getting started

1. Clone the repository: <br/>git clone https://github.com/YOUR-USERNAME/Charge.git<br/> cd warhammer-charge

1. Install dependencies: <br/>npm install
  
1. Run locally: <br/> npm run dev



