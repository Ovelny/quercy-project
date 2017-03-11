(function () {
    var app = angular.module('quercy-back');

    app.service('photos.datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            // addPhoto: addPhotoImpl,
            getPhotos: getPhotosImpl
        }

        // function addPhotoImpl(prop, display_order, file){
        //     var data = { "prop": prop, "display_order":display_order, "picture":file};
        //     return $http.post(baseUrl + "pictures/", data);
        // }

        function getPhotosImpl(advertid){
            return $http.get(baseUrl + "pictures/?prop="+advertid);
        }

        return service;
    }]);
})();