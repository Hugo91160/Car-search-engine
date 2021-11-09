function brand_information(brand){
    console.log("Call of search brand car information")
    get_brand_info(brand)
}

function get_brand_info(res){
    var array = [["val", res]];
    var query = `SELECT  ?abstract ?label ?brand ?link ?reflogo
        WHERE 
        {
            OPTIONAL{ ?brand dbo:abstract ?abstract .}
            OPTIONAL{ ?brand rdfs:label ?label .}
            OPTIONAL { ?brand foaf:homepage ?link.}
            OPTIONAL { ?brand dbp:logo ?reflogo.}
    
        FILTER(?brand = <%val%> && lang(?label) = "en" && lang(?abstract) = "en" )
        }
    `;
    getResult(query, array,displayBrandInfo)
   
}

function displayBrandInfo(data){
    //affichage des infos de la marque
    var URLlogo = getlogo(date.results.bindings[0].reflogo.value)
    //create an img element in the div with src=URLlogo

}   