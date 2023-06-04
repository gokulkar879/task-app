import React, { useState } from 'react';
import { account } from '../appwrite';
import { ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = ev => {
        ev.preventDefault();

        if(!useremail || !password || !username) return;

        const promise = account.create(
            ID.unique(),
            useremail,
            password,
            username
        )
        promise.then((res) => {
            navigate("/login", {replace: true});
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <form className='register' onSubmit={register}>
       <h1>Register</h1>
       <input className='a-input'
             type="text"
             placeholder="username"
             required
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
       <input className='a-input'
             type="text"
             placeholder="email"
             required
             value={useremail}
             onChange={ev => setUseremail(ev.target.value)}/>
      <input className='a-input'
             type="password"
             placeholder="password"
             required
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button className='a-btn'>Register</button>
    </form>
  )
}

export default RegisterPage