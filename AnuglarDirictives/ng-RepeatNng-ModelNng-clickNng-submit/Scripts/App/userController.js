(function () {

    var app = angular.module("githubViewer");


    var userController = function ($scope, github, $routeParams) {

        var onUserComplete = function (data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        };

        var onRepos = function (data) {
            $scope.repos = data;
        };

        var onError = function (response) {
            $scope.error = "Could not fetch the Data";
        };
        

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        github.getUser($scope.username).then(onUserComplete, onError);
    };

    app.controller("userController", userController);
}());