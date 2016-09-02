angular.module("indexModule", [])
        .controller("indexController", function($scope, userService) {
            var responseData;
            $scope.showDialogue = false;
            
            // This method will help showing advanced search pane
            $scope.showSearchDialogue = function() {
                $scope.showDialogue = true;
            };
            
            // This method will do actual search over search contents
            $scope.searchContent = function() {
                var filteredData = [];
                for (var index = 0; index < responseData.length; ++index) {
                    var currentUser = responseData[index];
                    if (($scope.nameText && currentUser.name.toLowerCase().indexOf($scope.nameText.toLowerCase()) > -1) ||
                            ($scope.emailText && currentUser.email.toLowerCase().indexOf($scope.emailText.toLowerCase()) > -1)) {
                        filteredData.push(currentUser);
                    }
                }
                $scope.appData = filteredData;
            };
            userService.fetchData().then(function(response) {
                responseData = response.data;
                $scope.appData = responseData.slice(0, 5);
            });
        })
        .service("userService", ['$http', function($http) {
                this.fetchData = function() {
                    return $http({
                        method: "GET",
                        url: "https://jsonplaceholder.typicode.com/users"
                    });
                };
            }])
        .directive('templateDirective', function() {
            return {
                restrict: 'E',
                template: "<h3>I have selected this user</h3>"
            };
        });
