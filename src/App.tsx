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

    const changeStatus=(taskId:string,isDone:boolean)=>{
       let task=tasks.find(t=>t.id===taskId)
       //нашли, записали в task
        if(task){
            task.isDone=isDone;
        }
        setTasks(tasks)//как task попадает в перерисовку?? find не мутаб
    }
    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }


        let tasksForTodolist=tasks;
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
                changeTaskStatus={changeStatus}

      />
    </div>
  );
}

export default App;
