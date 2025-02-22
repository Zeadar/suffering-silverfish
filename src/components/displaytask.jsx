import React from "react"
import "./common.css"
import "./displaytask.css"
import { useState } from "react"

function deleteTask(id, handleDeleteTask) {
    const authority = window.localStorage.getItem("authority")

    if (!authority) {
        throw new Error("Not logged in")
    }

    fetch("/api/task", {
        method: "DELETE",
        headers: {
            Authority: authority,
        },
        body: JSON.stringify({
            id: id,
        }),
    })
        .then(() => {
            console.log("removed", id)
            handleDeleteTask()
        })
        .catch((err) => {
            console.error(err)
        })
}

function MarkCompleteButton(id, completeDate, handleTaskUpdate) {
    async function markComplete() {
        const authority = window.localStorage.getItem("authority")
        const headers = new Headers()
        headers.append("Authority", authority)

        await fetch("/api/complete_task", {
            method: "POST",
            headers,
            body: JSON.stringify({
                task_id: id,
                completed: completeDate.toISOString().slice(0, 10),
            }),
        })
    }

    return (
        <button
            className="standardbutton"
            onClick={async () => {
                await markComplete()
                handleTaskUpdate()
            }}
        >
            Mark as Done
        </button>
    )
}

function UnmarkCompleteButton(id, handleTaskUpdate) {
    async function unMarkComplete() {
        const authority = window.localStorage.getItem("authority")
        const headers = new Headers()
        headers.append("Authority", authority)

        await fetch("/api/complete_task", {
            method: "DELETE",
            headers,
            body: JSON.stringify({
                id: id,
            }),
        })
    }
    return (
        <button
            className="standardbutton"
            onClick={async () => {
                await unMarkComplete()
                handleTaskUpdate()
            }}
        >
            Mark as Undone
        </button>
    )
}

function NormalInterface(task, toggleModeHandler, handleTaskUpdate) {
    const { id, title, description, due } = task
    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    const markCompleteButton = MarkCompleteButton(id, due, handleTaskUpdate)
    const unmarkCompleteButton = UnmarkCompleteButton(task.completeId(due), handleTaskUpdate)

    const dueDisplay = due.toDateString()
    const dueClass = (() => {
        if (due < today) {
            return "overdue"
        }

        if (due > today) {
            return "underdue"
        }

        return "normaldue"
    })()

    return (
        <div className="taskflexy">
            <div className="group leftgroup">
                <span className={`${dueClass} lefttitle`}>{title}</span>
                <span className=""> {description}</span>
            </div>
            <div className="group rightgroup">
                <span className={`${dueClass} rightgroup righttext`}>{dueDisplay}</span>
                <div className="rightgroup rightbuttons">
                    <button className="standardbutton" onClick={toggleModeHandler}>
                        Edit
                    </button>
                    {task.completeId(due) ? unmarkCompleteButton : markCompleteButton}
                </div>
            </div>
        </div>
    )
}

function EditInterface(task, toggleModeHandler, deleteTaskHandler) {
    return (
        <div className="taskFlexy">
            <div className="rightgroup rightbuttons">
                <button className="standardbutton" onClick={toggleModeHandler}>
                    back
                </button>
                <button className="standardbutton">Save changes</button>
                <button
                    className="standardbutton"
                    onClick={() => {
                        deleteTask(task.id, deleteTaskHandler)
                        toggleModeHandler()
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

const DisplayTask = ({ task, even, handleTaskUpdate }) => {
    const [mode, setMode] = useState("normal")
    const colorClass = even ? "even" : "odd"
    const normalInterface = NormalInterface(
        task,
        () => {
            setMode("edit")
        },
        handleTaskUpdate,
    )
    const editInterface = EditInterface(
        task,
        () => {
            setMode("normal")
        },
        handleTaskUpdate,
    )

    function Displayer(mode = "normal") {
        switch (mode) {
            case "normal":
                return normalInterface
            case "edit":
                return editInterface
            default:
                return <div>herp derp</div>
        }
    }

    return <div className={"taskrow " + colorClass}>{Displayer(mode)}</div>
}

export default DisplayTask
