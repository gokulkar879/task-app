import React, { useContext, useEffect, useState } from "react";
import { account } from './appwrite.js';

const UserContext = React.createContext();


const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState('');
    const [sessionId, setSessionId] = useState('');

    const logout = () => {
        const promise = account.deleteSession(sessionId);

        promise.then(res => {
            setSessionId('');
            setCurrentUser('');
        }).catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {

        try {
            const _session = account.getSession('current')

            _session.then(res => {
                setSessionId(res['$id']);
                const promise = account.get();
    
                promise.then(res => {
                    setCurrentUser(res)
                }).catch(err => {
                    console.log(err)
             })
            }).catch(err => {
                console.log(err);
            })
        } catch(err) {

        }


    }, [])
    return <UserContext.Provider value={{
        currentUser,
        setCurrentUser,
        sessionId,
        setSessionId,
        logout
    }}>
        {
            children
        }
    </UserContext.Provider>
}

export const useUserContext = () => {
    return useContext(UserContext);
}

export default UserProvider;