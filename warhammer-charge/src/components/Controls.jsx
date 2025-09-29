


export default function Controls({ resetGame, advanceGame }) {




  return (
    <>
      <button onClick={advanceGame}>Next phase</button>
      <button onClick={resetGame}>Reset game</button>
    </>
  )
}