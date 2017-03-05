(function () {
    var app = angular.module('quercy-back');

    app.service('company.datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getPresentationText: getPresentationTextImpl,
            savePresentationText: savePresentationTextImpl
        }

        function getPresentationTextImpl() {
            return $http.get(baseUrl + "company_info/1/");
        }

        function savePresentationTextImpl(text_fr, text_en){
            var data = {company_presentation_fr: text_fr, company_presentation_en: text_en};
            return $http.put(baseUrl + "company_info/1/", data);
        }
        
        return service;
    }]);
})();