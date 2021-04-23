/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = args => {
    return {
        firstName: args[0],
        familyName: args[1],
        title: args[2],
        payPerHour: args[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = employees => {
    return employees.map(createEmployeeRecord);
}

function createTimeInEvent(timestamp) {
    let ts = parseTimestamp(timestamp);
    this.timeInEvents.push({
        type: "TimeIn",
        date: ts.date,
        hour: ts.hour,
    });

    return this;
}

function createTimeOutEvent(timestamp) {
    let ts = parseTimestamp(timestamp);
    this.timeOutEvents.push({
        type: "TimeOut",
        date: ts.date,
        hour: ts.hour,
    });

    return this;
}

function parseTimestamp(timestamp) {
    return {
        date: timestamp.split(" ")[0],
        hour: Number.parseInt(timestamp.split(" ")[1]),
    }
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(timeInEvent => timeInEvent.date === date).hour;
    let timeOut = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {
    return employees.reduce((acc, employee) => {
        return acc + employee.timeInEvents.reduce((acc, timeInEvent) => {
            return acc + wagesEarnedOnDate.call(employee, timeInEvent.date)
        }, 0)
    }, 0)
}