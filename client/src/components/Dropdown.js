import { useState } from 'react';

import './Dropdown.css';

function Dropdown(props) {
  const [value, setValue] = useState(props.wordLength);

  const menuItems = [
    {
      label: 'Play with 4-letter words',
      value: 4,
    },
    {
      label: 'Play with 5-letter words',
      value: 5,
    },
    {
      label: 'Play with 6-letter words',
      value: 6,
    },
  ];

  const handleChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    setValue(selectedValue);
    props.handleWordLength(parseInt(selectedValue));
  };

  return (
    <>
      <div className='app__dropdown-container'>
        <label>
          How many letters?
          <select
            value={value}
            onChange={handleChange}
            className='app__dropdown-list'
          >
            {menuItems.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    </>
  );
}

export default Dropdown;
