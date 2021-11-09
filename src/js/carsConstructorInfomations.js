function search_constructor_cars(){
    var research_value = document.getElementById("search-value").value;
    console.log("Call of search of all constector's cars")
    var resource = search_resource_name(get_Other_cars, research_value);

}

function get_Other_cars(res) {

    //Request :
    var array = [["res", res]];
    var query = `SELECT DISTINCT ?o WHERE{
    ?o a dbo:Automobile . ?o dbo:manufacturer <%res%> .
     }
    `;

    getResult(query, array,displayInfo)

}

function displayInfo(data){
    //affichage data
}
