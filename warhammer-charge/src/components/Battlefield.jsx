import { getFullRanks } from "../engine/regiment";

export default function Battlefield({ gameState }) {
  const { attacker, defender } = gameState;

  const scale = 1;
  const attackerX = attacker.position.x * scale;
  const attackerY = attacker.position.y * scale;
  const defenderX = defender.position.x * scale;
  const defenderY = defender.position.y * scale;

  if (!gameState || !gameState.attacker || !gameState.defender) {
  return <div style={{height:300,border:"1px solid"}}>Loading…</div>;
  }

  console.log("Battlefield:", { gameState, attacker, defender });


  function UnitBox({ regiment, x, y }) {
    const frontRank = Math.min(regiment.width, regiment.models);
    const ranks = getFullRanks(regiment);
    const base = regiment.profile.baseSize;
    const boxWidth = frontRank * base * scale;
    const boxHeight = base * ranks * scale;

    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: boxWidth,
          height: boxHeight,
          background: regiment.id === "swordsmen1" ? "#a10202" : "#00850f", // Fix colors later
          border: "1px solid #fff"
        }}>
        <strong>{regiment.profile.name} ({regiment.models})</strong>
      </div>
      
    )
  }

  return (
    <div style={{ position: "relative", width: 800, height: 300, border: "1px solid"}}>
      <UnitBox regiment={attacker} x={attackerX} y={attackerY} />
      <UnitBox regiment={defender} x={defenderX} y={defenderY} />
    </div>
  )
}