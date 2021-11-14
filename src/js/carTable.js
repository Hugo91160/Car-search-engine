function displayCarTable (data, tbody, table, return_button){
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
			row.return_button = return_button;
            row.onclick = function(e) {
				display_return_button(this.return_button);
				document.getElementById("brand-section").style.display = "none";
                get_car_info(this.link);
                get_car_relatives(this.link);
            };
            console.log(link);
            var year = "Unknown";
            if (data.results.bindings[i].y.value!="") {
                year = data.results.bindings[i].y.value;
            }
            var classe = "Unknown";
            if (data.results.bindings[i].c.value!="") {
                classe = data.results.bindings[i].c.value;
            }
            
            cell3.innerHTML = year;
            cell4.innerHTML = classe;
            console.log(data.results.bindings[i].o.value)
    }
}