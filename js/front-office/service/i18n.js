
(function () {
    var app = angular.module('quercy-front');

    app.config(['$translateProvider', function($translateProvider) {
    
        $translateProvider
            .preferredLanguage('fr')
            .translations('fr', {
                NOS_VALEURS: 'Nos valeurs',
                
            })
            .translations('en', {
                NOS_VALEURS: 'Our values',
                
            });
    
    }]);
})();