(function() {
    var app = angular.module("indexModule", []);
    app.controller("indexController", ['$scope', 'userService', function($scope, userService) {
            userService.fetchData().then(function (response) {
                $scope.appData = data = response.data;
            },
            function (response) {
                console.log(response);
            });

        }])
        .service("userService", ['$http', function($http) {
            this.fetchData = function() {
                return $http({
                    method: "GET",
                    url: "userData.json"
                });
            };
        }]);
}());