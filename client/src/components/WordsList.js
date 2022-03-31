import ListItem from './ListItem';

import './WordsList.css';

function WordsList(props) {
  return (
    <>
      <div className='app__wordList'>
        <ul className='app__wordsList-container'>
          {props.guessedWords
            ? props.guessedWords.map((word, index) => {
                return <ListItem key={index} word={word} />;
              })
            : null}
        </ul>
        <ul className='app__wordsList-container'>
          <ul className='app__wordsList-item'>
            {[...Array(props.wordLength)].map((word, index) => {
              return (
                <li className='app__wordsList-letterBox incorrect' key={index}>
                  {props.currentGuess[index]
                    ? props.currentGuess[index].toUpperCase()
                    : null}
                </li>
              );
            })}
          </ul>
        </ul>
      </div>
    </>
  );
}

export default WordsList;
