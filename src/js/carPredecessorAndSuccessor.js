function get_car_relatives (res){
    var pred = document.getElementById("pred_result");
	pred.style.display = 'none';
    var succ = document.getElementById("succ_result");
	succ.style.display = 'none';
    //requests:
    var query1 = `
		SELECT ?o ?n (GROUP_CONCAT(?sy, ", ") AS ?y) (GROUP_CONCAT(?sc, ", ") AS ?c) WHERE{
        <%res%> a dbo:Automobile; dbo:predecessor+ ?o.
        ?o rdfs:label ?n.
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
    var query2 =`
		SELECT ?o ?n (GROUP_CONCAT(?sy, ", ") AS ?y) (GROUP_CONCAT(?sc, ", ") AS ?c) WHERE{
        <%res%> a dbo:Automobile; dbo:successor+ ?o.
        ?o rdfs:label ?n.
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

    var array = [["res", res]];

    getResult(query1, array,displayCarPredecessor , "predecessor");
    getResult(query2, array,displayCarSuccessor, "successor");
}

function displayCarPredecessor(data){
    var pred = document.getElementById("pred_result");
    if (data.results.bindings.length>0) {
        pred.style.display = '';
    } else {
        pred.style.display = 'none';
	}
    //affichage data
    var tbody = document.getElementById("pred-table-body");
    var table = document.getElementById("pred-table");
	
	displayCarTable(data, tbody, table, false);
}   

function displayCarSuccessor(data){
    var succ = document.getElementById("succ_result");
    if (data.results.bindings.length>0) {
        succ.style.display = '';
    } else {
        succ.style.display = 'none';
	}
	
    //affichage data
    var tbody = document.getElementById("succ-table-body");
    var table = document.getElementById("succ-table");
	
	displayCarTable(data, tbody, table, false);
}  