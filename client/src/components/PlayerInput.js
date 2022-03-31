import { useState } from 'react';

import './PlayerInput.css';

function PlayerInput(props) {
  const [playerId, setPlayerId] = useState();

  function handleOnClick() {
    const gameObj = {
      ...props.gameObj,
      playerId: playerId,
    };
    fetch(`/api/highscore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameObj),
    }).then((response) => response.json());
    props.loadHighscores(true);
  }

  function handleOnChange(e) {
    const newPlayerId = e.target.value;
    setPlayerId(newPlayerId);
    props.handleNewPlayerId(newPlayerId);
  }

  return (
    <>
      <h3>What is your alteregos name?!</h3>
      <input type='text' onChange={handleOnChange} />
      <button className='app__playerinput-link' onClick={handleOnClick}>
        REGISTER
      </button>
    </>
  );
}

export default PlayerInput;
