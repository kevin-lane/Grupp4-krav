import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import data from '../../public/data.json';


const player1 = data.player1;
const player2 = data.player2;


function Gameboard() {

    const [boards, setBoards] = useState([]);
    const [gameState, setGameState] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(player1);
    const [gameId, setGameId] = useState(data.id);
    const [round, setRound] = useState(0);

    const minInRow = data.board.minInRow


    //Starta om spelet
    const resetGame = () => {
        const newBoard = Array(17).fill(null).map(() => Array(17).fill(0));
        setBoards(newBoard);
        setGameState(data.state.new);
        setCurrentPlayer(player1);
        setGameOver(false);
        setGameId(data.id)
        setRound(0)
        setWinner(null)
        };

    // // //Set game state
    // if (gameState === data.state.new) {
    //     resetGame
    // } else if (gameState === data.state.tie) {

    // }

    //Använda för att sätta player1 och 2 ifrån JSON
    const getCurrentPlayer = () => currentPlayer === player1 ? player1: player2;


    const move = (rowIndex, colIndex) => () => {

        //Check gameover och avsluta move function
        if (gameOver) return;

      // Ensure that the cell is empty before updating
      if (boards[rowIndex][colIndex] === 0) {
        const updatedBoards = [...boards];
        updatedBoards[rowIndex][colIndex] = currentPlayer;
        setBoards(updatedBoards);
        // console.log(currentPlayer.id);
        setRound(prevRound => currentPlayer === player1 ? prevRound + 1 : prevRound);

        //Check for win before switching to second player
        if (checkWinCondition(updatedBoards, currentPlayer)) {
            console.log(`Player ${currentPlayer.name} wins!`);
            setGameOver(true);
            setWinner(currentPlayer);
          } else if (checkForTie(updatedBoards)){
            console.log("this is tie");
            setGameState("tie")
            setGameOver(true);
          }
          else{
                 // Switch to the other player
        setCurrentPlayer(prev => prev === player1 ? player2 : player1);
        setRound(prevRound => currentPlayer === player2 ? prevRound + 1 : prevRound);
      }

          }

    };


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
         for (let i = 0; i < boards.length; i++) {
            let count = 0;
            for( let j = 0; j < boards[i].length; j++){
                if (boards[j][i] === currentPlayer) {
                    count++
                    if (count === minInRow) return true;
                } else {
                    count = 0;
                }
         }
        }

        // Check diagonally (from top-left to bottom-right)
        for (let row = 0; row < boards.length; row++) {
            for (let col = 0; col < boards[row].length; col++) {
                 let count = 0;
                    for (let i = 0; i < minInRow; i++) {
                     if (boards[row + i] && boards[row + i][col + i] === currentPlayer) {
                        count++;
                        if (count === minInRow) return true;
                    } else {
                          break; // Avslutar inner-loop om ingen matchade cell hittas
            }
        }
    }
}

        // Check diagonally (from top-right to bottom-left)
        for (let row = 0; row < boards.length; row++) {
            for (let col = 0; col < boards[row].length; col++) {
                let count = 0;
                    for (let i = 0; i < minInRow; i++) {
                    if (boards[row + i] && boards[row + i][col - i] === currentPlayer) {
                        count++;
                        if (count === minInRow) return true;
                    } else {
                         break;// Avslutar inner-loop om ingen matchade cell hittas
            }
        }
    }
}
     }

     const checkForTie = (boards) => {
        let isBoardFull = true;

        for (let row of boards) {
            for (let cell of row) {
              if (cell === 0) {  // 0 represents an empty tile in this case
                isBoardFull = false;
                break;  // Exit the loop early if an empty tile is found
              }
            }
            if (!isBoardFull) {
              break;  // Exit the loop early if an empty tile is found
            }
          }

          return isBoardFull;
     }

     const tieRestart = () => {
        setGameState(data.state.tie)
        setGameOver(true);
        setRound(0)
        setWinner(null)
        setBoards(Array(17).fill(null).map(() => Array(17).fill(0)))
     }

    useEffect(() => {
        setBoards(data.board.tiles);
        setGameId(data.id)
    }, []);

    return (
        <>
        <CenteredWrapper>
        <Header>GOMOKU</Header>

        </CenteredWrapper>

        <Container>

        <Frame>
        <Navigationbar>
        <button onClick={tieRestart}>QUIT GAME</button>
        <button onClick={resetGame}>NEW GAME</button>
    </Navigationbar>
    <BoardWrapper>
                <Board>
                 {/* Loopa igenom varje row i boards arrayen */}
                 {boards.map((row, rowIndex) => (
                     row.map((col, colIndex) => (
                     <Tile key={`${rowIndex}-${colIndex}`}>
                       {rowIndex >= 1 && colIndex >= 1 && rowIndex <= 16 && colIndex <= 16 && (
                           <Klick key={`${rowIndex}-${colIndex}`} onClick={move(rowIndex, colIndex)}>
                              <Kryss>{col === player1 ? "X" : col === player2 ? "O" : ""}</Kryss>
                          </Klick>
                           )}
                     </Tile>
                      ))
                    ))}

                </Board>
                <Result>
                <div>Round: {round}</div>
         {/* Display current player namn, id och vem som vinner */}
            <div>Tur att spela: {getCurrentPlayer().name} hurry ffs!!!!! We're waiting</div>


            {gameOver && (
  winner ? (

        <VictoryHeader> {winner.name} won this game. </VictoryHeader>

  ) : (
    <TieContainer>
    <TieHeader>GAME OVER!</TieHeader>
    <TieBody>
      <p>The game is a tie, we got no winner ☹ Do you want to play again?</p>
      <button onClick={resetGame}>Yaaas</button>
      <button onClick={() => window.location.href = "/"}>No no man</button>
      </TieBody>
      </TieContainer>
  )
)}
        </Result>
        </BoardWrapper>
                </Frame>
                <RulesContainer>
    <h2>Spelregler</h2>
    <div>
      The player with the X checkers always plays first and must place the first checker at the central intersection of the board. The player with O checkers follows by placing the checker at one of the eight intersections adjacent to the black one. Once placed, the checkers cannot be moved or removed from the board.
    </div>
    <ol>
      <li>The goal is to align 5 checkers of the same color, vertically, horizontally, or diagonally.</li>
      <li>The player who starts has a slight advantage over the opponent. Therefore, it is preferable to play an even number of games, alternating the first player.</li>
    </ol>
  </RulesContainer>
                </Container>
                </>

    );
}


export default Gameboard;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 20vh; /* Take up full viewport height */
  margin-top: 10vh;
`;


const Header = styled.h1`
  text-align: center;
  font-size: 5em;
  color: #333;
  padding: 0.5em 0;
  width: 50%;
  margin-bottom: 1em;
  background-color: #f0f0f0;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;

  @media only screen and (max-width: 767px) {
    width:200px;
    font-size: 2em;
    margin-top: 0px;

  }

`;

const Navigationbar = styled.div`
    border: 2px solid black;
    border-bottom: none;
    width: 100%;



    button {
        margin: 5%;
        background-color: black;
        color: white;
        width: 40%;
        height: 30px;

    }
`;


const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 5%;
  gap: 10px;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    padding: 0%;
  }
`;

const RulesContainer = styled.div`
  width: 400px;
  padding: 20px;
  border: 2px solid black;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-left: 20px;
  height: fit-content;

  @media only screen and (max-width: 767px) {
    width:280px;
    margin-top: 10%;
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  gap: 0%;
  /* width: 370.5px; */
  width:100%;

  @media only screen and (max-width: 767px) {
    width:280px;
    font-size: 2em;

  }

`;

const BoardWrapper = styled.div`
  position: relative; // Set positioning context for absolute children
  width: 100%; // Set to the width of the parent container
  max-width: 371px; // Optional: set a max-width as needed
`;

const Tile = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid grey;
  position: relative; /* Set positioning context */
  background-color: black;


`;
const Kryss = styled.span`
  color: white;
  font-size: x-large;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`;

const Klick = styled.div`
  background-color: none ;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -50%;
  margin-left: -50%;
`;

const Result = styled.div`
font-style: oblique;

`

const VictoryContainer = styled.div`
width: 80%;
height: 30vh;
background-color: #f0f0f0;
position: absolute; // Position it over the Board
  top: 50%; // Center vertically
  left: 50%; // Center horizontally
  transform: translate(-50%, -50%); // Offset by its own dimensions
  z-index: 10; // Ensure it's above the Board
  padding: 20px; // Add some padding around the content
  border-radius: 2px; // Optional: round the corners
  display: flex; // Use flexbox for centering content
  flex-direction: column; // Stack children vertically
  align-items: center; // Center children horizontally
  justify-content: center; // Center children vertically
  box-sizing: border-box; // Include padding in height & width
  opacity: 0.9px;
`

const VictoryHeader = styled.h4`
font-size: 20px;
`
const VictoryBody = styled.p`
font-size: 20px;
`

const TieBody = styled.p`
margin-top: 0px;
font-size: 20px;
`

const TieHeader = styled.h4`
margin-bottom: 0px;
font-size: 20px;
`

const TieContainer = styled.div`
width: 80%;
height: 30vh;
background-color: rgba(240, 240, 240, 0.9);
position: absolute; // Position it over the Board
  top: 50%; // Center vertically
  left: 50%; // Center horizontally
  transform: translate(-50%, -50%); // Offset by its own dimensions
  z-index: 10; // Ensure it's above the Board
  padding: 10px; // Add some padding around the content
  border-radius: 2px; // Optional: round the corners
  display: flex; // Use flexbox for centering content
  flex-direction: column; // Stack children vertically
  align-items: center; // Center children horizontally
  justify-content: center; // Center children vertically
  box-sizing: border-box; // Include padding in height & width
  opacity: 0.6px;

`

const Frame = styled.div`
background-color: yell;
width: 74.2%;
  max-width: 371px;


  @media only screen and (max-width: 767px) {
    width:280px;

  }
`
