import './App.css'
import { EMPIRE_ARMY, ORC_ARMY, printRegimentSummary } from "./engine/armyLists"
import { resolveMelee } from "./engine/combat";
import * as rng from "./engine/rng";


function App() {
  
  console.log(printRegimentSummary(EMPIRE_ARMY[0]));
  console.log(printRegimentSummary(ORC_ARMY[0]));
  
  const result = resolveMelee(EMPIRE_ARMY[0], ORC_ARMY[0], rng);
  console.log(result);
  
  return (
    <>
      
    </>
  )
}

export default App
