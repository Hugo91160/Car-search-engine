function display_return_button (active){
	button = document.getElementById("returnButton");
	if (active) {
		button.style.display = "";
	}else{
		button.style.display = "none";
	}
}



function return_to_table (){
	display_return_button(false);
	profile = document.getElementById("profile_result");
	profile.innerHTML = "";
	profile = document.getElementById("car_profile");
	profile.style.display = "none";
	table = document.getElementById("results-table");
	table.style.display = "";
    var pred = document.getElementById("pred_result");
	pred.style.display = 'none';
    var succ = document.getElementById("succ_result");
	succ.style.display = 'none';
}