angular.module('watsonApp').controller('mainController', function($scope, mainService) {

    $scope.humanResults = mainService.getTweets().then(function(response) {
        mainService.getPiAnalysis(response);
    });





});