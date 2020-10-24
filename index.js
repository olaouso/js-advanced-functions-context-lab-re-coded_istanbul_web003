function createEmployeeRecord([firstName, familyName,title,payPerHour]){
    const employeeObj = {
        firstName: firstName,
        familyName:familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents:[]
    }
    return employeeObj;
}

function createEmployeeRecords(arrsOfEmployees){
    const objsOfEmployees = arrsOfEmployees.map(
        employeeArr=>createEmployeeRecord(employeeArr)
    );
    return objsOfEmployees;
}
const date= "YYYY-MM-DD 1100";
function createTimeInEvent(dateStr){
    const dateArr= dateStr.split(" ");
    const hour= parseInt(dateArr[1]);
    const date= dateArr[0];
    const timeInfo= {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    this.timeInEvents.push(timeInfo);
    return this; //obj which we apply the function
}

function createTimeOutEvent(dateStr){
    const dateArr= dateStr.split(" ");
    const hour= parseInt(dateArr[1]);
    const date= dateArr[0];
    const timeInfo= {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    this.timeOutEvents.push(timeInfo);
    return this;
}

function hoursWorkedOnDate(date){
    const dayStart= this.timeInEvents.find(timeInfo=> timeInfo.date===date);
    const dayEnd= this.timeOutEvents.find(timeInfo=> timeInfo.date===date);
    const start = dayStart.hour;
    const end = dayEnd.hour;
    const hourWorked= (end - start)/100; //hour = hhmm 2h=200
    return hourWorked;
}

function wagesEarnedOnDate(date){
    const dailyhours= hoursWorkedOnDate.call(this,date); // call to set the context to the obj we apply the function
    const payOwned= dailyhours*this.payPerHour;
    return payOwned;
}
let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(srcArray, firstName){
    for (const person of srcArray){
        person.firstName===firstName;
        return person;//return only the first match
    }
     return undefined;
}

function calculatePayroll(array){
    const total = array.reduce((acc, curr)=> acc+=allWagesFor.call(curr),0);
    return total;}