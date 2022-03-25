import './HighscoresList.css';

function HighscoresList({ highscores }) {
  return (
    <>
      <h1>HIGHSCORES</h1>
      <ul className='app__highscoreslist-container'>
        {highscores.map((highscore, id) => {
          return (
            <li className='app__highscoreslist-item' key={highscore + id}>
              <p>
                {id + 1} . {highscore.playerId}
              </p>
              <p>{highscore.gameDuration}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default HighscoresList;
