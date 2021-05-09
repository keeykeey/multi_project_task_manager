import React from 'react';
import './components.css';

interface Props{
  text: string
}

const TaskCard: React.FC<Props> = (props) => {
  return (
    <button className='TaskCard' >{ props.text }</button>
  );
}

export default TaskCard;
