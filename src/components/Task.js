import React, { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { databases } from '../appwrite';
import { useTaskContext } from '../TaskContext';


function Task({title, id, importance, deadLine=1}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { severeTasks,
    moderateTasks,
    lowTasks,
    setSevereTasks,
    setModerateTasks,
    setlowTasks } = useTaskContext();

  const getTime = () => {

      const t = Date.now();
      const time = Math.max(parseInt(deadLine) - t, 0);

      const hrs = Math.floor((time / (1000 * 60 * 60)) % 24);
      const mns = Math.floor((time / 1000 / 60) % 60);
      const scs = Math.floor((time / 1000) % 60);

      if((!hrs) && (!mns) && (!scs)) {
          document.getElementById(id).style.background = "#E8E2E2";
      }
  
      setHours(hrs);
      setMinutes(mns);
      setSeconds(scs);
  }

  const handleDelete_helper = () => {
     if(importance == 'severe') {
      const _temp = severeTasks.filter(task => task['$id'] != id);
      setSevereTasks(_temp);

     } else if(importance == 'moderate') {
      const _temp = moderateTasks.filter(task => task['$id'] != id);
      setModerateTasks(_temp);
     } else {
      const _temp = lowTasks.filter(task => task['$id'] != id);
      setlowTasks(_temp);
     }
  }
  
  const handleDeleteTask = ev => {
    const promise = databases.deleteDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, id);

    promise.then(res => {
      handleDelete_helper();
    }).catch(err => {

    })

  }

  useEffect(() => {
     const interval = setInterval(() => getTime(), 1000);
     return () => clearInterval(interval);
  }, [])

  return (
    <div className='task' id={`${id}`}>
        <p className='task-time'>Time-remaining  <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></p>
        <div className='task-info'>
            <p className='task-title'>{title}</p>
            <button className='task-btn' onClick={handleDeleteTask}><FiTrash /></button>
        </div>
    </div>
  )
}

export default Task;