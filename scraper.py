from bs4 import BeautifulSoup
import requests
import json
spells = []
links = BeautifulSoup(requests.get("http://dnd5e.wikidot.com/spells").text, 'html.parser').find("div", {"id": "wiki-tabview-7632dae26c99280f8a1ebf66b4ac61b6"}).find_all("a")[10:]
for link in links:
   # find content of spell page and break it into chunks
   page = BeautifulSoup(requests.get("http://dnd5e.wikidot.com" + link.attrs['href']).text, 'html.parser')
   sects = page.find("div", {"id": "page-content"}).find_all(recursive = False)[2:-1]
   spell = {}

   # get spell name
   spell['name'] = page.find("title").text.split(" - ")[0]
   print("Creating: " + spell['name'])

   #ignor UA and homebrew
   if "(UA)" in spell['name'] or "(HB)" in spell['name']:
      print("Unofficial spell found, skipping: " + spell['name'])
      continue

   #parse school and level and detect errors in incorrect hyperlink
   try:
      spell['school and level'] = sects[0].text.strip()
   except:
      print("Error fetching spell from http://dnd5e.wikidot.com" + link.attrs['href'])

   if "dunamancy" in spell['school and level'] or "chronurgy" in spell["school and level"]:
         spell['school and level'] = spell['school and level'].split(" (dunamancy")[0]
   #parse casting time
   sects[1] = sects[1].text.split("\n")
   spell['casting time'] = sects[1][0].split(": ")[1]

   #parse reaction if applicable
   if "reaction" in spell['casting time']:
      spell['reaction'] = "when " + spell["casting time"].split("when ")[1]
      spell["casting time"] = spell["casting time"].split(",")[0]

   # parse range
   spell['range'] = sects[1][1].split(": ")[1]

   #parse components
   spell['components'] = sects[1][2].split(": ")[1]

   #parse material if applicable
   if "(" in spell["components"]:
      m = spell["components"].find("(") + 1
      spell["material"] = spell["components"][m:len(spell["components"]) - 1]
      spell["components"] = spell["components"].split(" (")[0].replace(",", "")

   # parse duration
   spell["duration"] = sects[1][3].split(": ")[1]

   #parse Concentration if applicable
   if "Concentration" in spell["duration"]:
      spell["concentration"] = True
      spell["duration"] = spell["duration"].split("to ")[1]
   else:
      spell["concentration"] = False

   # get description
   spell['description'] = ""
   for sect in sects[2:-1]:
      if sect.text.startswith("At Higher Levels"):
         spell['upcast'] = sect.text
         break
      else:
         spell['description'] += str(sect)
   
   # parse spell lists
   if sects[-1].name == "table":
      spell['classes'] = sects[-2].text.split("ists")[1][2:]
   else:    
      spell['classes'] = sects[-1].text.split("ists")[1][2:]
   spells.append(spell)

f = open("spells.json", "w").write(json.dumps(spells, indent=4))
print("JSON file created, proceed to spellCards.html")