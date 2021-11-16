function get_constructor_cars (res){
    var tbody = document.getElementById("results-table-body");
    tbody.innerHTML = "";
    //Request : 
    var array = [["res", res]];
    var query = `
    SELECT ?o ?n (GROUP_CONCAT(?sy, ", ") AS ?y) (GROUP_CONCAT(?sc, ", ") AS ?c) WHERE{
        ?o a dbo:Automobile; 
        dbo:manufacturer <%res%>;
        rdfs:label ?n.
        {
        {?o dbp:class ?sc.
        FILTER(regex(?sc,".") && lang(?sc) = "en")}
        UNION
        {?o dbp:class ?x.
        ?x rdfs:label ?sc.
        FILTER(regex(?sc,".") && lang(?sc) = "en")}
        UNION
        {?o dbp:production ?sy.
        FILTER(regex(?sy,".") || (datatype(?sy) = xsd:integer && xsd:integer(?sy)>=1500 && xsd:integer(?sy)<year(now())))
        }
        UNION
        {}
        }
        FILTER(lang(?n) = "en")
        } GROUP BY ?o ?n
        ORDER BY ?n
    `;

    getResult(query, array,displayConstructorCarsInfo , "constructor cars")

}

function displayConstructorCarsInfo(data){
    //affichage data
    var tbody = document.getElementById("results-table-body");
    var table = document.getElementById("results-table");
	
	displayCarTable(data, tbody, table, true);
}   