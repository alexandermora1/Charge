import { useState } from "react";
import './App.css'
import { EMPIRE_ARMY, ORC_ARMY } from "./engine/armyLists"
import * as rng from "./engine/rng";
import { advance } from "./engine/stateAdvance";
import { createInitialState } from "./engine/stateMachine";
import Battlefield from "./components/Battlefield";
import Controls from "./components/Controls";
import LogPanel from "./components/LogPanel";


function App() {
  const [gameState, setGameState] = useState(() => 
    createInitialState(EMPIRE_ARMY[0], ORC_ARMY[0])
  );

  function resetGame() {
    const resetGame = createInitialState(EMPIRE_ARMY[0], ORC_ARMY[0]);
    setGameState(resetGame);
  }

  function advanceGame() {
    const nextPhase = advance(gameState, rng);
    setGameState(nextPhase);
  }

  return (
    <div className="App">
      <Battlefield gameState={gameState} />
      <Controls resetGame={resetGame} advanceGame={advanceGame} />
      <LogPanel log={gameState.log} phase={gameState.current} />
    </div>
  )
}

export default App
