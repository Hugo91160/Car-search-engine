function brand_information(brand){
    console.log("Call of search brand car information")
    get_brand_info(brand)
}

function get_brand_info(res){
    var array = [["val", res]];
    var query = `SELECT  ?abstract ?label ?brand ?link ?reflogo
        WHERE 
        {
			?o a dbo:Automobile; dbo:manufacturer ?brand.
            OPTIONAL{ ?brand dbo:abstract ?abstract .}
            OPTIONAL{ ?brand rdfs:label ?label .}
            OPTIONAL { ?brand foaf:homepage ?link.}
            OPTIONAL { ?brand dbo:thumbnail ?reflogo.}
    
        FILTER(?brand = <%val%> && lang(?label) = "en" && lang(?abstract) = "en" )
        }
    `;
    getResult(query, array,displayBrandInfo)
   
}

function displayBrandInfo(data){

    if (data.results.bindings.length>0) {
        //var URLlogo = getlogo(data.results.bindings[0].label.value, data.results.bindings[0].reflogo.value);
        //var URLlogo = data.results.bindings[0].reflogo.value;
        var brandName = (data.results.bindings[0].label.value.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        //if (brandName == "Citroën") {brandName = "citroen" ;}

		var URLlogo = "https://www.carlogos.org/car-logos/"+brandName+"-logo.png";
        console.log("URLlogo : " + URLlogo);
		var brandInfo = document.getElementById("brand-info");
		brandInfo.style.display = "";
        var inner = "<h1 class='title_profile'>"+data.results.bindings[0].label.value+"</h1>";
        inner += "<div class='row'>";
        inner += "<div class='abstract col-8'><p>"+data.results.bindings[0].abstract.value+'</p></div>';
		inner += "<div class='image_profile col-4'>";
        inner += "<img src='"+URLlogo+"' />"
		inner += "</div>";
		inner += "</div>";
		inner += "<br/>";


        brandInfo.innerHTML = inner;
        document.getElementById("brand-section").style.display = "";
    }

    //affichage des infos de la marque
    
    //create an img element in the div with src=URLlogo

}   