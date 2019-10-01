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
                    var parts = lines[i].split(";");
                    console.log(parts);
                    switch (parts[3]) {
                        case "Stadt":
                            var geometry = {
                                "type":"Point",
                                "coordinates": [parts[4]]
                            }
                            return geometry;
                          break;
                        case "Kreis":
                            // Anweisungen werden ausgeführt,
                            // falls expression mit value2 übereinstimmt
                            break;
                        case "Bundesland":
                            for (var i = 0; i < bundeslaender.length; i++){
                                if (bundeslaender.features.id = parts[4]){
                                    var geometry = bundesland.features.geometry;
                                    return geometry;
                                }
                            }
                          break;
                        case "National":
                            // Anweisungen werden ausgeführt,
                            // falls expression mit value2 übereinstimmt
                            break;
                        case "International":
                            // Anweisungen werden ausgeführt,
                            // falls expression mit value2 übereinstimmt
                            break;
                        case valueN:
                          // Anweisungen werden ausgeführt,
                          // falls expression mit valueN übereinstimmt
                          break;
                        default:
                          // Anweisungen werden ausgeführt,
                          // falls keine der case-Klauseln mit expression übereinstimmt
                          break;
                      }

                    
                   
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
                            "category": parts[2],
                            "art": parts[12],
                            "reichweite": parts[11],
                            "nation": parts[13],
                            "stand": parts[9]
                        }
                    }
                    // put feature into array
                     features.push(feature);                   
                }
            }
        }
    }
    rawFile.send(null);
    console.log(features[0]);
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