let meta = {};
meta.color = {};
meta.select = {};
meta.card = {};
meta.select = {};
meta.select.form = `
<span class="list-content-holder">
            <table id="list-filter-table" cellspacing="0">
                <tbody>
                    <tr>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="artificer"></td>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="bard"></td>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="cleric"></td>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="druid"></td>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="paladin"></td>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="ranger"></td>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="sorcerer"></td>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="warlock"></td>
                        <td class="list-filter-data"><input type="checkbox" onchange="fillTable(this)" id="wizard"></td>
                    </tr>
                    <tr>
                        <td class="list-filter-data">Artificer</td>
                        <td class="list-filter-data">Bard</td>
                        <td class="list-filter-data">Cleric</td>
                        <td class="list-filter-data">Druid</td>
                        <td class="list-filter-data">Paladin</td>
                        <td class="list-filter-data">Ranger</td>
                        <td class="list-filter-data">Sorcerer</td>
                        <td class="list-filter-data">Warlock</td>
                        <td class="list-filter-data">Wizard</td>
                    </tr>
                </tbody>
            </table>
            <div style="width: 80%; padding: 20px 0px; margin: 0px;">
                <label style="font-size: large;">Name: </label>
                <input type="text" style="width: 50%; height: 25px;" id="name" oninput="fillTable(this)">
            </div>
            <span class="list-content-holder">
                <div class="list-filter-div">
                    <label>School: </label>
                    <select oninput="fillTable(this)" id='school'>
                        <option disabled selected>Select</option>
                        <option>Abjuration</option>
                        <option>Conjuration</option>
                        <option>Divination</option>
                        <option>Enchantment</option>
                        <option>Evocation</option>
                        <option>Illusion</option>
                        <option>Necromancy</option>
                        <option>Transmutation</option>
                    </select>
                </div>
                <div class="list-filter-div">
                    <label>Level: </label>
                    <select oninput="fillTable(this)" id='level'>
                        <option disabled selected>Select</option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                    </select>
                </div>
                <div class="list-filter-div">
                    <label>Casting Time: </label>
                    <select oninput="fillTable(this)" id='casting time'>
                        <option disabled selected>Select</option>
                        <option>1 action</option>
                        <option>1 bonus action</option>
                        <option>1 reaction</option>
                        <option>1 minute</option>
                        <option>10 minutes</option>
                        <option>1 hour</option>
                    </select>
                </div>
            </span>
            <span class="list-content-holder">
                <div class="list-filter-div">
                    <label>Range: </label>
                    <select oninput="fillTable(this)" id='range'>
                        <option disabled selected>Select</option>
                        <option>Self</option>
                        <option>Touch</option>
                        <option>Sight</option>
                        <option>5 feet</option>
                        <option>10 feet</option>
                        <option>30 feet</option>
                        <option>60 feet</option>
                        <option>90 feet</option>
                        <option>100 feet</option>
                        <option>120 feet</option>
                        <option>150 feet</option>
                        <option>300 feet</option>
                        <option>500 feet</option>
                        <option>1 mile</option>
                    </select>
                </div>
                <div class="list-filter-div">
                    <label>Duration: </label>
                    <select oninput="fillTable(this)" id='duration'>
                        <option disabled selected>Select</option>
                        <option>Instantaneous</option>
                        <option>1 round</option>
                        <option>1 minute</option>
                        <option>10 minutes</option>
                        <option>1 hour</option>
                        <option>8 hours</option>
                        <option>24 hours</option>
                        <option>7 days</option>
                        <option>30 days</option>
                        <option>Until Dispelled</option>
                        <option>Special</option>
                    </select>
                </div>
                <div class="list-filter-div">
                    <label>Concentration: </label>
                    <input type="checkbox" name="conc" onchange="fillTable(this)" id="concyes"><label>yes</label>
                    <input type="checkbox" name="conc" onchange="fillTable(this)" id="concno"><label>no</label>
                </div>
            </span>
        </span>
        <span class='list-content-holder'>
            <table cellspacing="0" id="curr-filter-table">
                <thead class="list-filters">
                    <td class='curr-filter'>Schools</td>
                    <td class='curr-filter'>Levels</td>
                    <td class='curr-filter'>Casting Time</td>
                    <td class='curr-filter'>Range</td>
                    <td class='curr-filter'>Duration</td>
                </thead>
                <tr>
                    <td class='curr-filter'>
                        
                    </td>
                    <td class='curr-filter'>
                        
                    </td>
                    <td class='curr-filter'>
                        
                    </td>
                    <td class='curr-filter'>
                        
                    </td>
                    <td class='curr-filter'>
                        
                    </td class='curr-filter'>
                </tr>
            </table>
        </span>`;
meta.homeHTML = `
<h1 style="text-align: center;">Welcome To The Spell Card Generator!</h1>
        <h2>Primary Instructions</h2>
        <ol>
            <li><strong>Pick a color: </strong> In the color picking tab and find a color that suits your needs.
                Use the demo card there to preview your color. There is no need for you to save the color in any way,
                whatever color you have selected when you navigate away from the page will be remembered later. If you,
                elect to skip this step, the software will default your spell cards to be black.</li>
            <li><strong>Select Your Spells: </strong>In the spell picking tab you will have to upload "spells.json"
                into the input before you can really get to work. Once that is done you should see a lovely table filled
                with all the spells you could want. From there you can filter by class, school, level, casting time,
                duration, range, concentration, and name. When you select a filter, you should see it appear in
                table to the right of the page. To remove the filter, simply click on its entry in that able. You
                can add a spell to your spell list by clicking the checkbox on the left next to the spell you want and
                clicking the button add it to your spell list. You won't see anything happen when you click it, but it's
                working! You can view your spell list and remove spells from it in the Spell List tab.
            </li>
            <li><strong>Generating Cards: </strong>Go to the "generate cards" page and watch the magic happen! It may
                take a few moments depending
                on how many spells you had selected, but just give it a minute and you should soon see all the spells
                you selected, bordered with your color of choice. To print these and cut them out simply press ctrl + p
                on your
                computer.
            </li>
        </ol>
        <h2>Additional Features</h2>
        <h3>How to Load recently published spells onto the software: </h3>
        <p>
            If you don't have python downloaded onto your computer, then this step may be a bit painful at first,
            but once you do have it downloaded its relatively easy and allows the app to stay up-to-date on all
            the spells. I would recommend you do this process whenever a new source book gets released that has spells
            in it. Here's how to do it.
        </p>
        <ol>
            <li>
                <strong>Open CMD: </strong>
                Go to your windows search bar and type in "cmd" to open the windows command prompt.
            </li>
            <li>
                <strong>See if you have python installed: </strong>
                To see if you already have python installed just type in the command <u>python --version</u>
                into the cmd and press enter. If you see an error then you will have to install python which is
                explained in step 3.
                If instead you see a version number, then you are good to skip to step 4!
            </li>
            <li>
                <strong>Downloading Python: </strong>
                To download python simply search for it in the windows app store. Selected any version that starts
                with 3 and install it. Once the installation is complete, repeat steps 1 and 2 and you should have
                different results.
            </li>
            <li>
                <strong>Opening CMD at the correct location: </strong>
                To run the web scraper, you will have to open a command prompt at the location of your Spell Cards
                folder.
                To do this navigate to the Spell Cards folder in your file explorer, select the path at the top to
                highlight it blue,
                type <u>cmd</u> into the path and press enter.
            </li>
            <li>
                <strong>Running the Scraper: </strong>
                Once you have the cmd opened in the correct location just enter the command <u>python scraper.py</u> and
                press enter.
                You should see the names of all the spells starting to get printed to the terminal. The gets all spells
                on the dnd wikidot,
                but it will skip any unearthed arcana or homebrew spells on that website.
            </li>
            <li>
                <strong>Finishing Up: </strong>Once the scraper has finished running you can close out of the cmd and
                continue using this software as normal.
                Next time spells get released you repeat this process but you can start with step 4 from here on out.
            </li>
        </ol>
        <h>Adding Homebrew Spells: </h3>
            <p>
                If you want to create your own spells and see them in spell card form, then you can use the software's
                homebrew spell making feature. If you are comfortable with JSON notation and HTML, then you can enter
                them directly
                into <u>hombrew.json</u>, but that is not advised. Instead, you should go to the hombrew tab on this
                page,
                and fill out the form there. Once you have filled it out, submit it and your spell will be stored by the
                software.
            </p>
            <p>
                <strong>Note: </strong> Homebrew spells will not be saved in spells.json since that is for published
                material only.
                Rather, it will be saved in homebrew.json. Whenever you want to make a spell card for a homebrew spell
                simply upload
                homebrew.json to the Pick Spells page instead of spells.json.
            </p>
`
meta.select.filters = {
    "schools": [],
    "levels": [],
    "classes": [],
    "name": "",
    "ranges": [],
    "durations": [],
    "concentration": [],
    "casting times": [],
};
meta.select.spellBlocks = new Map();

window.addEventListener("DOMContentLoaded", function() {    
    meta.head = document.getElementsByTagName("head")[0];
    meta.div = document.getElementById("meta-container");
    meta.div.innerHTML = meta.homeHTML;
    meta.btns = document.querySelectorAll(".meta-nav-button");
    meta.styler = document.getElementById("meta-live-update");
    meta.styler.innerHTML = ":root { --color: #000000; }";
    meta.btns.forEach(btn => {
        btn.addEventListener('click', function() {
            for (obtn of meta.btns) {
                obtn.id = "";
            }
            btn.id = "active";
            if(meta.btns[0].id == "active") {
                meta.div.innerHTML = meta.homeHTML;
                adjustHead("", "");
            } else if(meta.btns[1].id == "active") {
                adjustHead("color.js", "colorPage.css");
            } else if (meta.btns[2].id == "active") {
                adjustHead("select.js", "selectPage.css");    
            } else if (meta.btns[3].id == "active") {
                adjustHead("list.js", "listPage.css");
            } else if (meta.btns[4].id == "active") {
                adjustHead("card.js", "cardPage.css");
            }
        })
    });
});

function adjustHead(jsPath, cssPath) {
    meta.head.removeChild(meta.head.getElementsByTagName("link")[1]);
    meta.head.removeChild(meta.head.getElementsByTagName("script")[1]);
    meta.link = document.createElement("link");
    meta.link.setAttribute("rel", "stylesheet");
    meta.link.setAttribute("href", "./static/css/" + cssPath);

    meta.script = document.createElement("script");
    meta.script.setAttribute("src", "./static/js/" + jsPath);

    meta.head.append(meta.link, meta.script);
}