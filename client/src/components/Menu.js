function Menu({ menuItems }) {
  return (
    <>
      <ul className='app__menu'>
        {menuItems.map((item) => {
          return (
            <li
              className={`app__menu-item ${item.active ? 'selected' : ''}`}
              key={item.label}
            >
              <a href={item.link}>{item.label}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Menu;
