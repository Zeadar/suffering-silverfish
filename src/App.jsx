import "./App.css"
import "./components/common.css"
import TaskList from "./components/tasklist.jsx"
import LoginForm from "./components/loginform.jsx"
import Top from "./components/top.jsx"
import RegisterForm from "./components/register.jsx"
import Remove from "./components/remove.jsx"
import AddTask from "./components/addtask.jsx"
import Calendar from "./components/calendar.jsx"
import { useState, useEffect } from "react"
import { getTasks } from "./getTasks.js"

function Empty() {
    return <div></div>
}

function App() {
    const [username, setUsername] = useState(
        window.localStorage.getItem("username") ?? "",
    )
    const [tasks, setTasks] = useState([])
    const [nowDisplay, setNowDisplay] = useState("empty")

    const registerForm = RegisterForm({
        successHandler: registerSuccessHandler,
    })
    const loginForm = LoginForm({ handleNewUsername: handleNewUsername })
    const taskList = TaskList({
        tasks: tasks,
        handleNewTask: handleNewTask,
        handleDeleteTask: tasksUpdateHandler,
    })
    const removeForm = Remove({
        removeHandler: removeUserSuccessHandler,
        username: username,
    })
    const addTask = AddTask({ addTaskHandler: addTaskSuccessHandler })

    function tasksUpdateHandler() {
        getTasks(setTasks)
    }

    function registerSuccessHandler() {
        setNowDisplay("login")
    }

    function removeUserSuccessHandler(removed) {
        if (removed) {
            setNowDisplay("login")
            setUsername("")
        } else {
            setNowDisplay("tasks")
        }
    }

    function addTaskSuccessHandler(newTask) {
        if (newTask) {
            console.log("AddNew")
            getTasks(setTasks)
        } else {
            console.log("back")
        }

        setNowDisplay("tasks")
    }

    function removeHandler() {
        setNowDisplay("remove")
    }

    function logoutHandler() {
        window.localStorage.setItem("authority", "")
        setNowDisplay("login")
        setUsername("")
    }

    function registerHandler() {
        window.localStorage.setItem("authority", "")
        setNowDisplay("register")
    }

    function handleNewUsername(un) {
        setNowDisplay("tasks")
        window.localStorage.setItem("username", un)
        setUsername(un)
        getTasks(setTasks)
    }

    function handleNewTask() {
        setNowDisplay("addtask")
    }

    function displayer() {
        switch (nowDisplay) {
            case "empty":
                return Empty()
            case "login":
                return loginForm
            case "tasks":
                return taskList
            case "register":
                return registerForm
            case "remove":
                return removeForm
            case "addtask":
                return addTask
            default:
                return <div>Herp derp</div>
        }
    }

    useEffect(() => {
        const authority = window.localStorage.getItem("authority")

        if (!authority) {
            setNowDisplay("login")
            return
        }

        const headers = new Headers()
        headers.append("Authority", authority)

        fetch("/api/user", {
            method: "GET",
            headers: headers,
        }).then((r) => {
            if (r.ok) {
                setNowDisplay("tasks")
                try {
                    getTasks(setTasks)
                } catch (err) {
                    console.log(err)
                }
            } else {
                window.localStorage.setItem("authority", "")
                window.localStorage.setItem("username", "")
                setNowDisplay("login")
            }
        })
    }, []) // Empty dependency array means it only runs on mount

    return (
        <div className="everything">
            <div className="App">
                <Top
                    username={username}
                    logoutHandler={logoutHandler}
                    registerHandler={registerHandler}
                    removeHandler={removeHandler}
                ></Top>
                <div className="container">
                    <div className="frame">
                        <div className="flexy">{displayer()}</div>
                        <div className="topper"/>
                        <Calendar tasks={tasks} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
