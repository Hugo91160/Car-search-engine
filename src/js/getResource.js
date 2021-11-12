function search_resource_name(processResult,research_value){
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
    //console.log(research_value);
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
    var array = [["val", research_value]];
    var query = `select distinct ?s ?n
    where{
        {{?s a dbo:Automobile.}
        UNION
        {?x a dbo:Automobile; dbo:manufacturer ?s.}}
        ?s rdfs:label ?n.
        FILTER(langMatches(lang(?n),"EN") && regex(?n, "^%val%$", "i"))
    }
    `;
    console.log(query);

    getResult(query,array, function (data) {
        //Pre traitement
        if(data.results.bindings.length != 0){
            res = data.results.bindings[0].s.value
            processResult(res);
        } else {
            res = undefined
        }
        
    } , "resource name");

}
