---
---
let search_items = {
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
{%- if post.categories contains "twitter" -%}
{%- else -%}
"{{ post.title }}": "{{ post.url }}",
{%- endif -%}
{%- endfor -%}
};
