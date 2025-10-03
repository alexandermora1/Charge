import { UnitBox } from "./UnitBox";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../data/constants.js";


export default function Battlefield({ gameState }) {
  if (!gameState?.attacker || !gameState?.defender) {
    return <div style={{ height: 300, border: "1px solid" }}>Loading…</div>;
  }

  const { attacker, defender } = gameState;

  // Position attacker at bottom, defender at top, both in the middle on the x-axis
  const attackerY = BOARD_HEIGHT * 0.85; // 85% down the board
  const defenderY = BOARD_HEIGHT * 0.15; // 15% down the board
  const attackerX = BOARD_WIDTH * 0.50 // Middle of the board
  const defenderX = BOARD_WIDTH * 0.50 

  console.log("Battlefield:", { gameState, attacker, defender });

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        maxWidth: "1800px",
        maxHeight: "600px",
        aspectRatio: "5 / 3",
        border: "1px solid",
        margin: "0 auto",
        overflow: "hidden",
        background: "#353535ff",
      }}>
      <UnitBox regiment={attacker} x={attackerX} y={attackerY} facing="up"/>
      <UnitBox regiment={defender} x={defenderX} y={defenderY} facing="down"/>
    </div>
  )
}