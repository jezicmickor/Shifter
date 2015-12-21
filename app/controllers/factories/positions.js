app.factory('Positions', function($rootScope, $firebaseArray, Position) {

    var factory = {};
    factory.all_positions = [];

    factory.getAllData = function() {
        var tmp_data = [];
        angular.forEach(factory.all_positions, function(val, key){
            tmp_data.push(val.getData());
        });
        return tmp_data;
    };

    factory.convertJsonToObj = function(json){
        var tmp_obj = [];

        angular.forEach(json, function(val, key){
            var tmp_position = new Position();
            tmp_position.setPositionValues(val);
            tmp_obj.push(tmp_position);
        });

        factory.all_positions = tmp_obj;
    };

    factory.getPositionById = function(pos_id){
        var tmp = null;
        angular.forEach(factory.all_positions, function(val, key) {
            if (pos_id === val.getId()) {
                tmp = val;
            }
        });
        return tmp;
    };

    factory.setAllPositions = function(positions){
        factory.convertJsonToObj(positions);
    };

    return factory;

});

app.factory('Position', function(){

    var Position = function () {
        this.data = {
            id: null,
            name: '',
            color: ''
        };
    };

    Position.prototype.getData = function () {
        return this.data;
    };
    Position.prototype.setData = function (new_data) {
                this.data = new_data;
            };
    Position.prototype.getId = function () {
                return this.data.id;
            };
    Position.prototype.setId = function (id) {
                this.data.id = id;
            };
    Position.prototype.getName = function () {
                return this.data.name;
            };
    Position.prototype.setName = function (name) {
                this.data.name = name;
            };
    Position.prototype.getColor = function () {
                return this.data.color;
            };
    Position.prototype.setColor = function (color) {
                this.data.color = color;
            };
    Position.prototype.setPositionValues = function (pos) {
                this.setId(pos.id);
                this.setName(pos.name);
                this.setColor(pos.color);
            };

    return Position;
});