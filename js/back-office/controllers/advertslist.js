(function () {
    angular.module('quercy-back')
        .controller('advertslist.controller', ['$scope', '$routeParams', 'adverts.datacontext', '$location',
            function ($scope, $routeParams, datacontext, $location) {

                $scope.advert_type = $routeParams["advert_type"];
                $scope.advertsList = [];

                datacontext.getProperties($scope.advert_type)
                    .then(function (res) {
                        $scope.advertsList = res.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                $scope.goToAdvert = function(advert_id){
                    $location.path('annonce/' + advert_id);
                }
            }]);
})();