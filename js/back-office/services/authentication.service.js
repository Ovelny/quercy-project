(function () {
    var app = angular.module('quercy-back');

    app.service('authentication.service', ['$http', '$rootScope', '$cookies', 
    function ($http, $rootScope, $cookies) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            login: loginImpl,
            setAuth: setAuthImpl,
            clearAuth: clearAuthImpl
        }
        
        function loginImpl(username, password) {
            return $http.post(baseUrl+'authenticate', { username: username, password: password });
        }

        function setAuthImpl(username, token) {
            $rootScope.currentUser = {
                username: username,
                token: token
            };
 
            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Token ' + token;
 
            // store user details in a cookie that keeps user logged in for 1 day (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 1);
            $cookies.putObject('currentUser', $rootScope.currentUser, { expires: cookieExp });
        }

        function clearAuthImpl() {
            $rootScope.currentUser = undefined;
            $cookies.remove('currentUser');
            $http.defaults.headers.common.Authorization = '';
        }

        return service;
    }]);
})();