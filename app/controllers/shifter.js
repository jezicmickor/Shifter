
app.filter('weekdayFilter', function(){
    return function(weekdayList, weekNo){
        return weekdayList.slice(weekNo * 7, weekNo * 7 + 7)
    }
});

app.filter('shiftByEmployeeFilter', function(){
    return function(shiftList, employee, week){
        var tmp_shifts = [];
        angular.forEach(shiftList, function(val, key){
            if ((employee in val.employees) && (val in week)) tmp_shifts.push(val);
        });
        return tmp_shifts;
    }
});

app.controller('ShifterCtrl', function($scope, $rootScope, $q, $filter, moment, $firebaseArray, Employees, Shifts, Positions){
    $scope.search = "";
    $scope.order = "name";
    $scope.positions = [];
    $scope.employees = [];
    $scope.shifts = [];

    $scope.selectedIndex = null;
    $scope.selectedEmployee = null;
    $scope.searchFilter = {};
    $scope.isLoading = true;

    $scope.currentWeek = 1;
    $scope.weekdaylist = [];
    $scope.weekmatrix = [[]];

    var m = new moment().subtract(9, 'days');
    for(i = -3; i < 25; i++) {
        $scope.weekdaylist.push(m.add(1, 'days').format('YYYY-MM-DD'));
    };

    $scope.dayMode = function(day) {
        console.log(day);
    };

    var tmp_positions = $firebaseArray(new Firebase('https://incandescent-inferno-3264.firebaseio.com/positions'));

    var tmp_employees = $firebaseArray(new Firebase('https://incandescent-inferno-3264.firebaseio.com/employees'));

    var tmp_shifts = $firebaseArray(new Firebase('https://incandescent-inferno-3264.firebaseio.com/shifts'));

    $q.all([tmp_positions.$loaded(), tmp_employees.$loaded(), tmp_shifts.$loaded()])
        .then(function() {
            Positions.setAllPositions(tmp_positions);
            Employees.setAllEmployees(tmp_employees);
            Shifts.setAllShifts(tmp_shifts);

            $scope.positions = Positions.getAllData();
            $scope.employees = Employees.getAllData();
            $scope.shifts = Shifts.getAllData();

            $scope.shift_objects = Shifts.getAllShiftObjects();

            $scope.isLoading = false;

            var tmp_weekmatrix = [[]];

            angular.forEach($scope.weekdaylist, function(dval, dkey){
                tmp_weekmatrix[0][dkey] = dval;
                    angular.forEach($scope.shift_objects, function(sval, skey){
                        if (sval.getDate() === dval) {
                            angular.forEach(sval.getEmployees(), function (eval, ekey) {
                                tmp_weekmatrix.push({
                                    id: eval.id,
                                    name: eval.name
                                });
                                tmp_weekmatrix[tmp_weekmatrix.length - 1]["shift"] =
                                {
                                    shift_id: sval.getId(),
                                    shift_name: sval.getName(),
                                    shift_date: sval.getDate(),
                                    shift_position: sval.getPosition(),
                                    shift_time: sval.getTime()
                                };
                            });
                        }
                });
            });

            $scope.weekmatrix = tmp_weekmatrix;
        });


    $scope.selectEmployee = function (index) {
        $scope.selectedIndex = index;
        //$scope.selectedEmployee = emp;
    };
});






