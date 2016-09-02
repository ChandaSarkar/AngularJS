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

				//jitz: $scope.appData can be use in for, no need to have extra variables
                // chandas: $scope.appData has only first 5 values from initial loading hence it cant be used, I guess so.
                for (var index = 0; index < responseData.length; ++index) {
                    var currentUser = responseData[index];
                    //jitz: nameText can be use name_keyword. Only JS variables will be camelCase
                    // chandas: Done changes accordingly. Modified searchText to search_text as well in html file.
                    if (($scope.name_keyword && currentUser.name.toLowerCase().indexOf($scope.name_keyword.toLowerCase()) > -1) ||
                            ($scope.email_keyword && currentUser.email.toLowerCase().indexOf($scope.email_keyword.toLowerCase()) > -1)) {
                        filteredData.push(currentUser);
                    }
                }
                $scope.appData = filteredData;
            };

            userService.fetchData().then(function(response) {
                responseData = response.data;

                $scope.appData = responseData.slice(0, 5);
				//jitz: $scope.appData = response.data.slice(0, 5); you can reduce lines
                // chandas: Related to point 1, hence it shouldn't be done as well.
            });
        })
        .service("userService", ['$http', function($http) {
                this.fetchData = function() {
                    return $http({
                        method: "GET",
                        url: "https://jsonplaceholder.typicode.com/users"
                    });
                };
            }]);

//status: no issue
