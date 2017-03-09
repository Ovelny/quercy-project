(function () {
    angular.module('quercy-back')
        .controller('advertphotos.controller', ['$scope', '$routeParams', '$location', 'adverts.datacontext', 'Notification',
            function ($scope, $routeParams, $location, datacontext, Notification) {

                var advert_id = $routeParams["advert_id"];
                $scope.photos = [];
                

                datacontext.getAdvert(advert_id)
                    .then(function (res) {
                        $scope.advert = res.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                
                // datacontext.getPhotos(advert_id)
                //     .then(function (res) {
                //         $scope.photos = res.data;
                //     })
                //     .catch(function (err) {
                //         console.log(err);
                //     });
                

                $scope.back = function(){
                    $location.path('annonce/'+advert_id);
                }

            }]);

})();