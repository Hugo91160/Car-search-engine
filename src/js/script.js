function Search (){
	display_return_button (false);
    var research_value = document.getElementById("search-value").value;
    //console.log("Call of search car relatives")
    var resource = search_resource_name(found_name, research_value)

}

function found_name(res) {
    get_car_info(res);
    get_car_relatives(res);
    get_constructor_cars(res);
}

function displayManufacturer (res){
	profile = document.getElementById("profile_result");
	profile.innerHTML = "";
    get_constructor_cars(res);
}
