import React from 'react';
import './components.css';

interface Props{
  project_id: number;
  project_name:string;
  handle_project_change:Function;
}

const ProjectButton: React.FC<Props> = (props) => {
  return (
      <button className='ProjectButton' onClick={()=>props.handle_project_change(props.project_id)}> { props.project_name } </button>
  );
}

export default ProjectButton;
