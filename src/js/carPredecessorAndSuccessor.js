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

    getResult(query1, array,displayCarPredecessor , "predecessor");
    getResult(query2, array,displayCarSuccessor, "successor");
}

function displayCarPredecessor(data){
    //affichage data
}   

function displayCarSuccessor(data){
    //affichage data
}  