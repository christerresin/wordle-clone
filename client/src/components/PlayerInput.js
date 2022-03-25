import { useState } from 'react';

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
    setPlayerId(e.target.value);
  }

  return (
    <>
      <input type='text' onChange={handleOnChange} />
      <button onClick={handleOnClick}>REGISTER</button>
    </>
  );
}

export default PlayerInput;
