angular.module('watsonApp').controller('mainController', function($scope, mainService) {

    mainService.getTweets().then(function(response) {
        response.replace(/([\"])/, "'");
        console.log(response);
        mainService.getPiAnalysis(response);
    });





});