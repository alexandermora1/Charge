


export default function LogPanel({phase, log}) {




  return (
    <>
      <h3>Current phase: {phase}</h3>
      <ul>
        {(log ?? []).slice(-10).map((line, i) => <li key={i}>{line}</li>)}
      </ul>
    </>
  )
}