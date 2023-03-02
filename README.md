# SpellCards
Generate spell cards for DND 5th edition spells and scrape information of newly released spells from the dnd wikidot

Breakdown of project setup:
Static/css: contains the css files to style all the different tabs. 
Static/js: containes the js files for functionality of all the tabs. 
Scraper.py: a simple web scraper that turns every official (non-UA and non-HB) spell on this page (http://dnd5e.wikidot.com/spells) into a JSON object stored in "spells.json". 
Spell Cards.html: the primary user of the program. Just open it and follow directions. 
Spells.json: a json list where each index is one of the spells.
