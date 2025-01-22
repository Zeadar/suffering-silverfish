import React from "react"
import "./common.css"
import "./displaytask.css"
import { useState } from "react"

const DisplayTask = ({ task, even, handleTaskUpdate }) => {
    const [editMode, setEditmode] = useState(false)
    const colorClass = even ? "even" : "odd"
    const { id, title, description, due } = task
    const dueDisplay = due.toDateString()

    const today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    const dueClass = (() => {
        if (due < today) {
            return "overdue"
        }

        if (due > today) {
            return "underdue"
        }

        return "normaldue"
    })()

    async function markComplete(evt) {
        const authority = window.localStorage.getItem("authority")
        const headers = new Headers()
        headers.append("Authority", authority)

        evt.target.setAttribute("disabled", true)

        await fetch("/api/complete_task", {
            method: "POST",
            headers,
            body: JSON.stringify({
                task_id: id,
                completed: new Date(Date()).toISOString().slice(0, 10),
            }),
        })
        handleTaskUpdate()
    }

    return useState ? (
        <div></div>
    ) : (
        <div className={"taskrow " + colorClass}>
            <div className="taskflexy">
                <div className="group leftgroup">
                    <span className={`${dueClass} lefttitle`}>{title}</span>
                    <span className=""> {description}</span>
                </div>
                <div className="group rightgroup">
                    <span className={`${dueClass} rightgroup righttext`}>
                        {dueDisplay}
                    </span>
                    <div className="rightgroup rightbuttons">
                        <button className="standardbutton">edit</button>
                        <button
                            className="standardbutton"
                            onClick={markComplete}
                        >
                            Mark Complete
                        </button>
                    </div>
                </div>
            </div>
            <div className="taskflexy"></div>
        </div>
    )
}

export default DisplayTask
