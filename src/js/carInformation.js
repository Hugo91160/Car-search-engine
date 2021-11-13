function get_car_info(res) {
    var profile = document.getElementById("profile_result");
    profile.innerHTML = "";
    console.log("Resultat  : "+res)
    //Request : 
    var array = [["val", res]];
    var query = `SELECT  ?label (GROUP_CONCAT(?sb, "|") AS ?brand) ?abstract ?length ?height ?weight ?imagelink ?carname (GROUP_CONCAT(?sy, ", ") AS ?year) (GROUP_CONCAT(?sc, ", ") AS ?class)
        WHERE
        {
            ?carname a dbo:Automobile.
            ?carname rdfs:label ?label.
            OPTIONAL { ?carname dbo:thumbnail ?imagelink.}
            OPTIONAL{ ?carname dbo:abstract ?abstract .}
            OPTIONAL {?carname dbo:length ?length.}
            OPTIONAL {?carname dbo:height ?height.}
            OPTIONAL {?carname dbo:weight ?weight.}
            {
            {SELECT ?carname (CONCAT(CONCAT(?b, ","),?nb) AS ?sb)
			WHERE {
			?carname dbo:manufacturer ?b.
			?b rdfs:label ?nb.
			FILTER(lang(?nb) = "en")
			}}
            UNION
            {?carname dbp:class ?sc.
            FILTER(lang(?sc) = "en")}
            UNION
            {?carname dbp:class ?x.
            ?x rdfs:label ?sc.
            FILTER(lang(?sc) = "en")}
            UNION
            {?carname dbp:production ?sy.
            FILTER(regex(?sy,".") || (datatype(?sy) = xsd:integer && xsd:integer(?sy)>=1000 && xsd:integer(?sy)<year(now())))
            }
            UNION
            {}
            }

            FILTER(?carname = <%val%> && lang(?label) = "en" && lang(?abstract) = "en")
        }
        GROUP BY ?imagelink ?label ?carname ?abstract ?length ?height ?weight
    `;

    getResult(query, array,displayCarInfo , "car Info")
   
}

function displayCarInfo(data){
    //afficher les infos cars 

    if (data.results.bindings.length>0) {
        var profile = document.getElementById("profile_result");
        profile.innerHTML = "<h1>"+data.results.bindings[0].label.value+"</h1>";
        profile.innerHTML += '<p id="profile_result">'+data.results.bindings[0].abstract.value+'</p>';

       
        if (data.results.bindings[0].year.value!="") {
                profile.innerHTML += "<p>Production date: "+data.results.bindings[0].year.value+"</p>";
        }else{
            profile.innerHTML += "<p>Production date: Unknown </p>";
        }
        if (data.results.bindings[0].class.value!="") {
                profile.innerHTML += "<p>Class: "+data.results.bindings[0].class.value+"</p>";
        }else{
            profile.innerHTML += "<p>Class: Unknown </p>";
        }
        if ( data.results.bindings[0].length === undefined ) {
            profile.innerHTML += "<p>Length: Unknown</p>";
        }else{
            profile.innerHTML += "<p>Length: "+data.results.bindings[0].length.value+"</p>";
        }
        if ( data.results.bindings[0].height === undefined ) {
            profile.innerHTML += "<p>Height: Unknown</p>";
        }else{
            profile.innerHTML += "<p>Height: "+data.results.bindings[0].height.value+"</p>";
        }
        if ( data.results.bindings[0].weight === undefined ) {
            profile.innerHTML += "<p>Weight: Unknown</p>";
        }else{
            profile.innerHTML += "<p>Weight: "+data.results.bindings[0].weight.value+"</p>";
        }
		var mans = data.results.bindings[0].brand.value.split("|");
		if (mans.length>1 || mans[0]!="") {
			if (mans.length>1) {
				profile.innerHTML += "<p>Manufacturers: "
			} else {
				profile.innerHTML += "<p>Manufacturer: "
			}
			for (var i=0; i<mans.length; ++i) {
				var man_entry = mans[i].split(",");
				profile.innerHTML += "<button onclick='displayManufacturer(\""+man_entry[0]+"\")'>"+man_entry[1]+"</button>";
			}
			profile.innerHTML += "</p>"
		}
        //brand_information(data.results.bindings[0].brand.value);
        console.log(data.results.bindings[0].brand.value);

        var table = document.getElementById("results-table");
        table.style.display = 'none';

        if ( data.results.bindings[0].imagelink === undefined ) {
            profile.innerHTML += "<img src='img/carDefaultImage.png' ";
        }else{
            profile.innerHTML += "<img src='"+data.results.bindings[0].imagelink.value+"' />"
        }
    }
    //appel de la requête constructeur info + diisplay
}   
