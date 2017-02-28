(function () {
    var app = angular.module('front-controllers', []);

    app.controller('bestSelectionController', function ($scope) {
        $scope.favorites = [
            {
                "id": 2,
                "title_fr": "La jolie maison qu'elle est belle",
                "advert_type": "Vente",
                "state": "Libre",
                "description_fr": "djeiojezoifjez fioj zefi zejfoijz oif jziof jzoi ",
                "description_en": "djeiojezoifjez fioj zefi zejfoijz oif jziof jzoi ",
                "nb_rooms": 5,
                "price": "55000.00",
                "address": "5 rue Cinq",
                "postal_code": "55000",
                "city": "Cinq-La-Jolie",
                "living_surface": "55.00",
                "total_surface": "55.00",
                "construction_year": 1955,
                "nb_floors": 1,
                "energy_consumption": "55.00",
                "gas_emission": "55.00",
                "is_favorite": false,
                "property_type": 1,
                "heating_type": 1,
                "kitchen_type": 1
            },

            {
                "id": 4,
                "title_fr": "La jolie grange qu'elle est sale",
                "advert_type": "Vente",
                "state": "Libre",
                "description_fr": "Aaaaaa",
                "description_en": "Aaaaa",
                "nb_rooms": 5,
                "price": "5.00",
                "address": "a",
                "postal_code": "a",
                "city": "a",
                "living_surface": "5.00",
                "total_surface": "5.00",
                "construction_year": 2005,
                "nb_floors": 1,
                "energy_consumption": "5.00",
                "gas_emission": "5.00",
                "is_favorite": false,
                "property_type": 1,
                "heating_type": 2,
                "kitchen_type": 1
            },

            {
                "id": 4,
                "title_fr": "Le joli appart qu'il est beau",
                "advert_type": "Vente",
                "state": "Libre",
                "description_fr": "Aaaaaaghkhhdkgdjkgdger",
                "description_en": "Aaaaajvkdjvlkdjlksdjv",
                "nb_rooms": 5,
                "price": "5.00",
                "address": "a",
                "postal_code": "a",
                "city": "a",
                "living_surface": "5.00",
                "total_surface": "5.00",
                "construction_year": 2005,
                "nb_floors": 1,
                "energy_consumption": "5.00",
                "gas_emission": "5.00",
                "is_favorite": false,
                "property_type": 1,
                "heating_type": 2,
                "kitchen_type": 1
            }
        ];

    });

})();