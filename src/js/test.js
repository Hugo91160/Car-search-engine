function rechercher() {
    var research_value = document.getElementById("search-value").value;
    
    //Ecrire la requête en dur
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

function afficherResultats(data) {
    if (data.results.bindings.length == 0)
    {
        //Error not found
        return;
    }
}