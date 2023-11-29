import React, {useEffect, useState} from "react";
import axios from "axios";


const EditModal  = ({handleSave, idTodo, url, setOpen}) => {
    const [todo, setTodo] = useState({})
    useEffect(() => {
        axios.put(`${url}/${idTodo}`)
            .then(({data}) => {
                setTodo(data)
            })
    }, [idTodo]);

    const handleEdit = (e) => {
        setTodo({...todo, completed: e.target.checked, completedAt: new Date()})

    }


    return (
        <div>
            <input value={todo.title} onChange={(e) => {
                setTodo({...todo, title: e.target.value})
            }} type="text"/>
            <input onChange={handleEdit} checked={todo.completed} type='checkbox'/>
            <div>
                <button onClick={() => handleSave(todo)}>
                    Save
                </button>
                <button onClick={() => setOpen(false)}>
                    Close
                </button>
            </div>
        </div>
    )
}


export default EditModal