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
type TasksStateType={
    [key:string]:TasksType[]
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
    const changeTaskTitle = (taskId: string, newTitle:string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task)
            task.title=newTitle;
        setTasks({...tasksObj})
    }



    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    const changeTodolistTitle = (id:string,newTitle:string)=>{
        const todolist=todolists.find(tl=>tl.id===id);
        if(todolist){
            todolist.title=newTitle
            setTodolists([...todolists])//еще раз проговорить
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

    let [tasksObj, setTasks] = useState <TasksStateType>({
        [todolistId1]: [{id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redax", isDone: false}],
        [todolistId2]: [{id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Apple", isDone: false},]
    })

    function addTodolist(title:string){
        debugger
        let todolist:TodolistType={
            id:v1(),
            title: title,
            filter:"all"
        };

        setTodolists([todolist,...todolists])
        setTasks({
            ...tasksObj,
        [todolist.id]:[]
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;

