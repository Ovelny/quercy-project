(function () {
    var app = angular.module('quercy-back');

    app.controller('biensenvente.controller', ['$scope', '$routeParams','adverts.datacontext', 
    function ($scope, $routeParams, datacontext) {
       
        $scope.advert_type = $routeParams["advert_type"];

        $scope.advertsList = [];

        datacontext.getProperties($scope.advert_type)
            .then(function(res){
                console.log(res);
                $scope.advertsList = res.data;
            })
            .catch(function(err){
                console.log(err);
            });

    }]);

})();