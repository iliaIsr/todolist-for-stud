import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | "completed" | "active"

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {


    function removeTask(id: string, todolistId: string) {
        debugger
        let tasks = tasksObj[todolistId]

        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;//как сохранили tasksObj в начальном значении?
        setTasks({...tasksObj})//тут поменяли -запихнули
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task)
            task.isDone = isDone;
        setTasks({...tasksObj})
    }



    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }


    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to lern", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let removeTodolist=(todolistId:string)=>{
        let filteredTodolist=todolists.filter(tl=>tl.id!==todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [{id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redax", isDone: false}],
        [todolistId2]: [{id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Apple", isDone: false},]
    })

    return (
        <div className="App">
            <AddItemForm addItem={(title:string)=>{alert(title)}}/>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;

