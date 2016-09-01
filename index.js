angular.module("indexModule", [])
        .controller("indexController", function($scope, userService) {
            $scope.showDialogue = false;
            //$scope.showDelete = false;

            // This method will help showing advanced search pane
            $scope.showSearchDialogue = function() {
                $scope.showDialogue = false;
            };

            $scope.toggleDelete = function() {
                console.log('click called');
                $scope.showDelete = true;
            };

            // This method will add data
            $scope.addNewUserData = function() {
                var userData = angular.fromJson(localStorage.getItem("userData"));
                userData.push({"name": $scope.userName, "email": $scope.userEmail});
                localStorage.setItem("userData", angular.toJson(userData));

                $scope.appData.push({"name": $scope.userName, "email": $scope.userEmail});
                $scope.addUser = false;
                $scope.userName = $scope.userEmail = "";
            };

            // This method will show add new user template
            $scope.collapse = function() {
                $scope.addUser = true;
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
                scope: {
                    data: '='
                },
                template: "<td>{{data.name}}</td><td>{{data.email}} <span ng-if='showDelete'>X</span></td>",
                link: function(scope, element, ele, bab) {
                    /*if (scope.showNewTemplate === true) {
                     element.on('mouseover', function() {
                     this.classList.add('highlight');
                     });
                     element.on('mouseout', function() {
                     if (this.className.toLowerCase().indexOf('highlight') > -1) {
                     this.classList.remove('highlight');
                     }
                     });
                     }*/
                }
            };
        });
