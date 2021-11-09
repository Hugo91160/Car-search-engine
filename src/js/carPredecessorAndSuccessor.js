function search_car_relatives(){
    var research_value = document.getElementById("search-value").value;
    //console.log("Call of search car relatives")
    var resource = search_resource_name(get_car_relatives, research_value)

}

function get_car_relatives (res){
    //requests:
    var query1 = `
    select ?p ?np where{
        <%res%> a dbo:Automobile; dbo:predecessor+ ?p.
        ?p rdfs:label ?np
        FILTER(langMatches(lang(?np),"EN"))
        }
    `;
    var query2 =`
    select ?s ?ns where{
        <%res%> a dbo:Automobile;dbo:successor+ ?s.
        ?s rdfs:label ?ns
        FILTER(langMatches(lang(?ns),"EN"))
        }
    `;

    var array = [["res", res]];

    getResult(query1, array,displayCarPredecessor);
    getResult(query2, array,displayCarSuccessor);
}

function displayCarPredecessor(data){
    //affichage data
}   

function displayCarSuccessor(data){
    //affichage data
}  