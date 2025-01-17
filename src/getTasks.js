import { Task } from "./components/taskstructure.js"

function getTasks(setTasks) {
    const authority = window.localStorage.getItem("authority")

    if (!authority) {
        throw new Error("Not logged in")
    }

    const headers = new Headers()
    headers.append("Authority", authority)

    fetch("/api/task", {
        headers,
    })
        .then((r) => r.json())
        .then((json) => {
            console.log(json)
            setTasks(json.map((v) => new Task(...Object.values(v))))
        })
        .catch((err) => {
            console.error(err)
        })
}

export { getTasks }
