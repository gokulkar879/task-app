import React, { useEffect, useState } from 'react';
import Task from '../components/Task';
import Form from '../components/Form';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { data } from '../data.js';
import { databases } from '../appwrite.js';
import { ID } from 'appwrite';
import { useTaskContext } from '../TaskContext';

function HomePage() {

    const { severeTasks,
            moderateTasks,
            lowTasks,
            setSevereTasks,
            setModerateTasks,
            setlowTasks } = useTaskContext();
    
    const getDestinationArray = (id) => {
        if(id == 'severe') return severeTasks;
        else if(id == 'moderate') return moderateTasks;
        else return lowTasks;
    }

    const getSourceArray = (id) => {
        if(id == 'severe') return severeTasks;
        else if(id == 'moderate') return moderateTasks;
        else return lowTasks;
    }

    const handleDragEnd = ({ destination, source }) => {
        if(!destination || source.droppableId == destination.droppableId ) {
            return;
        }
        const srcId = source.droppableId;
        const dstId = destination.droppableId;
        const srcIndex = source.index;
        const dstIndex = destination.index;
        const srcArray = getSourceArray(srcId);
        const dstArray = getDestinationArray(dstId);
        const item = srcArray[srcIndex];
        item.importance = dstId;
        srcArray.splice(srcIndex, 1);
        dstArray.splice(dstIndex, 0, item);

        if(srcId == 'severe') setSevereTasks(srcArray);
        else if(srcId == 'moderate') setModerateTasks(srcArray);
        else setlowTasks(srcArray);

        if(dstId == 'severe') setSevereTasks(dstArray);
        else if(dstId == 'moderate') setModerateTasks(dstArray);
        else setlowTasks(dstArray);

        const promise = databases.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, item['$id'], {'importance': dstId});

        promise.then(res => {
            // console.log(res)
        }).catch(err => {
            // console.Console.log(err);
        })

  }



  return (
    <div className='homePage'>
        <Form />
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='home-tasks-center'>
                <Droppable droppableId="severe">
                    {
                        (provided) => (
                            <div className='severe' {...provided.droppableProps} ref={provided.innerRef}>
                                <div className='home-tasks'>
                                    <div className='header-red'></div>
                                    <div className='tasks-center'>
                                        {
                                            severeTasks.map((task, index) => {
                                                const {title, $id, importance, userId, deadLine } = task;
                                                return (
                                                    <Draggable key={$id} draggableId={$id} index={index}>
                                                        {
                                                           (provided) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <Task title={title} deadLine={deadLine} id={$id} importance={importance}/>
                                                            </div>
                                                           )
                                                        }
                                                    </Draggable>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {
                                    provided.placeholder
                                }
                            </div>
                        )
                    }
                </Droppable>
                <Droppable droppableId="moderate">
                    {
                        (provided) => (
                            <div className='moderate'  {...provided.droppableProps} ref={provided.innerRef}>
                                <div className='home-tasks'>
                                    <div className='header-orange'></div>
                                    <div className='tasks-center'>
                                        {
                                            moderateTasks.map((task, index) => {
                                                const {title, $id, importance, userId, deadLine } = task;

                                                return <Draggable key={$id} draggableId={$id} index={index}>
                                                    {
                                                        (provided) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <Task title={title} id={$id} deadLine={deadLine} importance={importance}/>
                                                            </div>
                                                        )
                                                    }

                                                </Draggable>
                                            })
                                        }
                                    </div>
                                </div>
                                {
                                    provided.placeholder
                                }
                            </div>
                        )
                    }
                    
                </Droppable>
                <Droppable droppableId="low">
                    {
                        (provided) => (
                            <div className='low' {...provided.droppableProps} ref={provided.innerRef}>
                                <div className='home-tasks'>
                                    <div className='header-green'></div>
                                    <div className='tasks-center'>
                                        {
                                            lowTasks.map((task, index) => {
                                                const {title, $id, importance, userId, deadLine } = task;

                                                return (
                                                    <Draggable key={$id} draggableId={$id} index={index}>
                                                        {
                                                            (provided) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    <Task title={title} id={$id} deadLine={deadLine} importance={importance}/>
                                                                </div>
                                                            )
                                                        }
                                                    </Draggable>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {
                                    provided.placeholder
                                }
                            </div>
                        )
                    }

                </Droppable>
            </div>
        </DragDropContext>
    </div>
  )
}

export default HomePage