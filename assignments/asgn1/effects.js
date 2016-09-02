(function() {
    var app = angular.module("indexModule", []);
    app.controller("indexController", ['$scope', function($scope) {
        $scope.appData = ["A", "B", "C"];
    }]);
}());