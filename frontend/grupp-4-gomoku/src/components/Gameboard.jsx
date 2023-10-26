import { useState, useEffect } from 'react'
import styled from 'styled-components';
import json from '../../public/data.json';

const array = []

function Gameboard() {
  const [board, setBoard] = useState([]);

  console.log(json.board.tiles.map(index => index));
  let table = document.getElementById('gameboardtable');
  let row = json.board.rows;
  let col = json.board.cols;
  for (let i = 0; i < row; i++) {
    for (let j = i; j < col; j++) {
      array.push(j)
    }
  }
  console.log(json.board.tiles);

  return (
    <>
    <Div>
         {array.map((array, id) => (
          <div className="container" key={id}>
            {/* {json.map((json, id) => (
               <div key={id}>{json.board.tiles}</div>
            ))} */}
          </div>
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
gap: 2px;
`

// display: grid;
// grid-template-columns: repeat(16, 1fr);
// gap: 1px;
