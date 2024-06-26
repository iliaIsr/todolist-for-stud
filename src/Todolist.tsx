import {FilterValuesType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TasksType = {
    id: string
    title: string,
    isDone: boolean
}
export type PropsType = {
    id:string
    title: string
    tasks: TasksType[]
    removeTask: (id: string, todolistId:string) => void
    changeFilter: (value: FilterValuesType,todolistId:string) => void
    addTask: (tiltle: string,todolistId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todolistId:string) => void
    filter: FilterValuesType
    removeTodolist:(todolistId:string)=>void
    changeTaskTitle:(id:string,newTitle:string, todolistId:string)=>void
    changeTodolistTitle:(id:string,newTitle:string)=>void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all",props.id)
    const onActiveClickHandler = () => props.changeFilter("active",props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed",props.id)
    const removeTodolist=()=>{
        props.removeTodolist(props.id)
    }
const addTask=(title:string)=>{

        props.addTask(title,props.id)
}

    const changeTodolistTitle =(newTitle:string)=>{

            props.changeTodolistTitle(props.id, newTitle)

    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                            const onClickHandler = () => {
                                props.removeTask(t.id,props.id)
                            }
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)
                            }

                        const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                            return (
                                <li key={t.id} className={t.isDone? "isDone":""}>
                                    <input type="checkbox"
                                           onChange={onChangeStatusHandler}
                                           checked={t.isDone}
                                    />
                                    {/*<span>{t.title}</span>*/}
                                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                    {/*value мы на самом деле не передаем, а вводим для приема из дочерней компоненты*/}
                                    <button onClick={onClickHandler}>x
                                    </button>
                                </li>
                            )
                        }
                    )
                }</ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

