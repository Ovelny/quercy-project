(function () {
    var app = angular.module('quercy-back');

    app.service('customers.datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getCustomer: getCustomerImpl,
            getCustomers: getCustomersImpl,
            createCustomer: createCustomerImpl,
            saveCustomer: saveCustomerImpl,
            deleteCustomer: deleteCustomerImpl,

            getEstimatesByCustomer: getEstimatesByCustomerImpl,
            getVisitReportsByCustomer: getVisitReportsByCustomerImpl,
            getVisitReport: getVisitReportImpl
        }

        function getCustomerImpl(id){
            return $http.get(baseUrl + "customers/" + id + "/");
        }

        function getCustomersImpl(filterText, orderby, orderasc) {
            var ordering = (orderasc ? '' : '-') + orderby;
            var filter = filterText == "" ? "" : "&search=" + filterText;
            return $http.get(baseUrl + "customers/?ordering=" + ordering + filter);
        }

        function saveCustomerImpl(customer){
            var id = customer.id;
            var data = customer;
            return $http.put(baseUrl + "customers/"+id+"/", data);
        }

        function createCustomerImpl(customer){
            delete customer.id;
            return $http.post(baseUrl + "customers/", customer);
        }

        function deleteCustomerImpl(id){
            return $http.delete(baseUrl + "customers/" + id + "/");
        }

        function getEstimatesByCustomerImpl(customer_id){
            return $http.get(baseUrl + "estimates/?customer=" + customer_id);
        }
        function getVisitReportsByCustomerImpl(customer_id){
            return $http.get(baseUrl + "visit_reports/?customer=" + customer_id);
        }

        function getVisitReportImpl(id){
            return $http.get(baseUrl + "visit_reports/" + id + "/");
        }

        return service;
    }]);
})();