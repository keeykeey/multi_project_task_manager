import React from 'react';

interface Users{
  id: string
  name: string
}

const Header: React.FC<Users> = (props) =>{
  return (
    <div >
      <h1>
        <button><i className="fas fa-bars"/>Menu</button>
        Hello {props.name}
      </h1><hr/>
    </div>
  );
}

export default Header;
