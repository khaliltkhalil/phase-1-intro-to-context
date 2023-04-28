// Your code here

function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, timeInStamp) {
  const timeInEvent = {
    type: "TimeIn",
    date: timeInStamp.substring(0, 10),
    hour: Number(timeInStamp.substring(11, 15)),
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeOutStamp) {
  const timeOutEvent = {
    type: "TimeOut",
    date: timeOutStamp.substring(0, 10),
    hour: Number(timeOutStamp.substring(11, 15)),
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn =
    employeeRecord.timeInEvents.find((timeInEvent) => timeInEvent.date === date)
      .hour / 100;
  const timeOut =
    employeeRecord.timeOutEvents.find(
      (timeOutEvent) => timeOutEvent.date === date
    ).hour / 100;
  return timeOut - timeIn;
}

function wagesEarnedOnDate(employeeRecord, date) {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord, date) {
  return employeeRecord.timeInEvents.reduce(
    (total, timeInEvent) =>
      wagesEarnedOnDate(employeeRecord, timeInEvent.date) + total,
    0
  );
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(
    (total, employeeRecord) => allWagesFor(employeeRecord) + total,
    0
  );
}
