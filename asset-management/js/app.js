var app = angular.module("asset-manager", []);

// Application Data
app.value("userList", null);

// controller
app.controller("home-controller", ['$scope', 'userProvider', 'userList', ($scope, UP, userList) => {
    UP.data.then((response) => {
        userList = response.data;
        $scope.users = response.data;
    }, (data) => {
        console.log(data);
    });

    // Handlers
    $scope.saveUser = (updatedUser) => {
        console.log(updatedUser);
        $scope.canEdit = false;

        userList.filter((oldUser) => {
            if (oldUser.id === updatedUser.id) {
                oldUser.name = updatedUser.name;
                return oldUser;
            }
        });

        $scope.editedData = {};
    };

    $scope.editUser = (user) => {
        $scope.canEdit = true;

        $scope.editedData = Object.create(user);
    };
}]);

// Custom Filter
app.filter("prependuser", () => {
    return (data) => {
        return "00" + data;
    };
});

// Providers
app.factory("userProvider", ['$http', (HP) => {

    let userPromise = HP({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: "GET"
    });

    return {
        data: userPromise
    };
}]);