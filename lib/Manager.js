// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, managerPhone) {
        super(name, id, email);
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