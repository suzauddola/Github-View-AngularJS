(function () {

    var app = angular.module("githubViewer", []);


    var MainController = function ($scope, $http) {

        

        var onRepos = function (response) {
            $scope.repos = response.data;
        };

        var onError = function (response) {
            $scope.error = "Could not fetch the Data";
        };

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        //$http.get("https://api.github.com/users/suzauddola")
        //  .then(onUserComplete, onError);

        $scope.search = function (username) {
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        };

        $scope.username = "angular";
        $scope.massage = "Github Viewer";
        $scope.repoSortOrder = "-stargazers_count";


    };

    app.controller("MainController", ["$scope", "$http", MainController]);
}());