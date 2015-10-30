(function () {

    var app = angular.module("githubViewer", []);


    var mainController = function (
        $scope, $http, $interval,
        $log, $anchorScroll, $location) {
        
        var onRepos = function (response) {
            $scope.repos = response.data;
            $location.hash("userDetaisl");
            $anchorScroll();
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


        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        var countdownInterval = null;

        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function (username) {
            $log.info("Searching for " + username);
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        $scope.username = "angular";
        $scope.massage = "Github Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;
        startCountdown();

    };

    app.controller("mainController", mainController);
}());