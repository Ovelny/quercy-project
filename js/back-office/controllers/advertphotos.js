(function () {
    angular.module('quercy-back')
        .controller('advertphotos.controller', ['$scope', '$routeParams', '$rootScope','$location', '$http', '$route',
                                                'adverts.datacontext', 'photos.datacontext', 'Notification', 'FileUploader',
            function ($scope, $routeParams, $rootScope, $location, $http, $route, advertdatacontext, datacontext, 
                        Notification, FileUploader) {
                
                var advert_id = $routeParams["advert_id"];
                $scope.photos = [];
                
                $scope.uploader = new FileUploader({
                    url: $rootScope.baseUrl + 'pictures/',
                    headers: {"Authorization": $http.defaults.headers.common['Authorization']},
                    queueLimit: 2,
                    removeAfterUpload: true
                });
                // Set queue limit to 2 but remove first element when there are 2
                // This is because with a queue limit of 1 the first item never gets replaced 
                // even if the user chooses another file from the selector before uploading.
                $scope.uploader.onAfterAddingAll = function () {
                    if ($scope.uploader.getNotUploadedItems().length > 1)
                        $scope.uploader.removeFromQueue(0);
                };

                // Refresh display after successful upload + un-select selected file.
                $scope.uploader.onSuccessItem = function(item, response, status, headers){
                    // document.getElementById("addPhotoForm").reset();
                    // getPhotos();
                    $route.reload(); // refresh page. easier to make the preview reset too...
                }

                // Catch upload errors
                $scope.uploader.onErrorItem = function(item, response, status, headers){
                    console.log(response);
                }

                // Only accept images
                $scope.uploader.filters.push({
                    name: 'imageFilter',
                    fn: function(item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|'.indexOf(type) !== -1;
                    }
                });
                
                function getPhotos(){
                    datacontext.getPhotos(advert_id)
                        .then(function (res) {
                            $scope.photos = res.data;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }

                function getDisplayOrder(){
                    // renvoie le numéro que devra avoir la photo ajoutée (par défaut, elle est ajoutée à la fin de la liste)
                    return $scope.photos.length;
                }

                $scope.uploader.onBeforeUploadItem = function (item) {
                    item.alias = "picture";
                    item.formData.push({
                        "prop": $scope.advert.id,
                        "display_order": getDisplayOrder()
                    });
                }

                $scope.addPhoto = function(){
                    if ($scope.uploader.getNotUploadedItems().length < 1)
                        return;
                    $scope.uploader.uploadItem(0);
                }

                $scope.switchOrder = function(index1, index2){
                    var temp = $scope.photos[index1];
                    $scope.photos[index1] = $scope.photos[index2];
                    $scope.photos[index2] = temp;
                    $scope.photos[index1].display_order = index1;
                    $scope.photos[index2].display_order = index2;
                    datacontext.savePhotoDisplayOrder($scope.photos[index1])
                        .catch(function (err) {
                            console.log(err);
                        });
                    datacontext.savePhotoDisplayOrder($scope.photos[index2])
                        .catch(function (err) {
                            console.log(err);
                        });
                }
                
                $scope.removePhoto = function(index){
                    if (confirm("Voulez-vous vraiment supprimer cette photo ?")){
                        datacontext.deletePhoto($scope.photos[index].id)
                            .then(function (res) {
                                $scope.photos.splice(index, 1);
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                }

                $scope.back = function(){
                    $location.path('annonce/'+advert_id);
                }

                advertdatacontext.getAdvert(advert_id)
                    .then(function (res) {
                        $scope.advert = res.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                getPhotos();

            }]);
})();