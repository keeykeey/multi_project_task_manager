import React from 'react';
import ProjectButton from './components/ProjectButton'

const Sidebar: React.FC = () => {
  return (
    <div >
      <ProjectButton project_name='count_infected'/><br/>
      <ProjectButton project_name='task_manager'/><br/>
      <ProjectButton project_name='song_editor'/><br/>
      <ProjectButton project_name='create api wih golang'/>
    </div>
  );
}

export default Sidebar;
