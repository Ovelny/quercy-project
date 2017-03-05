(function () {
    angular.module('quercy-back')
        .controller('advertslist.controller', ['$scope', '$routeParams', 'adverts.datacontext', '$location',
            function ($scope, $routeParams, datacontext, $location) {

                $scope.advert_type = $routeParams["advert_type"];
                $scope.advertsList = [];
                
                $scope.filterOptions = [
                    {
                        "value": "id",
                        "label": "Numéro d'annonce"
                    }, {
                        "value": "postal_code",
                        "label": "Code Postal"
                    }, {
                        "value": "city",
                        "label": "Ville"
                    }
                ];
                $scope.filterType = $scope.filterOptions[0].value;
                $scope.filterText = "";

                $scope.goToAdvert = function(advert_id){
                    $location.path('annonce/' + advert_id);
                }

                $scope.newAdvert = function(){
                    $location.path('annonce/creation');
                }

                $scope.refreshList = function(){
                    if ($scope.filterType == "id" && $scope.filterText != Number($scope.filterText)) {
                        // only int allowed
                        $scope.filterText = "";
                    }
                    datacontext.getProperties($scope.advert_type, $scope.filterType, $scope.filterText)
                        .then(function (res) {
                            $scope.advertsList = res.data;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }

                $scope.refreshList();
            }]);
})();