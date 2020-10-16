---
---
var search_items = {
"Blog": "/",
"Kontakt": "/contact/",
"Gruppen": "/other/groups/",
"Demosphere": "/other/demosphere/",
"Dokumente": "/other/documents/",
"Kalender": "/other/calendar/",
"Lexikon": "/other/lexicon/",
"Linksunten": "/other/linksunten/",
"Archiv": "/archive/",
{% for post in site.posts %}
{% unless post.categories contains "twitter" %}
"{{ post.title | escape }}": "{{ post.url }}",
{% endunless %}
{% endfor %}
};
