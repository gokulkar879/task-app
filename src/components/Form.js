import React, { useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useUserContext } from '../UserContext';
import { databases } from '../appwrite';
import { ID } from 'appwrite';
import { useTaskContext } from '../TaskContext';

function Form() {
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(0);
    const [title, setTitle] = useState('');
    const { currentUser } = useUserContext();
    const { setSevereTasks, severeTasks } = useTaskContext();

    const handleSubmit = ev => {
        ev.preventDefault();
        if(!title) return;
        let _hours = hours;
        let _minutes = minutes;

        if(!hours) {
          _hours = 1;
        }
        if(!minutes) {
          _minutes = 0;
        }
        
        const totalTime = (parseInt(_hours) * 3600 + parseInt(_minutes) * 60)*1000;

        const _data = {
            'userId': currentUser[`$id`],
            'title': title,
            'deadLine': Date.now() + totalTime,
            'importance': 'severe'
        }

        const promise = databases.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, ID.unique(), _data);

        promise.then(res => {
          setSevereTasks([...severeTasks, res]);
        }).catch(err => {
          console.log(err)
        })
        
    }

  return (
    <form className='Form' onSubmit={handleSubmit}>
        <div className='Form-header'>
            <label>
            <p>Time Limit</p>
            <div className='Form-time'><input type='number' min='0' value={hours} onChange={ev => setHours(ev.target.value)} placeholder='hrs'></input> : <input type="number" min='0' max='60' value={minutes} onChange={ev => setMinutes(ev.target.value)} placeholder='mins'></input></div>
            </label>
            <button type='submit'><AiOutlineFileAdd /></button>
        </div>
       <label>
        <p>Title</p>
        <textarea value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Write your task...'></textarea>
       </label>
    </form>
  )
}

export default Form;