import './GameOver.css';

function GameOver({ gameObj }) {
  console.log(gameObj);
  return (
    <>
      <div className='app__gameover'>
        <h3>Winner!</h3>
        <p>{gameObj.playerId}</p>
        <p>
          Your time was: {(gameObj.gameEnd - gameObj.gameStart).toFixed(0)}s
        </p>
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
