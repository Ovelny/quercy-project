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
            getEstimate: getEstimateImpl,
            saveEstimate: saveEstimateImpl,
            createEstimate: createEstimateImpl,
            deleteEstimate: deleteEstimateImpl,

            getVisitReportsByCustomer: getVisitReportsByCustomerImpl,
            getVisitReport: getVisitReportImpl,
            saveVisitReport: saveVisitReportImpl,
            createVisitReport: createVisitReportImpl,
            deleteVisitReport: deleteVisitReportImpl
        }

        // -- Customers

        function getCustomerImpl(id){
            return $http.get(baseUrl + "customers/" + id + "/");
        }

        function getCustomersImpl(filterText, orderby, orderasc) {
            var ordering = (orderasc ? '' : '-') + orderby;
            var filter = filterText == "" ? "" : "&search=" + filterText;
            return $http.get(baseUrl + "customers/?ordering=" + ordering + filter);
        }

        function saveCustomerImpl(customer){
            return $http.put(baseUrl + "customers/" + customer.id + "/", customer);
        }

        function createCustomerImpl(customer){
            delete customer.id;
            return $http.post(baseUrl + "customers/", customer);
        }

        function deleteCustomerImpl(id){
            return $http.delete(baseUrl + "customers/" + id + "/");
        }

        // -- Estimates

        function getEstimatesByCustomerImpl(customer_id){
            return $http.get(baseUrl + "estimates/?customer=" + customer_id);
        }
        function getEstimateImpl(id){
            return $http.get(baseUrl + "estimates/" + id + "/");
        }
        function saveEstimateImpl(estimate){
            return $http.put(baseUrl + "estimates/" + estimate.id + "/", estimate);
        }
        function createEstimateImpl(estimate){
            return $http.post(baseUrl + "estimates/", estimate);
        }
        function deleteEstimateImpl(id){
            return $http.delete(baseUrl + "estimates/" + id + "/");
        }

        // -- Visit reports

        function getVisitReportsByCustomerImpl(customer_id){
            return $http.get(baseUrl + "visit_reports/?customer=" + customer_id);
        }
        function getVisitReportImpl(id){
            return $http.get(baseUrl + "visit_reports/" + id + "/");
        }
        function saveVisitReportImpl(report){
            return $http.put(baseUrl + "visit_reports/" + report.id + "/", report);
        }
        function createVisitReportImpl(report){
            return $http.post(baseUrl + "visit_reports/", report);
        }
        function deleteVisitReportImpl(id){
            return $http.delete(baseUrl + "visit_reports/" + id + "/");
        }

        return service;
    }]);
})();