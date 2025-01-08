import { Task } from "./components/taskstructure.js"

function getTasks(setTasks) {
    const authority = window.localStorage.getItem("authority")

    if (!authority) {
        throw new Error("Not logged in")
    }

    fetch("/api/task", {
        method: "GET",
        headers: {
            Authority: authority,
        },
    })
        .then((r) => r.json())
        .then((json) => {
            const tasks = json.map((v) => new Task(v))
            console.log("tasks", tasks)
            setTasks(tasks)
        })
        .catch((err) => {
            console.error(err)
        })
}

export { getTasks }
