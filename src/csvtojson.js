// function used for turning csv to geojson 
//help: https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file

function csvTojson(file, bundeslaender)
{
    var features = [];
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                // all lines in csv seperated
                var allText = rawFile.responseText;
                var lines = allText.split("\n");
               
                // console log to check column position 
                var columns = lines[0].split(";");
                //console.log(columns);

                //create feature GeoJSON per line
                for (i=1; i < lines.length; i++) {
               // for (i=1; i < 2; i++) {
                    var parts = lines[i].split(";");


                    switch (parts[3]) {
                        /// Stadt
                        case "Stadt":
                            var coords = parts[4].split(",");
                            var lat = parseFloat(coords[0]);
                            var lon = parseFloat(coords[1]);
                            var geometry = {
                                "type":"Point",
                                "coordinates": [lon, lat]
                            }
                          break;

                        /// Kreis
                        case "Kreis":
                            break;
                        
                        /// Bundesland
                        case "Bundesland":
                            console.log("Bundesland gefunden, ID: " + parts[4]);

                            // Schleife zum durchsuchen der Bundesland geoJSON mit übereinstimmender ID
                            for (var j = 0; j < bundeslaender.features.length; j++){
                                if (bundeslaender.features[j].id == parts[4]){
                                    var geometry = bundeslaender.features[j].geometry;
                                    console.log("geometrie gegeben");
                                } 
                            } 
                        
                            break;
                         
                        /// National
                        case "National":
                            break;

                        /// International
                        case "International":
                            break;
                        
                        ///default
                        default:
                          break;
                      } // switch ende

                    
                   
                    // geoJSON feature construction
                    var feature = {
                        "type": "Feature",
                        "geometry": geometry,
                        "properties": {
                            "name_de": parts[0],
                            "description_de": parts[6],
                            "name_eng": parts[1],
                            "description_eng":parts[7],
                            "url": parts[8],
                            "layer": parts[3],
                            "category": parts[2],
                            "art": parts[12],
                            "reichweite": parts[11],
                            "nation": parts[13],
                            "stand": parts[9],
                            "selected": false
                        }
                    }
                    // put feature into array
                     features.push(feature);                   
                }
            }
        }
    }
    rawFile.send(null);
    //console.log(features[0]);
    var featureColl =  { 
        "type": "FeatureCollection",
        "features": features 
    };
    return featureColl;
}

/*
0: Bezeichnung_DE	
1: Bezeichnung_EN	
2: Kategorie	
3: Layer	
4: Geometry	
5: Geometry_type	
6: Beschreibung_DE	
7: Beschreibung_EN	
8: URL	
9: Stand	
10: Quelle	
11: Reichweite	
12: Art	
13: Nation
*/