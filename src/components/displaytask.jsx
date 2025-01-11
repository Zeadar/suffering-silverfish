import React from "react"
import "./common.css"
import "./displaytask.css"

const DisplayTask = ({ task, even, handleDeleteTask }) => {
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

    return (
        <div className={"taskrow " + colorClass}>
            <div className="taskflexy">
                <span className="normaldue">{title}</span>
                <span className={dueClass}>{dueDisplay}</span>
            </div>
            <div className="taskflexy">
                <span className="normalue">{description}</span>
                <button
                    className="standardbutton"
                    onClick={() => {
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
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DisplayTask
