import ToggleSwitch from './ToggleSwitch';

import './Menu.css';

function Menu(props) {
  return (
    <>
      <nav className='app__menu-container'>
        <div className='app__menu-left'></div>
        <h2>WÖRDLE</h2>
        <ToggleSwitch
          label='Only unique letters?'
          handleUniqueLetters={props.handleUniqueLetters}
        />
      </nav>
    </>
  );
}

export default Menu;
