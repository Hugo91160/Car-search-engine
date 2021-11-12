function get_constructor_cars (res){
    //Request : 
    var array = [["res", res]];
    var query = `
    SELECT ?o ?n (GROUP_CONCAT(?sy, "/") AS ?y) (GROUP_CONCAT(?sc, "/") AS ?c) WHERE{
        ?o a dbo:Automobile; 
        dbo:manufacturer <%res%>;
        rdfs:label ?n.
        {
        {?o dbp:class ?sc.
        FILTER(lang(?sc) = "en")}
        UNION
        {?o dbp:class ?x.
        ?x rdfs:label ?sc.
        FILTER(lang(?sc) = "en")}
        UNION
        {?o dbp:production ?sy.
        FILTER(regex(?sy,".") || (datatype(?sy) = xsd:integer && xsd:integer(?sy)>=1000 && xsd:integer(?sy)<year(now())))
        }
        UNION
        {}
        }
        FILTER(lang(?n) = "en")
        } GROUP BY ?o ?n
    `;

    getResult(query, array,displayConstructorCarsInfo , "constructor cars")

}

function displayConstructorCarsInfo(data){
    //affichage data
    var tbody = document.getElementById("results-table-body");
    tbody.innerHTML = "";
   
  
    for (let i = 0; i < data.results.bindings.length; i++) {
            var row = tbody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var link = data.results.bindings[i].o.value;
            var name = data.results.bindings[i].n.value;
            cell1.innerHTML = String(i+1);
            cell2.innerHTML = name;
            row.link = link;
            row.onclick = function(e) {
                get_car_info(this.link);
                get_car_relatives(this.link);
            };
            console.log(link);
            var year = "";
            if (data.results.bindings[i].y!==undefined) {
                year = data.results.bindings[i].y.value;
            }
            var classe = "";
            if (data.results.bindings[i].c!==undefined) {
                classe = data.results.bindings[i].c.value;
            }
            
            cell3.innerHTML = year;
            cell4.innerHTML = classe;
            console.log(data.results.bindings[i].o.value)
    }

    
    console.log(data.results.bindings[5].o.value)
}   