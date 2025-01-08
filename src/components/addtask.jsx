import React, { useState } from "react"
import "./addtask.css"
import "./common.css"

const AddTask = ({ addTaskHandler }) => {
    const [disabled, setDisabled] = useState(false)

    let assignDate = ""
    let description = ""
    let recurringMonth = false
    let recurringN = 0
    let recurringStop = ""
    let title = ""

    return (
        <div>
            <span className="title">Add Task</span>
            <div className="enterlist">
                <span className="entrytext">Title</span>
                <input
                    type="text"
                    onChange={({ target }) => {
                        title = target.value
                    }}
                />
                <span className="entrytext">Description</span>
                <input
                    type="text"
                    onChange={({ target }) => {
                        description = target.value
                    }}
                />
                <span className="entrytext">Date</span>
                <input
                    type="date"
                    required
                    onChange={({ target }) => {
                        assignDate = target.value
                    }}
                />
                <span className="entrytext">
                    Recurring Monthly
                    <input
                        type="checkbox"
                        onChange={({ target }) => {
                            recurringMonth = target.checked
                            setDisabled(recurringMonth)
                        }}
                    />
                </span>
                <span className="entrytext">Recurring after N days</span>
                <input
                    disabled={disabled}
                    type="number"
                    onChange={({ target }) => {
                        recurringN = parseInt(target.value)
                        console.log(recurringN)
                    }}
                />
                <span className="entrytext">Stop recurring after date</span>
                <input
                    disabled={disabled}
                    type="date"
                    onChange={({ target }) => {
                        recurringStop = target.value
                    }}
                />
            </div>
            <div className="flexy">
                <button
                    className="standardbutton addtaskbutton"
                    onClick={async () => {
                        const authority = window.localStorage.getItem("authority")

                        if (!authority) {
                            throw new Error("Not logged in")
                        }

                        const response = await fetch("/api/task", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authority: authority,
                            },
                            body: JSON.stringify({
                                title: title,
                                description: description,
                                assignDate: assignDate ? assignDate : new Date().toISOString().slice(0, 10),
                                recurringMonth: recurringMonth,
                                recurringN: recurringN,
                                recurringStop: recurringStop ? recurringStop : new Date().toISOString().slice(0, 10),
                            }),
                        })

                        if (response.ok) {
                            addTaskHandler(true)
                        } else {
                            console.log(await response.json())
                            addTaskHandler(false)
                        }
                    }}
                >
                    Add Task
                </button>
                <button
                    className="standardbutton addtaskbutton"
                    onClick={() => {
                        addTaskHandler(false)
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default AddTask
