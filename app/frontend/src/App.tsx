import React from 'react';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import Contents from './Contents'

const App: React.FC = () =>  {
  return (
    <div >
      <div className='col'></div>
        <div className='header'> <Header/> </div>
        <div className='row'>
          <div className='sidebar'><Sidebar /> </div>
          <div className='contents'> <Contents/> </div>
        </div>
    </div>
  );
}

export default App;
