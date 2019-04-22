    //afficher carte de fond,les zones industrielles, zone urbaine avec boutons
    var map = L.map('map').setView([35.7095, -5.8511], 11);

        mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        
    var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);
        
    
    //add a ponits geojson data icon
    var usineIcon= new L.Icon({
        iconUrl:"images/icon_usine.png",
        iconSize:[15,15]
    });
    //var popupConent= "<h2>Tanger"+feature.properties.Zone + "</h2"
       // + "<p> Information société: </p>"
        //+ "<ul><li>Nom:" + feature.properties.Nom +"</li></ul>";

    function usine(feature, layer){
        layer.bindPopup("<h3> Zone industrille:</h3"
        + "<p> "+feature.properties.Zone + " </p>"
        + "<ul><li>Nom:" + feature.properties.Nom +"</li></ul>");
        layer.setIcon(usineIcon);
    }; 
    var zoneUrbaineSymbol={
        "color":"#ffff62",
        "fillColor":"#488D52",
        "fillOpacity":0.2
    };   

    //var societes=L.geoJson(societ_tfz,{
       // onEachFeature:commune
        //}).addTo(map);
    var zoneUrbaine = L.geoJson(zone_urbane,{
        style:zoneUrbaineSymbol
    }).addTo(map);
    
    var societePoints = L.geoJson(societ_tfz,{
            onEachFeature: usine
                }).addTo(map);

    var zigSocietes= L.geoJson(zig,{
                    onEachFeature: usine
                }).addTo(map);

     var zimSocietes= L.geoJson(zim,{
                    onEachFeature: usine
                }).addTo(map);

    var tacSocietes= L.geoJson(tac,{
                    onEachFeature: usine
                }).addTo(map);

    var mgDelimit=L.geoJson(mg_delimit, {
            style:zoneUrbaineSymbol
        }).addTo(map);

    var tfzDelimit=L.geoJson(tfz_delimit,{
        style:zoneUrbaineSymbol
    }).addTo(map);

    var gzDelimit=L.geoJson(gz_delimit,{
        style:zoneUrbaineSymbol
    }).addTo(map);
        
    var baseLayers={
        "OpenStreetMap":osm
    };
    
    var  overlays={
        "Délimitation TFZ":tfzDelimit, 
        "TFZ":societePoints,
        "Zone Urbaine":zoneUrbaine,
        "Délimitation ZIG":gzDelimit,
        "ZI Guznaia":zigSocietes,
        "Délimitation ZIM":mgDelimit,
        "ZI Mghougha":zimSocietes,
        "Tanger Automotive City":tacSocietes
    };

    L.control.layers(baseLayers,overlays).addTo(map);

    // Function to add societe
        function addSocietes(){
            map.addLayer(societePoints);
        };
    // Function to remove societe
        function removeSocietes(){
            map.removeLayer(societePoints);
        };

     // Function to toggle societe
        function toggleSociete(){
            if(map.hasLayer(societePoints)){
                removeSocietes();
            } else {
                addSocietes();
            }
        };


     // Function to toggle societe
        function toggleSociete_zig(){
            if(map.hasLayer(zigSocietes)){
                map.removeLayer(zigSocietes);
            } else {
                map.addLayer(zigSocietes);
            }
        };
        //function to switch mgougha societes
        function toggleMghougha(){
            if(map.hasLayer(zimSocietes)){
                map.removeLayer(zimSocietes);
            } else {
                map.addLayer(zimSocietes);
            }
        };
        //function to switch mgougha societes
        function toggle_tac(){
            if(map.hasLayer(tacSocietes)){
                map.removeLayer(tacSocietes);
            } else {
                map.addLayer(tacSocietes);
            }
        };
        $(document).ready(function () {
        // Use $( "elementID") and the jQuery click listener method to add on the add button
        $("#addButton").click(function() {
            addSocietes();
        });

        // Use $( "elementID") and the jQuery click listener method to remove on the remove button
        $("#removeButton").click(function() {
            removeSocietes();
        });

        // Use $( "elementID") and the jQuery click listener method to toggle on the toggle button
        $("#toggleButTFZ").click(function() {
            toggleSociete();
        });

        // Use $( "elementID") and the jQuery click listener method to toggle on the toggle button
        $("#toggleButgz").click(function() {
            toggleSociete_zig();
        });

        $("#toggleButmg").click(function() {
            toggleMghougha();
        });

        $("#toggleButTAC").click(function() {
            toggle_tac();
        });

        });


    
    