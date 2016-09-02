angular.module("indexModule", [])
        .controller("indexController", function($scope, userService) {
            $scope.showDialogue = false;

            // This method will help showing advanced search pane
            $scope.showSearchDialogue = function() {
                $scope.showDialogue = true;
            };

            // This method will add data
            $scope.addNewUserData = function() {
                var userData = angular.fromJson(localStorage.getItem("userData"));
                userData.push({"name": $scope.userName, "email" : $scope.userEmail});
                localStorage.setItem("userData", angular.toJson(userData));
                
                $scope.appData = angular.fromJson(userData);
                $scope.userName = $scope.userEmail = "";
                $scope.addUser = false;
            };

            // This method will do actual search over search contents
            $scope.searchContent = function() {
                var filteredData = [];
                var userData = angular.fromJson(localStorage.getItem("userData"));

                for (var index = 0; index < userData.length; ++index) {
                    var currentUser = userData[index];
                    if (($scope.nameText && currentUser.name.toLowerCase().indexOf($scope.nameText.toLowerCase()) > -1) ||
                            ($scope.emailText && currentUser.email.toLowerCase().indexOf($scope.emailText.toLowerCase()) > -1)) {
                        filteredData.push(currentUser);
                    }
                }
                $scope.appData = filteredData;
            };
            
            userService.fetchData().then(function(response) {
                localStorage.setItem("userData", angular.toJson(response.data));
                $scope.appData = response.data.slice(0, 5);
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
                restrict: 'A',
                template: "<td>{{user.name}}</td><td>{{user.email}}</td>"
            };
        });
