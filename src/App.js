import React, {useEffect, useState} from "react";
import axios from "axios";
import {findAllByDisplayValue} from "@testing-library/react";
import dayjs from "dayjs";

function App() {
    const url = `https://656426d1ceac41c0761d83f4.mockapi.io/Todo-list`
    const [todos, setTodos] = useState([])
    const [todoAdd,setTodoAdd] = useState('')
    useEffect(() => {
        axios.get(url)
            .then(({data}) => setTodos(data))
    }, []);

    useEffect(() => {
        axios.get(url)
            .then(({data})=>setTodos(data))
    }, []);
    console.log(todos)
    const handleAddTodo = ()=>{
        const newTodo = {
            title: todoAdd,
            completed: false,
            creatEdit: null,
            completedAt: +new Date()

        }
        setTodoAdd('')
        axios.post(url,newTodo)
            .then(({data})=>setTodos([...todos,data]))
    }

    const handleDeleteTodo = (todo)=>{
        axios.delete(`${url}/${todo.id}`, todo)
            .then(({data})=>setTodos(todos.filter((todo)=>todo.id!==data.id)))
    }


    return (
        <div className={'container'}>
            <h1>Todo list</h1>
            <div className="box-add">
                <input type="text" onChange={(e)=> setTodoAdd(e.target.value)}/>
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <div className={'box'}>
                {
                    todos.map(todo =>
                        <div key={todo.id} className={'todo-box'}>
                            <div className={'todo-title'}>
                                <h3>{todo.title}</h3>
                                <input type="checkbox" checked={todos.completed}/>
                            </div>
                            <span>
                            {dayjs(todo.completedAt).format('HH:mm MM/DD/YYYY')}
                        </span>
                            <button onClick={()=>handleDeleteTodo(todo)} className={'btn-del'}>
                                Delete
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default App;
