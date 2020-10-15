var sidenavinstances;
var boxedinstances;
var collapseinstances;
var dropdowninstances;
var autocompleteinstances;
var tabinstances;

document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.sidenav');
	sidenavinstances = M.Sidenav.init(elems, {edge: 'left'});
	var boxed = document.querySelectorAll('.materialboxed');
	boxedinstances = M.Materialbox.init(boxed, {});
	var collapse = document.querySelectorAll('.collapsible');
	collapseinstances = M.Collapsible.init(collapse, {accordion: false});
	var dropdown = document.querySelectorAll('.dropdown-trigger');
	dropdowninstances = M.Dropdown.init(dropdown, {hover: false, alignment: 'left'});

	var tabinstances = document.querySelectorAll('.tabs');
	tabinstances = M.Tabs.init(tabinstances, {swipeable: true});


/*    var scrollspies = document.querySelectorAll('.scrollspy');
    scrollspyinstances = M.ScrollSpy.init(scrollspies, {});*/

    init_autocomplete();

	let materializeLoadedEvent = new CustomEvent("materializeLoaded");
	document.dispatchEvent(materializeLoadedEvent);
 });

let init_autocomplete = function () {
    mapping = {
		"Kontakt": "/contact/",
		"Gruppen": "/other/groups/",
		"Demosphere": "/other/demosphere/",
		"Dokumente": "/other/documents/",
		"Kalender": "/other/calendar/",
		"Linksunten": "/other/linksunten/",
		"Archiv": "/archive/",
    };

	let null_mapping = function () {
        results = {};
        for (let value in mapping) {
            results[value] = null;
        }
        return results;
    }


    let visit_search = function (selection) {
        window.open(mapping[selection], "_self");
    };

	var autocompletes = document.querySelectorAll('.autocomplete');
	autocompleteinstances = M.Autocomplete.init(autocompletes, {
		onAutocomplete: visit_search,
		data: null_mapping()
	});
}
