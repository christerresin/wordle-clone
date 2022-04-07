import './GameOver.css';

function GameOver({ gameObj }) {
  return (
    <>
      <div className='app__gameover'>
        <h1>Winner!</h1>
        <div>{gameObj.playerId.toUpperCase()}</div>
        <div>
          Your time was: {(gameObj.gameEnd - gameObj.gameStart).toFixed(0)}s
        </div>
        <div>Number of guesses: {gameObj.guessesCount}</div>
      </div>
      <div className='app__gameover-buttons'>
        <a href='/' className='app__gameover-link'>
          NEW GAME?
        </a>
        <a href='/highscore' className='app__gameover-link'>
          Highscores
        </a>
      </div>
    </>
  );
}

export default GameOver;
