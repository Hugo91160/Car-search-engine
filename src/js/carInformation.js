function search_car_information(){
    var research_value = document.getElementById("search-value").value;
    //console.log("Call of search basic car information")
    var resource = search_resource_name(get_car_info, research_value)
}

function get_car_info(res) {

    //Request : 
    var array = [["val", res]];
    var query = `SELECT  ?label ?brand ?abstract ?length ?height ?weight ?imagelink ?carname ?class (GROUP_CONCAT(?year, ", ") AS ?prod)
        WHERE 
        {
            OPTIONAL {?carname rdfs:label ?label.}
            OPTIONAL { ?carname dbo:thumbnail ?imagelink.}
            OPTIONAL { ?carname dbp:production ?year.}
            OPTIONAL { ?carname dbp:manufacturer ?brand.}
            OPTIONAL{ ?carname dbo:abstract ?abstract .}
            OPTIONAL{ ?carname dbp:class ?class .}
            OPTIONAL {?carname dbo:length ?length.}
            OPTIONAL {?carname dbo:height ?height.}
            OPTIONAL {?carname dbo:weight ?weight.}
            
            FILTER(?carname = <%val%> && lang(?label) = "en" && lang(?abstract) = "en")
        }
        GROUP BY ?imagelink ?label ?carname ?abstract ?brand ?class ?length ?height ?weight
    `;

    getResult(query, array,displayCarInfo , "car Info")
   
}

function displayCarInfo(data){
    //affichage data
}   