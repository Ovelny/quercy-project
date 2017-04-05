(function () {
    var app = angular.module('front-controllers');

    app.service('datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getPropertyTypes: getPropertyTypesImpl,
            getPresentationText: getPresentationTextImpl
        }


        function getPropertyTypesImpl() {
            return $http.get(baseUrl + "property_types/");
        }

        function getPresentationTextImpl() {
            return $http.get(baseUrl + "company_info/1/");
        }

        return service;
    }]);
})();