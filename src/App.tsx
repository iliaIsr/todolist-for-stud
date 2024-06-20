import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {TasksType, Todolist} from "./Todolist";


function App() {
    let [tasks,setTasks]=useState([
        {id:1, title:"CSS", isDone:true},
        {id:2, title:"JS", isDone:true},
        {id:3, title:"React", isDone:false},
        {id:4, title:"Redax", isDone:false},
    ])
    let [filter, setFilter]=useState('all')

    function removeTask(id:number){
      let filteredTasks=tasks.filter(t=>t.id!==id)
        setTasks(filteredTasks)
    }
    function filterTasks(filteredTask:[]){
        let filters=filteredTask,
    }

  return (
    <div className="App">
      <Todolist title={"What to lern"}
                tasks={tasks}
                removeTask={removeTask}

      />
    </div>
  );
}

export default App;
