import './App.css'
import { EMPIRE_ARMY, ORC_ARMY, printRegimentSummary } from "./engine/armyLists"



function App() {
  
  console.log(printRegimentSummary(EMPIRE_ARMY[0]));
  console.log(printRegimentSummary(ORC_ARMY[0]));
  

  return (
    <>
      
    </>
  )
}

export default App
