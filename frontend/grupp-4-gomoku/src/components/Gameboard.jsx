import { useState, useEffect } from 'react'
import styled from 'styled-components';
import json from '../../public/data.json';




const array = []

function Gameboard() {


   const [board, setBoard] = useState([]);

  let table = document.getElementById('gameboardtable');
  let row = 16
  let col = 16
  for (let i = 0; i < col; i++) {
    console.log("I: " + i);
    for (let j = i; j < row; j++) {
      console.log("J: " + j);
      array.push(j)

    }

  }

  return (
    <>
    <Div>

         {array.map((array, id) => (
          <div className="container" key={id}>hej</div>
        ))}


    </Div>
    </>
  )
}



export default Gameboard


const Div = styled.div`
grid-template-columns: repeat(16, auto);
grid-template-rows: repeat(16, auto);
display: grid;
width: 100px;
gap: 1px;

`
// display: grid;
// grid-template-columns: repeat(16, 1fr);
// gap: 1px;
