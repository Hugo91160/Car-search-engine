function getResult(query,array,processResult) {
    for (var i = 0; i<array.length; i++)
    {
        query = query.replace("%" + array[i][0] + "%",array[i][1]);
    }

    // Encodage de l'URL à transmettre à DBPedia
    var url = "http://dbpedia.org/sparql";
    var params = "query=" + encodeURIComponent(query) + "&default-graph-uri=" + encodeURIComponent("http://dbpedia.org") + "&format=json";
    

    //console.log("request : "+ url + "?" + params);
    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            console.log("response :" +  this.responseText);
            var results = JSON.parse(this.responseText);
            processResult(results);
        }
    };
    xmlhttp.open("GET", url + "?" + params, true);
    xmlhttp.send();
    
}
