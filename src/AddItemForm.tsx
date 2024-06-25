import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemPropsType={
    addItem:(title:string)=>void
}



export function AddItemForm (props:AddItemPropsType){
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            props.addItem(title)
            setTitle("")
        }
    }
    const addTask = () => {

        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Field titled is required")
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onNewTitleChangeHandler}
                   onKeyDown={onKeyDown}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+
            </button>
            {error && <div className={"error-message"}>Field is required</div>}
        </div>
    )
}