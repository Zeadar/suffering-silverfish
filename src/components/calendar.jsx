import React from "react"
import "./calendar.css"

function Title(titles) {
    const spans = titles.map((t) => (
        <span className={t.completeId(t.due) ? "completed" : ""}>
            <br />
            {t.title}
        </span>
    ))

    return spans
}

const Calendar = ({ tasks }) => {
    const today = new Date()
    const daysThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    let firstWeekday = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
    if (firstWeekday == 0) {
        firstWeekday = 7
    }
    const taskMap = new Map()
    tasks.forEach((t) => {
        const due = t.due.toISOString().slice(0, 8) + t.due.getDate()
        taskMap.set(due, taskMap.get(due) ? taskMap.get(due).concat([t]) : [t])
    })
    const daysAmount = firstWeekday + daysThisMonth > 35 ? 42 : 35

    function Days() {
        return Array(daysAmount)
            .fill(null)
            .map((_, i) => i + 1)
            .map((slot) => {
                if (slot < firstWeekday) {
                    return <div className="cell unavailable"></div>
                }

                const displayDate = slot - firstWeekday + 1

                if (displayDate > daysThisMonth) {
                    return <div className="cell unavailable"></div>
                }

                const searchDate = today.toISOString().slice(0, 8) + displayDate
                const titlesThisDay = taskMap.get(searchDate) ?? []

                if (displayDate == today.getDate()) {
                    return (
                        <div className="cell today">
                            {displayDate}
                            {Title(titlesThisDay)}
                        </div>
                    )
                }

                return (
                    <div className="cell">
                        <span style={{ color: "whitesmoke" }}>{displayDate}</span>
                        {Title(titlesThisDay)}
                    </div>
                )
            })
    }

    return (
        <div className="calendar">
            <div className="month">
                <div>&#10094;</div>
                <div style={{ color: "whitesmoke" }}>{today.toISOString().slice(0, 7)}</div>
                <div>&#10095;</div>
            </div>

            <div className="weekdays">
                <div className="weekday">Monday</div>
                <div className="weekday">Tuesday</div>
                <div className="weekday">Wednesday</div>
                <div className="weekday">Thursday</div>
                <div className="weekday">Friday</div>
                <div className="weekday">Saturday</div>
                <div className="weekday">Sunday</div>
            </div>

            <div className={"days days" + daysAmount}>{Days()}</div>
        </div>
    )
}

export default Calendar
