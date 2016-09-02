(function() {
    var app = angular.module("indexModule", []);
    app.controller("storeController", ['$scope', function($scope) {
            $scope.storeData = ["st-data-1", "st-data-2", "st-data-3"];
    }]);
    app.controller("indexController", ['$scope', function($scope) {
            $scope.indexData = ["A", "B", "C"];
    }]);
}());