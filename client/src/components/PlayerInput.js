import { useState } from 'react';

import './PlayerInput.css';

function PlayerInput(props) {
  const [playerId, setPlayerId] = useState();

  const handleOnClick = async () => {
    const gameObj = {
      ...props.gameObj,
      playerId: playerId,
    };
    const res = await fetch(`/api/highscore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameObj),
    });
    const data = await res.json();
    props.handleNewHighscoreEntry(data);
    props.loadHighscores(true);
  };

  const handleOnChange = (e) => {
    const newPlayerId = e.target.value;
    setPlayerId(newPlayerId);
    props.handleNewPlayerId(newPlayerId);
  };

  return (
    <>
      <h2>YOU WON!</h2>
      <input
        type='text'
        onChange={handleOnChange}
        placeholder='Enter your name'
      />
      <button className='app__playerinput-link' onClick={handleOnClick}>
        REGISTER HIGHSCORE
      </button>
    </>
  );
}

export default PlayerInput;
