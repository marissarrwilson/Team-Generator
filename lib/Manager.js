// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
    constructor(managerName, managerID, managerEmail, managerPhone) {
        super(managerName, managerID, managerEmail);
        this.managerPhone = managerPhone;
    }
    getManagerPhone() {
        return this.managerPhone;
    }
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;