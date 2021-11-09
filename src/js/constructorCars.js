function search_constructor_cars(){
    var research_value = document.getElementById("search-value").value;
    //console.log("Call of search basic car information")
    var resource = search_resource_name(get_constructor_cars, research_value)
}

function get_constructor_cars (res){
    //Request : 
    var array = [["res", res]];
    var query = `
    SELECT DISTINCT ?o WHERE{
        ?o a dbo:Automobile . ?o dbo:manufacturer <%res%> .
        }
    `;

    getResult(query, array,displayConstructorCarsInfo , "constructor cars")

}

function displayConstructorCarsInfo(data){
    //affichage data
}   