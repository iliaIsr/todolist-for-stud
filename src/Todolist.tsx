import {FilterValuesType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TasksType = {
    id: string
    title: string,
    isDone: boolean
}
export type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (tiltle: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDown}/>
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTask(t.id)
                            }
                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={onRemoveHandler}>x
                                    </button>
                                </li>
                            )
                        }
                    )
                }</ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}