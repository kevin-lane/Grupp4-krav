import { useState, useEffect } from 'react'
import styled from 'styled-components';
import json from './data.json';

const array = []

function Gameboard() {
  const [board, setBoard] = useState([]);


  console.log(json.board.tiles.map(index => (
    <div>{index}</div>
  )));
  let table = document.getElementById('gameboardtable');
  let row = 8;
  let col = 16;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      array.push(json.board.tiles[j])
    }
  }

  const [bool, setBool] = useState([])
  const [boo, setBoo] = useState(false)

  const move = (index) => () => {


    setBool(state => ({
      ...state, // <-- copy previous state
      [index]: !state[index], // <-- update value by index key
    }));
    setBoo(true)
  };


  const handle = (e) => {

  }


  return (
    <>
    <Div>
          {array.map((array, index) => (
            <div  className='container' onClick={handle}>
          <div
          key={index}
          className={bool[index] && !boo ? "container1" : "container2"}
          onClick={move(index)}

          >

          </div>

          </div>
        ))}
        {/* {json.board.tiles.map(index => (
    <div className='container'>{index}</div>
  ))} */}

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
