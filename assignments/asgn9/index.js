angular.module("indexModule", ['ui.grid', 'ui.select', 'ui.grid.exporter'])
        .controller("indexController", function($scope, userService) {
            $scope.showDialogue = false;

            // Initializing ui-grid for converting to pdf
            $scope.gridOptions = {
                enableGridMenu: true,
                exporterMenuCsv: false,
                columnDefs: [
                    {name: 'id', enableCellEdit: false},
                    {name: 'name', enableCellEdit: false},
                    {name: 'email', enableCellEdit: false}
                ],
                data: []
            };

            // This method will help showing advanced search pane
            $scope.showSearchDialogue = function() {
                $scope.showDialogue = false;
            };

            // This method will remove the user
            $scope.removeNewUser = function() {
                var arr = [];
                for (var index = 0; index < $scope.appData.length; ++index) {
                    var user = $scope.appData[index];
                    if (this.user.id !== user.id) {
                        arr.push(user);
                    }
                }

                $scope.appData = arr;
                localStorage.setItem("userData", angular.toJson(arr));
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

                $scope.selected = {value: $scope.appData[0]};
                $scope.gridOptions.data = $scope.appData;
            });

            // This method will be called when change select box
            $scope.update = function(selectedItem) {
                $scope.gridOptions.data = [selectedItem];
            };
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
                template: "<td>{{data.name}}</td><td>{{data.email}} <span ng-show='showDel' ng-click='$parent.removeNewUser()'>X</span></td>",
                link: function(scope, element, attr) {
                    scope.showDel = false;

                    element.on('mouseover', function($event) {
                        var scope = angular.element($event.target).scope();
                        scope.$apply(function() {
                            scope.showDel = true;
                        });
                    });

                    element.on('mouseout', function($event) {
                        var scope = angular.element($event.target).scope();
                        scope.$apply(function() {
                            scope.showDel = false;
                        });
                    });

                }
            };
        });
