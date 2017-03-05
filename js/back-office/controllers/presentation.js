(function () {
    angular.module('quercy-back')
        .controller('presentation.controller', ['$scope', 'company.datacontext', 'Notification',
            function ($scope, datacontext, Notification) {

                $scope.company_presentation_fr = "";
                $scope.company_presentation_en = "";


                datacontext.getPresentationText()
                    .then(function (res) {
                        $scope.company_presentation_fr = res.data.company_presentation_fr;
                        $scope.company_presentation_en = res.data.company_presentation_en;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                            

                $scope.save = function(){
                    datacontext.savePresentationText($scope.company_presentation_fr, $scope.company_presentation_en)
                        .then(function (res) {
                            Notification.success("Modifications enregistrées !");
                        })
                        .catch(function (err) {
                            Notification.error("Une erreur est survenue lors de l'enregistrement.");
                            console.log(err);
                        });
                }
            }]);
})();