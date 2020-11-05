// TODO: Write code to define and export the Employee class
class Employee {
    constructor(employeeName, employeeID, employeeEmail) {
        // if (typeof name !== "string" || !name.trim().length) {
        //     throw new Error("Expected parameter 'name' to be a non-empty string");
        // }
        this.employeeName = employeeName;
        this.employeeID = employeeID;
        this.emplyeeEmail = employeeEmail;
    }
   
    getName() {
        return this.employeeName;
    };
    getId() {
        return this.employeeID;
    };
    getEmail() {
        return this.employeeEmail;
    }
    getRole() {
        return "Employee";
    }
}

module.exports = Employee;