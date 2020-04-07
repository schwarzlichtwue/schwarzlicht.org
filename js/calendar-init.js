let calendar_element = document.querySelector(".calendar-container");
let calendar = new CalendarShell({container: calendar_element,
		categories: calendar_categories,
		month_names: calendar_monthnames,
		weekdays: calendar_weekdays,
		entries: calendar_entries });
calendar.setup();

let calendar_category_update = function(checkbox_id, category_id){
	let checkbox = document.querySelector(checkbox_id);
	calendar_categories[category_id].active = checkbox.checked;
	calendar.updateCategories();
}

let calendar_month_update = function(direction){
		let year_month = {}
		if (direction == "next") {
				year_month = calendar.nextPage();
		} else if (direction == "previous") {
				year_month = calendar.previousPage();
		} else if (direction == "now") {
				window.open("#", "_self");
				location.reload();
				return;
		}
		function pad(n, width, z) {
				z = z || '0';
				n = n + '';
				return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}
		let year = pad(year_month.year, 4);
		let month = pad(year_month.month, 2);
		let link = "#" + year + "-" + month;
		window.open(link, "_self");
		location.reload();

}
/* Make entries interactive: hover over an entry to expand details */
let calendar_sticked = null;
let calendar_detail = function(section_id, expand, stick){
		let detail_id = section_id + '-detail';
		let section = document.querySelector(section_id);
		let detail = document.querySelector(detail_id);
		let sticked_detail_id = calendar_sticked + '-detail';
		let sticked_section = document.querySelector(calendar_sticked);
		let sticked_detail = document.querySelector(sticked_detail_id);
		// Check if section_id is in calendar_sticks
		if (section_id == calendar_sticked) {
				if (!stick){
						return;
				}
				detail.style.display = "none";
				// Remove the section_id from calendar_sticks
				calendar_sticked = null;
		} else {
				if (stick){
						if(sticked_detail){
								sticked_detail.style.display = "none";
						}
						detail.style.display = "block";
						calendar_sticked = section_id;
				} else {
						detail.style.display = (expand && "block") || "none";
				}
		}
}

document.addEventListener('DOMContentLoaded', function() {
	for (let category_id of Object.keys(calendar_categories)){
		calendar_category_update("#cal-cat--"+ category_id +"-input", category_id);
	}
});
