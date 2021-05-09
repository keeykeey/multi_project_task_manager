import React from 'react';
import './components.css';

interface Props{
  project_name: string
}

const ProjectButton: React.FC<Props> = (props) => {
  return (
      <button className='ProjectButton'> { props.project_name } </button>
  );
}

export default ProjectButton;
