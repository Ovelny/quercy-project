(function () {
    var app = angular.module('quercy-back');

    app.service('adverts.datacontext', function ($http) {
       
        var baseUrl = "http://127.0.0.1:8000/api/";

        var service = {
            getAdvert: getAdvertImpl,
            getProperties: getPropertiesImpl,
            getPropertyTypes: getPropertyTypesImpl
        }

        function getAdvertImpl(id){
            return $http.get(baseUrl + "properties/"+id);
        }

        function getPropertyTypesImpl() {
            return $http.get(baseUrl + "property_types/");
        }

        function getPropertiesImpl(advert_type) {
            var adv_type = advert_type == "vente" ? "V" : "L";
            return $http.get(baseUrl + "properties/?advert_type="+adv_type);
        }

        return service;
    });
})();