import React, { useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { client, databases } from "./appwrite";
import { Query } from "appwrite";



const TaskContext = React.createContext();


const TaskProvider = ({children}) => {
    const {currentUser} = useUserContext();
    const [tasks, setTasks] = useState([]);
    const [severeTasks, setSevereTasks] = useState([]);
    const [moderateTasks, setModerateTasks] = useState([]);
    const [lowTasks, setlowTasks] = useState([]);


    useEffect(() => {
        if(currentUser) {
            const promise = databases.listDocuments(
                process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID,
                [
                    Query.equal('userId', `${currentUser['$id']}`)
                ]
              )
        
              promise.then(res => {
                setTasks(res);
                const _severeTasks = res.documents.filter(task => (task.importance == 'severe'));
                const _moderateTasks = res.documents.filter(task => (task.importance == 'moderate'));
                const _lowTasks = res.documents.filter(task => (task.importance == 'low'))
        
                setSevereTasks(_severeTasks);
                setModerateTasks(_moderateTasks);
                setlowTasks(_lowTasks);
              }).catch(err => {
                console.log(err);
              })
                
        }

    }, [currentUser])

    return <TaskContext.Provider value={{
        severeTasks,
        moderateTasks,
        lowTasks,
        setSevereTasks,
        setModerateTasks,
        setlowTasks
    }}>
        {
            children
        }
    </TaskContext.Provider>
}

export const useTaskContext = () => {
    return useContext(TaskContext);
}

export default TaskProvider;