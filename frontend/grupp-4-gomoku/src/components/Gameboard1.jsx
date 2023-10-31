import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import data from '../../public/data.json';






function Gameboard() {


    const [boards, setBoards] = useState([]);
    // const [refreshGame, setRefreshGame] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const minInRow = data.board.minInRow




  /**
   * Kolla win condition horizotnally
   * @param {*} boards
   * @param {*} currentPlayer
   * @returns
   */

    const checkWinCondition = (boards, currentPlayer) => {

        for(var i = 0; i < boards.length; i++){
           let count = 0;
            for( let j = 0; j < boards[i].length; j++){
                if(boards[i][j] === currentPlayer){
                    count++;
                    if (count === minInRow) return true;
                } else {
                    count = 0;

                }
             }
        }

         //Check Check vertically
         let count = 0;
         for (let i = 0; i < boards[i]; i++) {
            for( let j = 0; j < boards.length; j++){
                if (boards[i][j] === currentPlayer) {
                    count++
                    if (count === minInRow) return true
                } else {
                    count = 0;
                }
         }
        }

     }



    const move = (rowIndex, colIndex) => () => {

        //Check gameover och avsluta move function
        if (gameOver) return;

      // Ensure that the cell is empty before updating
      if (boards[rowIndex][colIndex] === 0) {
        const updatedBoards = [...boards];
        updatedBoards[rowIndex][colIndex] = currentPlayer;
        setBoards(updatedBoards);

        //Check for win before switching to second player
        if (checkWinCondition(boards, currentPlayer)) {
            console.log(`Player ${currentPlayer} wins!`);
            setGameOver(true);
            return;
          }
             // Switch to the other player
        setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
      }

    };


    useEffect(() => {
        setBoards(data.board.tiles);
    }, []);

    // useEffect(() => {
    //     setRefreshGame(data.board.tiles);
    // }, []);

    const refresh = () => window.location.reload(true)


    return (
        <>
        <button
        //infinity loop utan arrowfunction
        //() => setRefreshGame(refreshGame)
        onClick={refresh}>New Game</button>
          {gameOver && (
            winner === currentPlayer
            ? <div>Y</div>
            : <div>` Player {`${currentPlayer}`} won this game `</div>
        )}
                <Board>
                 {/* Loopa igenom varje row i boards arrayen */}
                 {boards.map((row, rowIndex) => (
                     row.map((col, colIndex) => (
                     <Tile key={`${rowIndex}-${colIndex}`}>
                       {rowIndex >= 1 && colIndex >= 1 && rowIndex <= 16 && colIndex <= 16 && (
                           <Klick key={`${rowIndex}-${colIndex}`} onClick={move(rowIndex, colIndex)}>
                              <Kryss>{col === 1 ? "X" : col === 2 ? "O" : ""}</Kryss>
                          </Klick>
                           )}
                     </Tile>
                      ))
                    ))}
                </Board>
                </>

    );
}

export default Gameboard;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  gap: 0%;
  /* width: 370.5px; */
  width: 74.2%;
  max-width: 370.5px;
  border: 1px solid black;
`;

const Tile = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid black;
  position: relative; /* Set positioning context */
  background-color: #737272;


`;
const Kryss = styled.span`
  color: black;
  font-size: x-large;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`;

const Klick = styled.div`
  background-color: none ;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -50%;
  margin-left: -50%;
`;
