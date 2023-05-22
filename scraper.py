from bs4 import BeautifulSoup
import requests
import json
spells = []
page = BeautifulSoup(requests.get("http://dnd5e.wikidot.com/spells").text, 'html.parser')
tabs = [page.find("div", {"id": f"wiki-tab-0-{i}"}) for i in range(10)]
links = [a for links in [tab.find_all("a") for tab in tabs] for a in links] # list of list of links for each tab
for link in links:
   # find content of spell page and break it into chunks
   page = BeautifulSoup(requests.get("http://dnd5e.wikidot.com" + link.attrs['href']).text, 'html.parser')
   sects = page.find("div", {"id": "page-content"}).find_all(recursive = False)[2:-1]
   spell = {}

   spell['name'] = page.find("title").text.split(" - ")[0]
   #ignor UA and homebrew
   if "(UA)" in spell['name'] or "(HB)" in spell['name']:
      print("Unofficial spell found, skipping: " + spell['name'])
      continue
   else:
      print("Creating: " + spell['name'])

   #parse school and level and detect errors in incorrect hyperlink
   try:
      bits = sects[0].text.strip().split()
      if bits[1] == "cantrip":
         spell['school'] = bits[0]
         spell['level'] = bits[1]
      else:
         spell['school'] = bits[1]
         spell['level'] = bits[0]
   except:
      print("Error fetching spell from http://dnd5e.wikidot.com" + link.attrs['href'])

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
print("JSON file created")