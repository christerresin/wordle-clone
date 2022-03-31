import './ToggleSwitch.css';

function ToggleSwitch(props) {
  const handleToggleChange = () => {
    props.handleUniqueLetters();
  };

  return (
    <>
      {props.label}{' '}
      <div className='app__toggle-container'>
        <div className='app__toggle-switch' onChange={handleToggleChange}>
          <input
            type='checkbox'
            className='app__toggle-checkbox'
            name={props.label}
            id={props.label}
          />
          <label className='app__toggle-label' htmlFor={props.label}>
            <span className='inner' />
            <span className='switch' />
          </label>
        </div>
      </div>
    </>
  );
}

export default ToggleSwitch;
