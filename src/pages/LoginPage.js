import React, {useState} from 'react';
import { account } from '../appwrite';
import { ID } from 'appwrite';
import { useUserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setCurrentUser, setSessionId } = useUserContext();

    const login = ev => {
        ev.preventDefault();
        if(!useremail || !password) return;

        const promise = account.createEmailSession(
            useremail,
            password
        );

        promise.then(function (response) {
          setSessionId(response['$id']);

          const _user = account.get();

          _user.then(res => {
            setCurrentUser(res);
            navigate('/', {replace: true});
          }).catch(err => {
            console.log(err);
          })
        }, function (error) {
            console.log(error);
        });
    }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input className='a-input'
             type="text"
             placeholder="email"
             value={useremail}
             onChange={ev => setUseremail(ev.target.value)}/>
      <input  className='a-input'
             type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button className='a-btn'>Login</button>
    </form>
  )
}

export default LoginPage