import { useState, useEffect } from 'react'
import styled from 'styled-components';
import json from './data.json';

const array = []

function Gameboard() {
  const [board, setBoard] = useState([]);

  const [boards, setBoards] = useState([]);


  useEffect(() => {
      setBoards(json.board.tiles);
  }, []);

  console.log(json.board.tiles.map(index => index));
  let table = document.getElementById('gameboardtable');
  let row = 8;
  let col = 16;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      array.push(json.board.tiles[j])
    }
  }
  console.log(json.board.tiles);
  console.log(array);

  const [bool, setBool] = useState([])
  const [boo, setBoo] = useState(false)
  const [playerTurn, setPlayerTurn] = useState(null);


  const move = (colindex, rowindex) => () => {

    if(playerTurn === 1  ) {
      json.board.tiles[rowindex][colindex] = 1
      setPlayerTurn(2);
    }
    else if (playerTurn === 2 ) {
      json.board.tiles[rowindex][colindex] = 2
      setPlayerTurn(1);
    }



    setBoo(true)
  };




  return (
    <>
    <Board>
                 {/* Loopa igenom varje row i boards arrayen */}
            {boards.map((row, rowIndex) => (
                 // För varje row loopa igen om cols som ger cellerna.
                row.map((col, colIndex) => (
                    <Tile key={`${rowIndex}-${colIndex}`} >
                        <Kryss onClick={move(colIndex, rowIndex)}> {col === 1 ? "X" : col === 2 ? "O" : ""}</Kryss>

                    </Tile>
                ))
            ))}
        </Board>
    </>
  )
}

export default Gameboard

const Div = styled.div`
grid-template-columns: repeat(17, auto);
grid-template-rows: repeat(17, auto);
display: grid;
width: 100px;
gap: 2px;

`

const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
  position: absolute;
  border-radius: 50%;

`
const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  gap: 0px;
  width: 370.5px;
  border: 1px solid black;
`;

const Tile = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;

`;

const Kryss = styled.p`
color: red;
margin: -6.5px ;
margin-top: -10px;

`
