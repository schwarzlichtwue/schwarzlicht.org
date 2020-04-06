---
---

let calendar_entries = [
{% for entry in site.data.calendar %}
{
		"name": "{{entry.name}}",
		"description": "{{entry.description}}",
		"type": "{{entry.type}}",
		"singular": {{entry.singular}},
		"date": "{{entry.date}}"
},
{% endfor %}
];
