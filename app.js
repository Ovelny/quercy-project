angular.module('quercy', []);


// Test
angular.module('quercy').controller("test", ["$http", function($http){

    $http.get('http://127.0.0.1:8000/api/properties/')
        .then(function(res){
            console.log(res.data);
        }).catch(function(err){
            console.log(err);
        });

    // var data = {
    //     "label":"test"
    // };
    // $http.post('http://127.0.0.1:8000/api/heating_types/', data)
    //     .then(function(res){
    //         console.log(res);
    //     }).catch(function(err){
    //         console.log(err);
    //     });
}]);



