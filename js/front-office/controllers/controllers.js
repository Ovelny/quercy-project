(function () {
    var app = angular.module('front-controllers', ['ui-notification']);

    app.controller('bestSelectionController', ["$scope", "datacontext",
            function ($scope, datacontext) {
        $scope.favorites = [];
        $scope.displayAdvertType = true;
        datacontext.getFavoriteAdverts()
            .then(function (res) {
                $scope.favorites = res.data;
            })
            .catch(function (err) {
                console.log(err);
            });
    }]);

    app.controller('estimationController', ['$scope','datacontext', 'Notification', '$filter', '$rootScope',
            function ($scope, datacontext, Notification, $filter, $rootScope) {
        
        $scope.property_types = [];  

        datacontext.getPropertyTypes()
            .then(function (res) {
                $scope.property_types = res.data;
            })
            .catch(function (err) {
                console.log(err);
            });

        $scope.sendMail = function(){
            var txt = "La demande suivante a été envoyée depuis le formulaire du site : \r\n\r\n";
            txt += "Bien en " + $scope.data.advert_type + "\r\n";
            txt += "Type de bien : " + $scope.data.property_type + "\r\n";
            txt += "Surface habitable : " + $scope.data.living_surface + "\r\n";
            txt += "Surface totale : " + $scope.data.total_surface + "\r\n";
            txt += "Nombre de pièces : " + $scope.data.nb_rooms + "\r\n";
            txt += "Ville : " + $scope.data.property_city + "\r\n";
            txt += "CP : " + $scope.data.poperty_postal_code + "\r\n";
            if ($scope.data.precisions != undefined && $scope.data.precisions != "")
                txt += "Précisions : " + $scope.data.precisions + "\r\n";

            txt += "\r\nDemandeur : " + $scope.data.first_name + " " + $scope.data.last_name + "\r\n";
            if ($scope.data.address != undefined && $scope.data.address != "") {
                txt += $scope.data.address + "\r\n";
                txt += $scope.data.postal_code + "\r\n";
                txt += $scope.data.city + "\r\n";
            }
            if ($scope.data.phone != undefined && $scope.data.phone != "")
                txt += "Téléphone : " + $scope.data.phone + "\r\n";
            txt += "E-mail : " + $scope.data.email + "\r\n";
            txt += "Langue du demandeur : " + ($rootScope.language == "fr" ? "français" : "anglais");

            datacontext.sendMail("Demande Estimation", txt)
                .then(function (res) {
                    Notification.success($filter('translate')("ESTIMATION_SENT"));
                })
                .catch(function (err) {
                    Notification.error($filter('translate')("ESTIMATION_ERROR"));
                    console.log(err);
                });
        }
    }]);

    app.controller('contactController', ['$scope', '$rootScope', 'datacontext', '$filter', 'Notification', 
            function($scope, $rootScope, datacontext, $filter, Notification){

        $scope.sendMail = function(){
            var txt = "La demande de contact a été envoyée depuis le formulaire du site : \r\n\r\n";
            txt += "Demandeur : " + $scope.data.first_name + " " + $scope.data.last_name + "\r\n";
            if ($scope.data.address != undefined && $scope.data.address != "") {
                txt += $scope.data.address + "\r\n";
                txt += $scope.data.postal_code + "\r\n";
                txt += $scope.data.city + "\r\n";
            }
            if ($scope.data.phone != undefined && $scope.data.phone != "")
                txt += "Téléphone : " + $scope.data.phone + "\r\n";
            txt += "E-mail : " + $scope.data.email + "\r\n";
            txt += "\r\nMessage : \r\n" + $scope.data.message;
            // txt += "Langue du demandeur : " + ($rootScope.language == "fr" ? "français" : "anglais");

            datacontext.sendMail("Formulaire de contact", txt)
                .then(function (res) {
                    Notification.success($filter('translate')("ESTIMATION_SENT"));
                })
                .catch(function (err) {
                    Notification.error($filter('translate')("ESTIMATION_ERROR"));
                    console.log(err);
                });
        }
    }]);

    app.controller('listeController', ['$scope','datacontext', '$routeParams',
            function ($scope, datacontext, $routeParams) {
        
        $scope.listAdverts = [];
        $scope.typeliste = $routeParams["typeliste"];

        var promise;
        switch($scope.typeliste){
            case "coups-de-coeur":
                $scope.displayAdvertType = true;
                promise = datacontext.getFavoriteAdverts();
                break;
            case "vente":
                $scope.displayAdvertType = false;
                promise = datacontext.getAdverts("V");
                break;
            case "location":
                $scope.displayAdvertType = false;
                promise = datacontext.getAdverts("L");
                break;
            case "recherche":
                $scope.displayAdvertType = true;
                // advert type. this one needs to be defined, the others don't.
                var advert_type = $routeParams["advert_type"] || "V";
                // property type
                var property_type = "";
                for (var i in $routeParams) 
                    if (i.substring(0,5) == "type_") 
                        property_type += i.substring(5) + ",";
                // nb rooms
                var nb_rooms = "";
                if ($routeParams["_1piece"])
                    nb_rooms += "1,";
                if ($routeParams["_2pieces"])
                    nb_rooms += "2,";
                if ($routeParams["_3pieces"])
                    nb_rooms += "3,";
                if ($routeParams["_4pieces"])
                    nb_rooms += "4,"; // the extra comma doesn't bother django.
                if ($routeParams["_5piecesEtPlus"])
                    nb_rooms += "5,6,7,8,9,10,11,12"; // sorry.
                // surface
                var min_surface = $routeParams["surfaceTerrainMin"];
                var max_surface = $routeParams["surfaceTerrainMax"];
                // price
                var min_price = $routeParams["budgetMin"];
                var max_price = $routeParams["budgetMax"];
                // location
                var location = "";
                for (var i in $routeParams) 
                    if (i.substring(0,6) == "geoloc") 
                        location += $routeParams[i] + ",";

                promise = datacontext.getAdvertsWithParams(advert_type, property_type, nb_rooms, min_surface, max_surface, 
                    min_price, max_price, location);
                break;
        }

        promise.then(function (res) {
                $scope.listAdverts = res.data;
                for (var i = 0; i < $scope.listAdverts.length; i++) {
                    var pics = $scope.listAdverts[i].pictures.sort(function(a, b){
                        return a.display_order - b.display_order;
                    });
                    $scope.listAdverts[i].displaypic = pics[0].url;
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }]);

    app.controller('detailController', ['$scope','datacontext', '$routeParams', 'Lightbox', 
            function ($scope, datacontext, $routeParams, Lightbox) {
        
        var id = $routeParams["id"];
        $scope.advert = {};
        $scope.photos = [];

        datacontext.getAdvert(id)
            .then(function (res) {
                $scope.advert = res.data;
                
                datacontext.getPhotos(id)
                    .then(function (res) {
                        $scope.photos = res.data;
                        // propriété "url" doit être définie pour la Lightbox
                        for (var i = 0; i < $scope.photos.length; i++)
                            $scope.photos[i].url = $scope.photos[i].picture;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

            })
            .catch(function (err) {
                console.log(err);
            });
            
        $scope.openLightboxModal = function (index) {
            Lightbox.openModal($scope.photos, index);
        };
    }]);
    
        
    app.controller('presentationController', ['$scope','datacontext', '$rootScope', function ($scope, datacontext, $rootScope) {
        $scope.texte_fr = "";
        $scope.texte_en = "";

        datacontext.getPresentationText()
            .then(function (res) {
                $scope.texte_fr = res.data.company_presentation_fr;
                $scope.texte_en = res.data.company_presentation_en;
            })
            .catch(function (err) {
                console.log(err);
            });
        
    }]);

    app.controller('searchController', ['$scope', '$location', 'datacontext', function($scope, $location, datacontext) {

        // getting the property types from the DB mainly so we're sure we have the right ids.
        // the filter uses the ids, not the labels.
        $scope.property_types = [];  
        datacontext.getPropertyTypes()
            .then(function (res) {
                $scope.property_types = res.data;
            })
            .catch(function (err) {
                console.log(err);
            });

        $scope.searchProperty = function() {
            var result = {};
            
            for (var i in $scope.find) {
                if ($scope.find.hasOwnProperty(i) && $scope.find[i] !== false) {
                    result[i] = $scope.find[i];
                }
            }

            $location.path("/liste/recherche").search(result);
        };
    }]);
    
})();