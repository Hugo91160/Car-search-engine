
function autoComplete() {
    var research_value = document.getElementById("search-value").value;
    
	if (research_value.length>=3) {
		//Ecrire la requête en dur
		var query = `select distinct ?s ?n where{ 
			{{?s a dbo:Automobile.}
			UNION
			{?x a dbo:Automobile; dbo:manufacturer ?s.}}
			?s rdfs:label ?n.
	FILTER(langMatches(lang(?n),"EN") && regex(?n, ".*%val%.*", "i"))
	}`;

		var array = [["val", research_value]];
		getResult(query,array, remplacerAutoComplete);
	} else {
		document.getElementById("vehicle-auto-completion").innerHTML = "";
	}
}



//Replace parameters of a generic query by the variables given in the array

function remplacerAutoComplete(data) {
    if (data.results.bindings.length != 0)
    {
		options = "";
		for (var i=0; i<data.results.bindings.length; ++i) {
			//console.log(data.results.bindings[i].n.value);
			options += '<option value="'+data.results.bindings[i].n.value+'">'+data.results.bindings[i].n.value+'</option>';
		}
		document.getElementById("vehicle-auto-completion").innerHTML = options;
        return;
    }
}