(function () {
    var app = angular.module('front-controllers');

    app.service('datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getPropertyTypes: getPropertyTypesImpl,
            getPresentationText: getPresentationTextImpl,
            getPhotos: getPhotosImpl,
            getAdvert: getAdvertImpl,
            getAdverts: getAdvertsImpl,
            getAdvertsWithParams: getAdvertsWithParamsImpl,
            getFavoriteAdverts: getFavoriteAdvertsImpl,

            sendMail: sendMailImpl
        }

        function getPropertyTypesImpl() {
            return $http.get(baseUrl + "property_types/");
        }

        function getPresentationTextImpl() {
            return $http.get(baseUrl + "company_info/1/");
        }

        function getAdvertImpl(id){
            return $http.get(baseUrl + "properties/"+id+"/");
        }

        function getPhotosImpl(advertid){
            return $http.get(baseUrl + "pictures/?prop="+advertid);
        }

        function getAdvertsImpl(advert_type){
            return $http.get(baseUrl + "properties/?state=L&advert_type="+advert_type);
        }

        function getAdvertsWithParamsImpl(advert_type){
            var rech = "advert_type=" + advert_type;
            return $http.get(baseUrl + "properties/?state=L&" + rech);
        }

        function getFavoriteAdvertsImpl(){
            return $http.get(baseUrl + "properties/?state=L&is_favorite=True");
        }

        function sendMailImpl(subject, message){
            var data = {"subject":subject, "message":message};
            return $http.post(baseUrl + "email", data);
        }

        return service;
    }]);
})();