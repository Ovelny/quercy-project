(function () {
    var app = angular.module('front-controllers');

    app.service('datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getPropertyTypes: getPropertyTypesImpl
        }


        function getPropertyTypesImpl() {
            return $http.get(baseUrl + "property_types/");
        }



        return service;
    }]);
})();