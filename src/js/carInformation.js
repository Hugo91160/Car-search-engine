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
            FILTER(regex(?sy,".") || (datatype(?sy) = xsd:integer && xsd:integer(?sy)>=1500 && xsd:integer(?sy)<year(now())))
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
		var profile = document.getElementById("car_profile");
		profile.style.display = "";
        var profile = document.getElementById("profile_result");
		var inner = "<h1 class='title_profile'>"+data.results.bindings[0].label.value+"</h1>";
		inner += "<div class='row'>";
        inner += "<div class='abstract col-8'><p>"+data.results.bindings[0].abstract.value+'</p></div>';
		inner += "<div class='image_profile col-4'>";
        if ( data.results.bindings[0].imagelink === undefined ) {
            inner += "<img src='img/carDefaultImage.png' />";
        }else{
            inner += "<img src='"+data.results.bindings[0].imagelink.value+"' />"
        }
		inner += "</div>";
		inner += "</div>";
		inner += "<br/>";
		inner += "<div class='row'>";
        inner += "<div class='offset-1 col-4 key_point'><p>Production date<br/>";
        if (data.results.bindings[0].year.value!="") {
            inner += "<span class='key_value'>"+data.results.bindings[0].year.value+"</span>";
        }else{
            inner += "Unknown";
        }
		inner += "</p></div>";
        inner += "<div class='offset-2 col-4 key_point'><p>Class<br/>";
        if (data.results.bindings[0].class.value!="") {
            inner += "<span class='key_value'>"+data.results.bindings[0].class.value+"</span>";
        }else{
            inner += "Unknown";
        }
		inner += "</p></div>";
		inner += "</div>";
		inner += "<div class='row'>";
        inner += "<div class='offset-3 col-2 key_point'><p>Length<br/>";
        if ( data.results.bindings[0].length === undefined ) {
            inner += "Unknown";
        }else{
            inner += "<span class='key_value'>"+data.results.bindings[0].length.value+" m</span>";
        }
		inner += "</p></div>";
        inner += "<div class='col-2 key_point'><p>Height<br/>";
        if ( data.results.bindings[0].height === undefined ) {
            inner += "Unknown";
        }else{
            inner += "<span class='key_value'>"+data.results.bindings[0].height.value+" m</span>";
        }
		inner += "</p></div>";
        inner += "<div class='col-2 key_point'><p>Weight<br/>";
        if ( data.results.bindings[0].weight === undefined ) {
            inner += "Unknown";
        }else{
            inner += "<span class='key_value'>"+(parseFloat(data.results.bindings[0].weight.value)/1000)+" kg</span>";
        }
		inner += "</p></div>";
		inner += "</div>";
		inner += "<div class='row'>";
        inner += "<div class='offset-1 col-10 key_point'><p>";
		var mans = data.results.bindings[0].brand.value.split("|");
		if (mans.length>1) {
			inner += "Manufacturers"
		} else {
			inner += "Manufacturer"
		}
		inner += "<br/><span class='key_value'>"
		for (var i=0; i<mans.length; ++i) {
			var man_entry = mans[i].split(",");
			if (i!=0) {
				inner += " &centerdot; "
			}
			inner += "<a href='#' onclick='displayManufacturer(\""+man_entry[0]+"\")'>"+man_entry[1]+"</a>";
		}
		inner += "</span></p></div>";
		inner += "</div>";
		
		profile.innerHTML = inner;
        //brand_information(data.results.bindings[0].brand.value);
        console.log(data.results.bindings[0].brand.value);

    }
    //appel de la requête constructeur info + diisplay
}   
