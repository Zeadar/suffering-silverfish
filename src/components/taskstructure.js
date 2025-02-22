class Task {
    constructor(
        id = "",
        assignDate = "",
        title = "",
        description = "",
        recurringMonth = false,
        recurringN = 0,
        recurringStop = "",
        completeTasks = [],
    ) {
        this.id = id
        this.assignDate = new Date(assignDate)
        this.description = description
        this.reccuringMonth = recurringMonth
        this.reccuringN = recurringN
        this.recurringStop = new Date(recurringStop)
        this.title = title
        this.completeTasks = new Map(completeTasks.map((ct) => [ct.completed, ct.id]))

        this.assignDate.setHours(12)
        this.assignDate.setMinutes(0)
        this.assignDate.setSeconds(0)
        this.assignDate.setMilliseconds(0)

        this.recurringStop.setHours(12)
        this.recurringStop.setMinutes(0)
        this.recurringStop.setSeconds(0)
        this.recurringStop.setMilliseconds(0)
    }

    //Should give the next due date that is not completed
    get due() {
        return this.assignDate
    }

    completeId(date = new Date()) {
        const d = date.toISOString().slice(0, 10)
        return this.completeTasks.get(d)
    }
}

export { Task }
