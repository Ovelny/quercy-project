
(function () {
    var app = angular.module('quercy-front');

    app.config(['$translateProvider', function ($translateProvider) {

        $translateProvider
            .preferredLanguage('fr')
            .translations('fr', {
                NOS_VALEURS: "Nos valeurs",

                GEN_ADRESSE: "Adresse",
                GEN_CODE_POSTAL: "Code postal",
                GEN_VILLE: "Ville",
                GEN_TELEPHONE: "Téléphone",
                GEN_EMAIL: "E-mail",

                GEN_PRIX: "Prix",
                GEN_LOYER: "Loyer",

                GEN_LOCATION: "Location",
                GEN_ADVERT_TYPE_L: "Location",
                GEN_VENTE: "Vente",
                GEN_ADVERT_TYPE_V: "Vente",

                GEN_ENVOYER: "Envoyer",
                GEN_RECHERCHER: "Rechercher",
                GEN_DESCRIPTIF_NB_PIECES: "Nombre de pièces",

                RECHERCHE_TITRE: "Rechercher un bien",
                RECHERCHE_DESCRIPTIF_ANNONCE: "Type d'annonce",
                RECHERCHE_DESCRIPTIF_BIEN: "Type de bien",
                RECHERCHE_DESCRIPTIF_SURFACE: "Surface",
                RECHERCHE_DESCRIPTIF_BUDGET: "Budget",
                RECHERCHE_SOUSTITRE_GEOLOC: "Villes françaises, départements ou codes postaux",
                RECHERCHE_DESCRIPTIF_GEOLOC: "Un(e) seul(e) par zone de saisie",

                NORESULT: "Aucune annonce ne correspond aux critères définis.",

                ESTIMATION_TITRE: "Estimation d'un bien",
                ESTIMATION_SOUSTITRE: "Vous possédez un bien que vous souhaitez faire estimer ?",

                ESTIMATION_DESCRIPTIF_TITRE: "Descriptif du bien",
                ESTIMATION_DESCRIPTIF_BIEN: "Bien proposé",
                ESTIMATION_DESCRIPTIF_BIEN_SELECT: "Sélectionnez votre type de bien",
                ESTIMATION_DESCRIPTIF_BIEN_AUTRE: "Autre (précisez en description)",
                ESTIMATION_DESCRIPTIF_SURFACE_HABITABLE: "Surface habitable",
                ESTIMATION_DESCRIPTIF_SURFACE_TERRAIN: "Surface terrain",
                ESTIMATION_DESCRIPTIF_PRECISIONS: "Précisions",
                ESTIMATION_DESCRIPTIF_PRECISIONS_LEGENDE: "Précisez ici des éléments concernant votre bien",

                ESTIMATION_COORDONNEES_TITRE: "Vos coordonnées",
                ESTIMATION_COORDONNEES_NOM: "Votre nom",
                ESTIMATION_COORDONNEES_PRENOM: "Prénom",

                ESTIMATION_SENT: "Votre demande a bien été prise en compte.",
                ESTIMATION_ERROR: "Une erreur est survenue. Veuillez nous en excuser.",

                CONTACT_TITRE: "Contact",
                CONTACT_MESSAGE: "Votre message",

                NAVBAR_ACCUEIL: "Accueil",
                NAVBAR_RECHERCHE: "Recherche",
                NAVBAR_PRESENTATION: "Présentation",
                NAVBAR_VENTE: "Biens en vente",
                NAVBAR_LOCATION: "Locations",
                NAVBAR_COUPS_DE_COEUR: "Coups de coeur",
                NAVBAR_ESTIMATION: "Estimation",
                NAVBAR_CONTACT: "Contact",

                PROPERTY_TYPE_Appartement: "Appartement",
                PROPERTY_TYPE_Immeuble: "Immeuble",
                PROPERTY_TYPE_Maison: "Maison",
                PROPERTY_TYPE_Terrain: "Terrain",
                PROPERTY_TYPE_Local: "Local",
                PROPERTY_TYPE_Divers: "Divers",
                PROPERTY_TYPE_5_PIECES: "5 et plus",

                LISTE_vente: "Biens en vente",
                LISTE_location: "Biens en location",
                "LISTE_coups-de-coeur": "Nos coups de coeur",
                LISTE_recherche: "Résultats de la recherche",

                LIGHTBOX_PREVIOUS: "Précédent",
                LIGHTBOX_NEXT: "Suivant",
                LIGHTBOX_OPEN_IN_NEW_TAB: "Ouvrir l'image dans un nouvel onglet",

                BIEN_TYPE_CHAUFFAGE: "Type de chauffage",
                BIEN_TYPE_CUISINE: "Type de cuisine",
                BIEN_CHAUFFAGE_Bois: "Bois",
                BIEN_CHAUFFAGE_Electrique: "Electrique",
                BIEN_CHAUFFAGE_Fioul: "Fioul",
                BIEN_CUISINE_Equipée: "Equipée",
                "BIEN_CUISINE_Non équipée": "Non équipée",

                BIEN_ANNEE_CONSTRUCTION: "Année de construction",
                BIEN_CONSO: "Consommations énergétiques",
                BIEN_EMISSION: "Emissions gaz",

                BIEN_REF: "Référence",
                BIEN_INFOS_COMPL: "Informations complémentaires",
                BIEN_GALERIE: "Galerie",
                BIEN_GALERIE_AIDE: "(Cliquez sur une image pour l'agrandir)"
            })
            .translations('en', {
                NOS_VALEURS: "Our values",

                GEN_ADRESSE: "Address",
                GEN_CODE_POSTAL: "Postal code",
                GEN_VILLE: "City",
                GEN_TELEPHONE: "Phone number",
                GEN_EMAIL: "E-mail",

                GEN_PRIX: "Price",
                GEN_LOYER: "Rent",

                GEN_LOCATION: "For rent",
                GEN_ADVERT_TYPE_L: "For rent",
                GEN_VENTE: "For sell",
                GEN_ADVERT_TYPE_V: "For sell",

                GEN_ENVOYER: "Submit",
                GEN_RECHERCHER: "Search",
                GEN_DESCRIPTIF_NB_PIECES: "Number of rooms",

                RECHERCHE_TITRE: "Search a property",
                RECHERCHE_DESCRIPTIF_ANNONCE: "Advert type",
                RECHERCHE_DESCRIPTIF_BIEN: "Type of property",
                RECHERCHE_DESCRIPTIF_SURFACE: "Surface",
                RECHERCHE_DESCRIPTIF_BUDGET: "Budget",
                RECHERCHE_SOUSTITRE_GEOLOC: "French cities, department or postal codes",
                RECHERCHE_DESCRIPTIF_GEOLOC: "Only one for each field",

                NORESULT: "No advert matching the criteria was found.",

                ESTIMATION_TITRE: "Estimation",
                ESTIMATION_SOUSTITRE: "Do you own a property you would like to get an estimate on?",

                ESTIMATION_DESCRIPTIF_TITRE: "Property info",
                ESTIMATION_DESCRIPTIF_BIEN: "Type of property",
                ESTIMATION_DESCRIPTIF_BIEN_SELECT: "Please select an option",
                ESTIMATION_DESCRIPTIF_BIEN_AUTRE: "Other (explain in the precisions field below)",
                ESTIMATION_DESCRIPTIF_SURFACE_HABITABLE: "Living surface",
                ESTIMATION_DESCRIPTIF_SURFACE_TERRAIN: "Total surface",
                ESTIMATION_DESCRIPTIF_PRECISIONS: "Precisions",
                ESTIMATION_DESCRIPTIF_PRECISIONS_LEGENDE: "Add anything relevant to your property",

                ESTIMATION_COORDONNEES_TITRE: "Your info",
                ESTIMATION_COORDONNEES_NOM: "Last name",
                ESTIMATION_COORDONNEES_PRENOM: "First name",

                ESTIMATION_SENT: "You request has been forwarded.",
                ESTIMATION_ERROR: "An error has occured. Please bear with us.",

                CONTACT_TITRE: "Contact",
                CONTACT_MESSAGE: "Your message",

                NAVBAR_ACCUEIL: "Home",
                NAVBAR_RECHERCHE: "Search",
                NAVBAR_PRESENTATION: "Our company",
                NAVBAR_VENTE: "Properties to sell",
                NAVBAR_LOCATION: "Rent",
                NAVBAR_COUPS_DE_COEUR: "Our selection",
                NAVBAR_ESTIMATION: "Estimate",
                NAVBAR_CONTACT: "Contact",

                PROPERTY_TYPE_Appartement: "Apartment",
                PROPERTY_TYPE_Immeuble: "Building",
                PROPERTY_TYPE_Maison: "House",
                PROPERTY_TYPE_Terrain: "Plot",
                PROPERTY_TYPE_Local: "Room",
                PROPERTY_TYPE_Divers: "Other",
                PROPERTY_TYPE_5_PIECES: "5 or more",

                LISTE_vente: "Properties for sell",
                LISTE_location: "Properties for rent",
                "LISTE_coups-de-coeur": "Our selection",
                LISTE_recherche: "Search results",

                LIGHTBOX_PREVIOUS: "Previous",
                LIGHTBOX_NEXT: "Next",
                LIGHTBOX_OPEN_IN_NEW_TAB: "Open image in new tab",
                
                BIEN_TYPE_CHAUFFAGE: "Heating type",
                BIEN_TYPE_CUISINE: "Kitchen type",
                BIEN_CHAUFFAGE_Bois: "Wood",
                BIEN_CHAUFFAGE_Electrique: "Electric",
                BIEN_CHAUFFAGE_Fioul: "(en)Fioul",
                BIEN_CUISINE_Equipée: "(en)Equipée",
                "BIEN_CUISINE_Non équipée": "(en)Non équipée",

                BIEN_ANNEE_CONSTRUCTION: "Construction year",
                BIEN_CONSO: "Energy consumption",
                BIEN_EMISSION: "Gas emissions",

                BIEN_REF: "Ref",
                BIEN_INFOS_COMPL: "Additionnal information",
                BIEN_GALERIE: "Photos",
                BIEN_GALERIE_AIDE: "(Click on a picture to enlarge it)"
            });
    }]);
})();