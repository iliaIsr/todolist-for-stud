import {FilterValuesType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";


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
}


export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(),props.id)
            setTitle("")
        } else {
            setError("Field titled is required")
        }
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            props.addTask(title, props.id)
            setTitle("")
        }
    }
    const onAllClickHandler = () => props.changeFilter("all",props.id)
    const onActiveClickHandler = () => props.changeFilter("active",props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed",props.id)
    const removeTodolist=()=>{
        props.removeTodolist(props.id)
    }


    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
            <div>
                <input value={title}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDown}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+
                </button>
                {error && <div className={"error-message"}>Field is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const onClickHandler = () => {
                                props.removeTask(t.id,props.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)//все эти е
                            }
                            return (
                                <li key={t.id} className={t.isDone? "isDone":""}>
                                    <input type="checkbox"
                                           onChange={onChangeHandler}
                                           checked={t.isDone}
                                    />
                                    <span>{t.title}</span>
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