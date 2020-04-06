let calendar_sticks = [];
let calendar_detail = function(section_id, expand, stick){
		let detail_id = section_id + '-detail';
		let section = document.querySelector(section_id);
		let detail = document.querySelector(detail_id);
		// Check if section_id is in calendar_sticks
		const index = calendar_sticks.indexOf(section_id);
		if (index > -1) {
				if (!stick){
						return;
				}
				detail.style.display = "none";
				// Remove the section_id from calendar_sticks
				calendar_sticks.splice(index, 1);
		} else {
				if (stick){
						detail.style.display = "block";
						calendar_sticks.push(section_id);
				} else {
						detail.style.display = (expand && "block") || "none";
				}
		}
}
