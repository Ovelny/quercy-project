(function () {
    angular.module('quercy-back')
        .controller('favoriteslist.controller', ['$scope', 'adverts.datacontext', '$location',
            function ($scope, datacontext, $location) {

                $scope.advertsList = [];

                datacontext.getFavoriteProperties()
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