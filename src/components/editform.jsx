import React from "react"
const EditTask = ({ task }) => {
    const {
        assignDate,
        title,
        description,
        recurringMonth,
        recurringN,
        recurringStop,
    } = task

    function handleSubmit(evt) {
        evt.preventDefault()
        console.log({ evt })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="date"
                    id="assignDate"
                    value={assignDate}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </form>
        </div>
    )
}

export default EditTask
