(function () {
    var app = angular.module('quercy-back');

    app.service('adverts.datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getAdvert: getAdvertImpl,
            getHeatingTypes: getHeatingTypesImpl,
            getKitchenTypes: getKitchenTypesImpl,
            getProperties: getPropertiesImpl,
            getFavoriteProperties: getFavoritePropertiesImpl,
            getPropertyTypes: getPropertyTypesImpl,
            saveAdvert: saveAdvertImpl,
            createAdvert: createAdvertImpl,
            deleteAdvert: deleteAdvertImpl
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

        function getPropertiesImpl(advert_type, filter_type, filter_text, orderby, orderasc) {
            var adv_type = advert_type == "" ? "" : "advert_type=" + advert_type;
            var filter = filter_text == "" ? "" : filter_type + "=" + filter_text;
            var ordering = "ordering=" + (orderasc ? '' : '-') + orderby;
            if (adv_type != "" && filter != "")
                return $http.get(baseUrl + "properties/?" + adv_type + "&" + filter + "&" + ordering);
            else if (adv_type == "" && filter == "")
                return $http.get(baseUrl + "properties/?" + ordering);
            else
                return $http.get(baseUrl + "properties/?" + adv_type + filter + "&" + ordering);
        }

        function getFavoritePropertiesImpl(orderby, orderasc){
            var ordering = (orderasc ? '' : '-') + orderby;
            return $http.get(baseUrl + "properties/?is_favorite=True&ordering=" + ordering);
        }

        function saveAdvertImpl(advert){
            var id = advert.id;
            var data = advert;
            return $http.put(baseUrl + "properties/"+id+"/", data);
        }

        function createAdvertImpl(advert){
            delete advert.id;
            return $http.post(baseUrl + "properties/", advert);
        }

        function deleteAdvertImpl(advert_id){
            return $http.delete(baseUrl + "properties/"+advert_id+"/");
        }

        return service;
    }]);
})();