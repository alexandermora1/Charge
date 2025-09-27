import './App.css'
import { EMPIRE_ARMY, ORC_ARMY, printRegimentSummary } from "./engine/armyLists"
import { resolveMelee } from "./engine/combat";
import { getFullRanks, getRearRankSize, removeCasualties } from "./engine/regiment";
import * as rng from "./engine/rng";
import { advance } from "./engine/stateAdvance";
import { checkRangePhase, createInitialState, moveChargersPhase } from "./engine/stateMachine";


function App() {
  
  // console.log(printRegimentSummary(EMPIRE_ARMY[0]));
  // console.log(printRegimentSummary(ORC_ARMY[0]));
  
  // const empireAttacks = resolveMelee(EMPIRE_ARMY[0], ORC_ARMY[0], rng);
  // console.log("Combat! Empire attacks Orcs:", empireAttacks);
  // const afterCasualtiesOrcs = removeCasualties(ORC_ARMY[0], empireAttacks.modelsKilled);
  // console.log("Orc regiment after casualties:", afterCasualtiesOrcs);
  
  // console.log("Full ranks Empire:", getFullRanks(EMPIRE_ARMY[0]));
  // console.log("Models in rear rank:", getRearRankSize(EMPIRE_ARMY[0]));
  // console.log("Full ranks Orcs:", getFullRanks(afterCasualtiesOrcs));
  // console.log("Models in rear rank:", getRearRankSize(afterCasualtiesOrcs));

  // const orcsFightBack = resolveMelee(afterCasualtiesOrcs, EMPIRE_ARMY[0], rng);
  // console.log("Combat! Orcs attacks Empire:", orcsFightBack);
  // const afterCasualtiesEmpire = removeCasualties(EMPIRE_ARMY[0], orcsFightBack.modelsKilled);
  // console.log("Empire regiment after casualties:", afterCasualtiesEmpire);
  
  // console.log("Full ranks Empire:", getFullRanks(afterCasualtiesEmpire));
  // console.log("Models in rear rank:", getRearRankSize(afterCasualtiesEmpire));
  // console.log("Full ranks Orcs:", getFullRanks(afterCasualtiesOrcs));
  // console.log("Models in rear rank:", getRearRankSize(afterCasualtiesOrcs));

  let state = createInitialState(EMPIRE_ARMY[0], ORC_ARMY[0]);
  console.log(state.current);
  
  while (state.current !== "POST_COMBAT") {
    state = advance(state, rng);
    console.log("→", state.current, "| Log:", state.log.at(-1));
  }
 
  
  
  
  

  return (
    <>
      
    </>
  )
}

export default App
