angular.module('watsonApp').controller('mainController', function($scope, mainService) {

    //$scope.humanResults = mainService.getTweets().then(function(response) {
    // mainService.getPiAnalysis(response).then(function(response2) {

    // })
    // });







});

// function flatten(orig) {
//     var data = {};
//     for (c in orig['tree']['children']) {
//         if ('children' in c) {
//             for (c2 in c) {
//                 if ('children' in c2) {
//                     for (c3 in c2['children']) {
//                         if ('children' in c3) {
//                             for (c4 in c3['children']) {
//                                 if (c4['category'] == 'personality') {
//                                     data[c4['id']] = c4[percentage]
//                                 }
//                                 if (!'children' in c3) {
//                                     if (c3['category'] == 'personality') {
//                                         data[c3['id']] = c3[percentage];
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     return data;
// }

// function compare(person1, person2) {
//     var compared_data = {};
//     for (keys in dict) {
//         if (dict1[keys] != dict2[keys]) {
//             compared_data[keys] = Math.abs(dict1[keys] - dict2[keys]);
//         }
//     }
//     return compared_data;
// }


// def flatten(orig):                     
//     data = {}
//     for c in orig['tree']['children']:
//         if 'children' in c:
//             for c2 in c['children']:
//                 if 'children' in c2:
//                     for c3 in c2['children']:
//                         if 'children' in c3:
//                             for c4 in c3['children']:
//                                 if (c4['category'] == 'personality'):
//                                     data[c4['id']] = c4['percentage']
//                                     if 'children' not in c3:
//                                         if (c3['category'] == 'personality'):
//                                                 data[c3['id']] = c3['percentage']
//     return data