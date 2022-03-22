import ListItem from './ListItem';

import './WordsList.css';

function WordsList(props) {
  return (
    <ul className='app__wordsList-container'>
      {props.guessedWords
        ? props.guessedWords.map((word, index) => {
            return <ListItem key={index} word={word} />;
          })
        : null}
    </ul>
  );
}

export default WordsList;

/*

      {props.result.map((obj, index) => {
        return (
          <li className={obj.result} key={obj.letter + index}>
            {obj.letter.toUpperCase()}
          </li>
        );
      })}

*/
