import React from 'react';
import TaskCard from './components/TaskCard'

function Contents() {
  return (
    <div >
      <TaskCard text='running every morning'/>
      <TaskCard text='wake up in the morning everyday'/>
      <TaskCard text='get to be familier with kubernetes'/>
      <TaskCard text='to be an sofrware engineer'/>
      <TaskCard text='get the job at modern tech-company'/>
    </div>
  );
}

export default Contents;
