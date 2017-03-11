(function () {
    var app = angular.module('quercy-back');

    app.service('photos.datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            // addPhoto: addPhotoImpl,
            getPhotos: getPhotosImpl,
            savePhotoDisplayOrder: savePhotoDisplayOrderImpl,
            deletePhoto: deletePhotoImpl
        }

        // function addPhotoImpl(prop, display_order, file){
        //     var data = { "prop": prop, "display_order":display_order, "picture":file};
        //     return $http.post(baseUrl + "pictures/", data);
        // }

        function getPhotosImpl(advertid){
            return $http.get(baseUrl + "pictures/?prop="+advertid);
        }

        function savePhotoDisplayOrderImpl(photo){
            var data = {"display_order": photo.display_order};
            return $http.patch(baseUrl + "pictures/"+photo.id+"/", data);
        }

        function deletePhotoImpl(id){
            return $http.delete(baseUrl + "pictures/"+id+"/");
        }

        return service;
    }]);
})();