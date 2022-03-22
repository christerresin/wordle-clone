import './ListItem.css';

function ListItem({ word }) {
  return (
    <ul className='app__wordsList-item'>
      {word.map((obj, index) => {
        return (
          <li
            className={`app__wordsList-letterBox ${obj.result}`}
            key={obj.letter + index}
          >
            {obj.letter.toUpperCase()}
          </li>
        );
      })}
    </ul>
  );
}

export default ListItem;
