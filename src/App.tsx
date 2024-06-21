import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
export type FilterValuesType= 'all'|"completed"|"active"
function App() {
    let [tasks,setTasks]=useState<Array<TasksType>>([
        {id:v1(), title:"CSS", isDone:true},
        {id:v1(), title:"JS", isDone:true},
        {id:v1(), title:"React", isDone:false},
        {id:v1(), title:"Redax", isDone:false},
    ])
    let [filter, setFilter]=useState('all')


    function removeTask(id:string){
      let filteredTasks=tasks.filter(t=>t.id!==id)
        setTasks(filteredTasks)
    }

    function addTask (title:string){
    let newTask={id:v1(), title:title, isDone:false}
        let newTasks=[newTask,...tasks]
        setTasks(newTasks)
    }

    function changeFilter(value:FilterValuesType){
        setFilter(value)//value презаписывает знач filter?
    }


        let tasksForTodolist=tasks;//ссылочный тип?
        if(filter==="completed"){
            tasksForTodolist=tasks.filter(t=>t.isDone)
        }
        if(filter==="active"){
            tasksForTodolist=tasks.filter(t=>!t.isDone)
        }





  return (
    <div className="App">
      <Todolist title={"What to lern"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}

      />
    </div>
  );
}

export default App;
