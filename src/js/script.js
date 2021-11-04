function rechercher() {
    console.log("first call");
    var research_value = document.getElementById("search-value").value;
    
    //Ecrire la requete en dur
    var query = `select ?s ?ns where{
        <%res%> a dbo:Automobile;dbo:successor+ ?s.
        ?s rdfs:label ?ns
        FILTER(langMatches(lang(?ns),"EN"))
        }`;

    var array = [["res", research_value]];
    getResult(query,array, function (res) {
        console.log(res);
    });
}



//Replace parameters of a generic query by the variables given in the array
function getResult(query,array,processResult) {
    for (var i = 0; i<array.length; i++)
    {
        query = query.replace("%" + array[i][0] + "%",array[i][1]);
    }

    // Encodage de l'URL à transmettre à DBPedia
    var url = "http://dbpedia.org/sparql";
    var params = "query=" + encodeURIComponent(query) + "&default-graph-uri=" + encodeURIComponent("http://dbpedia.org") + "&format=json";
    

    console.log("request : "+ url + "?" + params);
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

function afficherResultats(data) {
    if (data.results.bindings.length == 0)
    {
        //Error not found
        return;
    }
}