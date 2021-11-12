function get_car_info(res) {
    var profile = document.getElementById("profile_result");
    profile.innerHTML = "";
    console.log("Resultat  : "+res)
    //Request : 
    var array = [["val", res]];
    var query = `SELECT  ?label ?brand ?abstract ?length ?height ?weight ?imagelink ?carname ?class (GROUP_CONCAT(?year, ", ") AS ?prod)
        WHERE
        {
            ?carname a dbo:Automobile.
            ?carname rdfs:label ?label.
            OPTIONAL { ?carname dbo:thumbnail ?imagelink.}
            OPTIONAL { ?carname dbp:production ?year.}
            OPTIONAL { ?carname dbo:manufacturer ?brand.}
            OPTIONAL{ ?carname dbo:abstract ?abstract .}
            OPTIONAL{ ?carname dbp:class ?class .}
            OPTIONAL {?carname dbo:length ?length.}
            OPTIONAL {?carname dbo:height ?height.}

            FILTER(?carname = <%val%> && lang(?label) = "en" && lang(?abstract) = "en")
        }
        GROUP BY ?imagelink ?label ?carname ?abstract ?brand ?class ?length ?height ?weight
    `;

    getResult(query, array,displayCarInfo , "car Info")
   
}

function displayCarInfo(data){
    //afficher les infos cars 

    if (data.results.bindings.length>0) {
        var profile = document.getElementById("profile_result");
        profile.innerHTML = '<p id="profile_result">'+data.results.bindings[0].abstract.value+'</p>';
        brand_information(data.results.bindings[0].brand.value);
        console.log(data.results.bindings[0].brand.value);

        var table = document.getElementById("results-table");
        table.style.display = 'none';
    }
    //appel de la requête constructeur info + diisplay
}   
