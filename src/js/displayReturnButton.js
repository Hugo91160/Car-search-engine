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
	wipe_car_profile();
	document.getElementById("brand-section").style.display = "";
}