app.factory('Employees', function($rootScope, $firebaseArray, Employee){

    var factory = {};
    factory.all_employees = [];

    factory.getAllData = function() {
        var tmp_data = [];
        angular.forEach(factory.all_employees, function(val, key){
            tmp_data.push(val.getData());
        });
        return tmp_data;
    };

    factory.convertJsonToObj = function(json){
        var tmp_obj = [];

        angular.forEach(json, function(val, key){
            var tmp_employee = new Employee();
            tmp_employee.setEmployeeValues(val);
            tmp_obj.push(tmp_employee);
        });

        factory.all_employees = tmp_obj;
    };

    factory.getEmployeeById = function(emp_id){
        var tmp = null;
        angular.forEach(factory.all_employees, function(val, key) {
            if (emp_id === val.getId()) {
                tmp = val;
            }
        });
        return tmp;
    };

    factory.setAllEmployees = function(employees){
        factory.convertJsonToObj(employees);
    };

    return factory;
});

app.factory('Employee', function(Positions){

    var Employee = function () {
        this.data = {
            id: null,
            name: '',
            avatar: '',
            position: []
        };
    };
    Employee.prototype.getData = function () {
        return this.data;
    };
    Employee.prototype.setData = function (new_data) {
        this.data = new_data;
    };
    Employee.prototype.getId = function () {
        return this.data.id;
    };
    Employee.prototype.setId = function (id) {
        this.data.id = id;
    };
    Employee.prototype.getName = function () {
        return this.data.name;
    };
    Employee.prototype.setName = function (name) {
        this.data.name = name;
    };
    Employee.prototype.getAvatar = function () {
        return this.data.avatar;
    };
    Employee.prototype.setAvatar = function (avatar) {
        this.data.avatar = avatar;
    };
    Employee.prototype.getPosition = function() {
        return this.data.position;
    };
    Employee.prototype.setPosition = function(pos_id) {
        this.data.position = Positions.getPositionById(pos_id);
        this.data.position = this.data.position.getData();
    };
    Employee.prototype.setEmployeeValues = function (emp) {
        this.setId(emp.id);
        this.setName(emp.name);
        this.setAvatar(emp.avatar);
        this.setPosition(emp.position);
    };

    return Employee;
});