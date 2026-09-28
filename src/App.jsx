import { useState } from 'react';
import './App.css'

function App() {
let [currentPlayer, setCurrentPlayer] = useState('X');
let [statusMessage, setStatusMessage] = useState(null);
let [gameOver, setGameOver] = useState(false);

const [board, setBoard] = useState(Array(9).fill(''));

  const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const checkWinner = (board) => {
  for(let pattern of winningPatterns){
    const [a,b,c] = pattern;

    if(
      board[a] !== '' &&
      board[a] === board[b] &&
      board[b] === board[c]
    ){
      setStatusMessage(`Congratulations! ${board[a]} is the winner.`);
      setGameOver(true);
      return;
    }


   
  }


    if(board.every((cell)=> cell !=='')){
      setStatusMessage('Match Draw');
      setGameOver(true);
      return;
    }
}

const handleClick = (index)=>{
  if(gameOver || board[index] !=='')return;
  setBoard((prev)=>{
      const newBoard = [...prev];
      newBoard[index] = currentPlayer;
      checkWinner(newBoard);
      return newBoard;
  });

  setCurrentPlayer((prev)=> prev==='X'? 'O' : 'X');
  
}
  
  return(

    <main> <h1>Tic Tac Toe </h1>
        <div >

        <p id="msg">{statusMessage}</p>
        <p>Turn:{currentPlayer}</p>
        </div>

    <div className="container">

    <div className="board">
    
     { board.map((value,index)=> (
        <button 
        className={`cell ${value}`}
        key={index}
        onClick={()=>handleClick(index)}
        >
          {value}

        </button>
     ))


    }
    </div>
    </div>

    <button className='newGame' onClick={ ()=>{
      setGameOver(false)
      setBoard(Array(9).fill(''));
      setStatusMessage(null);
      setCurrentPlayer('X');


    }}>New Game</button>

</main>
  )
}

export default App
