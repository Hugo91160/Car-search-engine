function Search (){
	display_return_button (false);
	wipe_car_profile();
	wipe_brand_profile();
    var research_value = document.getElementById("search-value").value;
    //console.log("Call of search car relatives")
    var resource = search_resource_name(found_name, research_value)

}

function wipe_brand_profile(){
	document.getElementById("brand-section").style.display = "none";
}
function wipe_car_profile(){
	var profile = document.getElementById("profile_result");
	profile.innerHTML = "";
	profile = document.getElementById("car_profile");
	profile.style.display = "none";
    var pred = document.getElementById("pred_result");
	pred.style.display = 'none';
    var succ = document.getElementById("succ_result");
	succ.style.display = 'none';
}

function found_name(res) {
    get_car_info(res);
    get_car_relatives(res);
    get_constructor_cars(res);
    get_brand_info(res);
}

function displayManufacturer (res){
	wipe_car_profile();
	brand_information(res);
    get_constructor_cars(res);
}
