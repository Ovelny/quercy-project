(function () {
    var app = angular.module('front-controllers');

    app.service('datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getPropertyTypes: getPropertyTypesImpl,
            getPresentationText: getPresentationTextImpl,

            sendMail: sendMailImpl
        }

        function getPropertyTypesImpl() {
            return $http.get(baseUrl + "property_types/");
        }

        function getPresentationTextImpl() {
            return $http.get(baseUrl + "company_info/1/");
        }

        function sendMailImpl(subject, message){
            var data = {"subject":subject, "message":message};
            return $http.post(baseUrl + "email", data);
        }

        return service;
    }]);
})();