(function () {
    angular.module('quercy-back')
        .controller('advertslist.controller', ['$scope', 'adverts.datacontext', '$location',
            function ($scope, datacontext, $location) {

                var search = $location.search();
                $scope.selectmode = search.mode == "selection";

                $scope.advertsList = [];
                $scope.advertType = "";

                $scope.sortparams = {
                    "orderby": "id",
                    "asc": true,
                    "onsort": function(){
                        $scope.refreshList()
                    }
                }

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

                $scope.clickAdvert = function(advert_id){
                    if (!$scope.selectmode)
                        $location.path('annonce/' + advert_id);
                    else {
                        window.sessionStorage.setItem("selectedProperty", advert_id);
                        var path = window.sessionStorage.getItem("returnTo");
                        delete window.sessionStorage["returnTo"];
                        $location.$$search = {};
                        $location.path(path);
                    }
                }

                $scope.newAdvert = function(){
                    $location.path('annonce/creation');
                }

                $scope.refreshList = function(){
                    if ($scope.filterType == "id" && $scope.filterText != Number($scope.filterText)) {
                        // only int allowed
                        $scope.filterText = "";
                    }
                    datacontext.getProperties($scope.advertType, $scope.filterType, $scope.filterText, $scope.sortparams.orderby, $scope.sortparams.asc)
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