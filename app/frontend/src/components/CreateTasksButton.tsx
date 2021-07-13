import React from 'react';
import './components.css';

interface Props{
  number: number;
}

const CreateTasksButton: React.FC<Props> = (props) => {
  function create(){
    console.log('create')
  }
 
  return (
      <button className='CreateTasksButton' onClick={create}>CREATE </button>
  );
}

export default CreateTasksButton;
