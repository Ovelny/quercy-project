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

                $scope.goToAdvert = function(advert){
                    // Si on clique sur le btn "enlever le cdc", on a les deux actions qui s'exécutent...
                    if (!advert.is_favorite)
                        return; // ne pas rediriger si on a cliqué sur le btn
                    $location.path('annonce/' + advert.id);
                }

                $scope.removeFavorite = function(advert){
                    advert.is_favorite = false;
                    datacontext.saveAdvert(advert)
                        .then(function(res){
                            // Supprimer l'annonce de l'affichage
                            $scope.advertsList.splice($scope.advertsList.indexOf(advert), 1);
                        })
                        .catch(function (err) {
                            Notification.error("Une erreur est survenue.");
                            console.log(err);
                        });
                }
            }]);
})();