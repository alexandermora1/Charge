import { useState } from 'react'
import './App.css'
import {toHitChart, toWoundChart, armourSave} from "./rules/tables";


function App() {
  const [count, setCount] = useState(0)

  console.log("-------------------");
  console.log("To hit: ");
  console.log(toHitChart(5, 3));
  console.log(toHitChart(4, 3));
  console.log(toHitChart(3, 3));
  console.log(toHitChart(3, 4));
  console.log(toHitChart(3, 5));
  console.log(toHitChart(3, 6));
  console.log(toHitChart(3, 7));
  console.log(toHitChart(3, 8));
  
  console.log("-------------------");
  console.log("To wound: ");
  console.log(toWoundChart(6, 3));
  console.log(toWoundChart(5, 3));
  console.log(toWoundChart(4, 3));
  console.log(toWoundChart(3, 3));
  console.log(toWoundChart(3, 4));
  console.log(toWoundChart(3, 5));
  console.log(toWoundChart(3, 6));
  console.log(toWoundChart(3, 7));
  
  console.log("-------------------");
  console.log("Armour save: ");
  console.log(armourSave(2, 3));
  console.log(armourSave(2, 4));
  console.log(armourSave(2, 5));
  console.log(armourSave(2, 6));
  console.log(armourSave(2, 7));
  console.log(armourSave(2, 8));



  return (
    <>
      
    </>
  )
}

export default App
