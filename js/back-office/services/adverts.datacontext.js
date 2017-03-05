(function () {
    var app = angular.module('quercy-back');

    app.service('adverts.datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getAdvert: getAdvertImpl,
            getHeatingTypes: getHeatingTypesImpl,
            getKitchenTypes: getKitchenTypesImpl,
            getProperties: getPropertiesImpl,
            getPropertyTypes: getPropertyTypesImpl,
            saveAdvert: saveAdvertImpl
        }

        function getHeatingTypesImpl(){
            return $http.get(baseUrl + "heating_types/");
        }
        function getKitchenTypesImpl(){
            return $http.get(baseUrl + "kitchen_types/");
        }
        function getPropertyTypesImpl() {
            return $http.get(baseUrl + "property_types/");
        }

        function getAdvertImpl(id){
            return $http.get(baseUrl + "properties/"+id+"/");
        }

        function getPropertiesImpl(advert_type) {
            var adv_type = advert_type == "vente" ? "V" : "L";
            return $http.get(baseUrl + "properties/?advert_type="+adv_type);
        }

        function saveAdvertImpl(advert){
            var id = advert.id;
            var data = advert;
            return $http.put(baseUrl + "properties/"+id+"/", data);
        }

        return service;
    }]);
})();