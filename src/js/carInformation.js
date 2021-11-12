function get_car_info(res) {
    console.log("Resultat  : "+res)
    //Request : 
    var array = [["val", res]];
    var query = `SELECT  ?label ?brand ?abstract ?length ?height ?weight ?imagelink ?carname ?class (GROUP_CONCAT(?year, ", ") AS ?prod)
        WHERE
        {
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
    brand_information(data.results.bindings[0].brand.value)
    console.log(data.results.bindings[0].brand.value)
    //appel de la requête constructeur info + diisplay
}   
