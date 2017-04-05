
(function () {
    var app = angular.module('quercy-front');

    app.config(['$translateProvider', function($translateProvider) {
    
        $translateProvider
            .preferredLanguage('fr')
            .translations('fr', {
                NOS_VALEURS: "Nos valeurs",

                GEN_ADRESSE: "Adresse",
                GEN_CODE_POSTAL: "Code postal",
                GEN_VILLE: "Ville",
                GEN_TELEPHONE: "Téléphone",
                GEN_EMAIL: "E-mail",

                GEN_LOCATION: "Location",
                GEN_VENTE: "Vente",

                GEN_ENVOYER: "Envoyer",

                ESTIMATION_TITRE: "Estimation d'un bien",
                ESTIMATION_SOUSTITRE: "Vous possédez un bien que vous souhaitez faire estimer ?",

                ESTIMATION_DESCRIPTIF_TITRE:"Descriptif du bien",
                ESTIMATION_DESCRIPTIF_BIEN: "Bien proposé",
                ESTIMATION_DESCRIPTIF_BIEN_SELECT: "Sélectionnez votre type de bien",
                ESTIMATION_DESCRIPTIF_BIEN_AUTRE: "Autre (précisez en description)",
                ESTIMATION_DESCRIPTIF_SURFACE_HABITABLE: "Surface habitable",
                ESTIMATION_DESCRIPTIF_SURFACE_TERRAIN: "Surface terrain",
                ESTIMATION_DESCRIPTIF_NB_PIECES: "Nombre de pièces",
                ESTIMATION_DESCRIPTIF_PRECISIONS: "Précisions",
                ESTIMATION_DESCRIPTIF_PRECISIONS_LEGENDE: "Précisez ici des éléments concernant votre bien",
                
                ESTIMATION_COORDONNEES_TITRE: "Vos coordonnées",
                ESTIMATION_COORDONNEES_NOM: "Votre nom",
                ESTIMATION_COORDONNEES_PRENOM: "Prénom",

                CONTACT_TITRE: "Contact",
                CONTACT_MESSAGE: "Votre message"
            })
            .translations('en', {
                NOS_VALEURS: "Our values",

                GEN_ADRESSE: "Address",
                GEN_CODE_POSTAL: "Postal code",
                GEN_VILLE: "City",
                GEN_TELEPHONE: "Phone number",
                GEN_EMAIL: "E-mail",

                GEN_LOCATION: "For rent",
                GEN_VENTE: "For sell",

                GEN_ENVOYER: "Submit",

                ESTIMATION_TITRE: "Estimation",
                ESTIMATION_SOUSTITRE: "Do you own a property you would like to get an estimate on?",

                ESTIMATION_DESCRIPTIF_TITRE:"Property info",
                ESTIMATION_DESCRIPTIF_BIEN: "Type of property",
                ESTIMATION_DESCRIPTIF_BIEN_SELECT: "Please select an option",
                ESTIMATION_DESCRIPTIF_BIEN_AUTRE: "Other (explain in the precisions field below)",
                ESTIMATION_DESCRIPTIF_SURFACE_HABITABLE: "Living surface",
                ESTIMATION_DESCRIPTIF_SURFACE_TERRAIN: "Total surface",
                ESTIMATION_DESCRIPTIF_NB_PIECES: "Number of rooms",
                ESTIMATION_DESCRIPTIF_PRECISIONS: "Precisions",
                ESTIMATION_DESCRIPTIF_PRECISIONS_LEGENDE: "Add anything relevant to your property",
                
                ESTIMATION_COORDONNEES_TITRE: "Your info",
                ESTIMATION_COORDONNEES_NOM: "Last name",
                ESTIMATION_COORDONNEES_PRENOM: "First name",

                CONTACT_TITRE: "Contact",
                CONTACT_MESSAGE: "Your message"

            });
    }]);
})();