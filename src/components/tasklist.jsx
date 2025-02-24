import React from "react"
import DisplayTask from "./displaytask.jsx"
import "./tasklist.css"
import "./common.css"

const TaskList = ({ tasks, handleNewTask, handleDeleteTask }) => {
    return (
        <div className="tasklist">
            <div
                className="flexy"
                style={{
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                }}
            >
                <div className="title">Plan or Die</div>
                <button className="addtask" onClick={handleNewTask}>
                    <i className="plus"></i>
                </button>
            </div>
            {tasks
                .sort((a, b) => a.due.getTime() - b.due.getTime())
                .map((t, i) => (
                    <div className="flexy">
                        <DisplayTask task={t} even={i % 2 == 0} handleTaskUpdate={handleDeleteTask} />
                    </div>
                ))}
        </div>
    )
}

export default TaskList
