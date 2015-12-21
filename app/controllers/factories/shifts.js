app.factory('Shifts', function($rootScope, $firebaseArray, Shift){

    var factory = {};
    factory.all_shifts = [];

    factory.getAllData = function() {
        var tmp_data = [];
        angular.forEach(factory.all_shifts, function(val, key){
            tmp_data.push(val.getData());
        });
        return tmp_data;
    };

    factory.getAllShiftObjects = function() {
        return factory.all_shifts;
    };

    factory.convertJsonToObj = function(json){
        var tmp_obj = [];

        angular.forEach(json, function(val, key){
            var tmp_shift = new Shift();
            tmp_shift.setShiftValues(val);
            tmp_obj.push(tmp_shift);
        });

        factory.all_shifts = tmp_obj;
    };

    factory.getShiftById = function(shf_id){
        var tmp = null;
        angular.forEach(factory.all_shifts, function(val, key) {
            if (shf_id === val.getId()) {
                tmp =  val;
            }
        });
        return tmp;
    };

    factory.setAllShifts = function(shifts){
        factory.convertJsonToObj(shifts);
    };

    return factory;
});

app.factory('Shift', function(Positions, Employees){
    var Shift = function () {
        this.data = {
            id: null,
            date: '',
            time: '',
            name: '',
            position: '',
            employees: []
        };
    };

    Shift.prototype.getData = function () {
        return this.data;
    };
    Shift.prototype.setData = function (new_data) {
        this.data = new_data;
    };
    Shift.prototype.getId = function () {
        return this.data.id;
    };
    Shift.prototype.setId = function (id) {
        this.data.id = id;
    };
    Shift.prototype.getDate = function(){
        return this.data.date;
    };
    Shift.prototype.setDate = function(date){
        this.data.date = date;
    };
    Shift.prototype.getTime = function(){
        return this.data.time;
    };
    Shift.prototype.setTime = function(time){
        this.data.time = time;
    };
    Shift.prototype.getName = function () {
        return this.data.name;
    };
    Shift.prototype.setName = function (name) {
        this.data.name = name;
    };
    Shift.prototype.getPosition = function () {
        return this.data.position;
    };
    Shift.prototype.setPosition = function (pos_id) {
        this.data.position = Positions.getPositionById(pos_id).getData();
    };
    Shift.prototype.getEmployees = function(){
        return this.data.employees;
    };
    Shift.prototype.setEmployees =  function (emp_ids){
        var tmp_emps = [];
        angular.forEach(emp_ids, function(val, key){
            var tmp_emp = Employees.getEmployeeById(val);
            if (tmp_emp !== null) tmp_emps.push(tmp_emp.getData());
        });
        this.data.employees = tmp_emps;
    };
    Shift.prototype.setShiftValues = function (shf) {
        this.setId(shf.id);
        this.setName(shf.name);
        this.setDate(shf.date);
        this.setTime(shf.time);
        this.setPosition(shf.position);
        this.setEmployees(shf.employees);
    };

    return Shift;
});