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

meta.div.innerHTML="";
if (meta.select.spells === undefined) {
    meta.div.innerHTML = `
<p class='list-p' id='desc'>
    For your own safety, I am not allowed to go through your files without your permission which means the
    only way for me to show you all the spells is if you upload spells.json into this input. Spells.json 
    should be located in your spell cards folder.
</p>
<input type='file' accept='.json' id='json-picker'>
`;

    meta.select.input = document.getElementById("json-picker");
    meta.select.input.addEventListener("change", function () {
        if (this.files.length === 0) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function () {
            meta.select.spells = JSON.parse(reader.result);
        }
        reader.readAsText(this.files[0]);
        meta.div.innerHTML = meta.select.form;
        setTimeout(buildTable, 100);
    });
} else {
    meta.div.innerHTML = meta.select.form;
    buildTable();
    fillTable(null);
}

function buildTable() {
    meta.div.innerHTML += `
    <button class="spell-submit" onclick='addToSpellList()'>Add to List</button>
    <table id='list-spells-table'>
        <thead>
            <tr>
                <th><input type='checkbox' id='list-select-all' onclick='selectAll()'></th>
                <th>
                    Name
                </th>
                <th>
                    School and Level
                </th>
                <th>
                    Casting Time
                </th>
                <th>
                    Range
                </th>
                <th>
                    Components
                </th>
                <th>
                    Duration
                </th>
            </tr>
        </thead>
    </table>
    <button class="spell-submit" onclick='addToSpellList()'>Add to List</button>`;
    meta.select.spellsTable = document.getElementById("list-spells-table");
    fillTable(null);
}

function buildSpell(spell) {
    let row = document.createElement("tr");
    row.setAttribute("class", "list-spell-row")
    row.innerHTML = "<td class='list-filter-data'><input type='checkbox' id='" + spell.name + "' class='spell-list-checkbox'></td>" +
        "<td class='list-filter-data'>" + spell.name + "</td>" +
        "<td class='list-filter-data'>" + spell['school and level'] + "</td>" +
        "<td class='list-filter-data'>" + spell['casting time'] + "</td>" +
        "<td class='list-filter-data'>" + spell['range'] + "</td>" +
        "<td class='list-filter-data'>" + spell['components'] + "</td>" +
        "<td class='list-filter-data'>" + spell['duration'] + "</td>";
    return row;
}

function inClass(spell) {
    if (meta.select.filters.classes.length == 0) {
        return true;
    }
    for (filter of meta.select.filters.classes) {
        if (spell.classes.toLowerCase().includes(filter.toLowerCase())) {
            return true;
        }
    }
    return false;
}

function inSchool(spell) {
    if (meta.select.filters.schools.length == 0) {
        return true;
    }
    for (filter of meta.select.filters.schools) {
        if (spell['school and level'].toLowerCase().includes(filter.toLowerCase())) {
            return true;
        }
    }
    return false;
}

function inLevel(spell) {
    if (meta.select.filters.levels.length == 0) {
        return true;
    }
    for (filter of meta.select.filters.levels) {
        if (spell['school and level'].toLowerCase().includes(filter.toString())) {
            return true;
        } else if (filter == 0 && spell['school and level'].toLowerCase().includes("cantrip")) {
            return true;
        }
    }
    return false;
}

function inName(spell) {
    if (meta.select.filters.name == "") {
        return true;
    }
    if (spell.name.toLowerCase().includes(meta.select.filters.name.toLocaleLowerCase())) {
        return true;
    } else {
        return false;
    }
}

function inConcentration(spell) {
    if (meta.select.filters.concentration.length == 0) {
        return true;
    }
    for (filter of meta.select.filters.concentration) {
        if (spell.concentration == filter) {
            return true;
        }
    }
    return false;
}

function inDuration(spell) {
    if (meta.select.filters.durations.length == 0) {
        return true;
    }
    for (filter of meta.select.filters.durations) {
        if (spell['duration'].toLowerCase().includes(filter.toLowerCase())) {
            return true;
        }
    }
    return false;
}

function inCastingTime(spell) {
    if (meta.select.filters['casting times'].length == 0) {
        return true;
    }
    for (filter of meta.select.filters['casting times']) {
        if (spell['casting time'].toLowerCase().includes(filter.toLowerCase())) {
            return true;
        }
    }
    return false;
}

function inRange(spell) {
    if (meta.select.filters.ranges.length == 0) {
        return true;
    }
    for (filter of meta.select.filters.ranges) {
        if (spell['range'].toLowerCase().includes(filter.toLowerCase())) {
            return true;
        }
    }
    return false;
}

function fillTable(tag) {
    meta.select.spellsTable.innerHTML = `
    <thead>
            <tr>
                <th><input type='checkbox' id='list-select-all' onclick='selectAll()'></th>
                <th>
                    Name
                </th>
                <th>
                    School and Level
                </th>
                <th>
                    Casting Time
                </th>
                <th>
                    Range
                </th>
                <th>
                    Components
                </th>
                <th>
                    Duration
                </th>
            </tr>
        </thead>`;

    if (tag != null) {
        // filter by class
        if (['artificer', 'bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard'].includes(tag.id)) {
            if (meta.select.filters.classes.includes(tag.id)) {
                meta.select.filters.classes.splice(meta.select.filters.classes.indexOf(tag.id), 1);
            } else {
                meta.select.filters.classes.push(tag.id);
            }
        } 
        // filter by name
        if (tag.id == "name") {
            meta.select.filters.name = tag.value;
        }

        // filter by concentration
        if (['concyes', 'concno'].includes(tag.id)) {
            if (tag.id == 'concyes') {
                if (meta.select.filters.concentration.includes(true)) {
                    meta.select.filters.concentration.splice(meta.select.filters.concentration.indexOf(true), 1)
                } else {
                    meta.select.filters.concentration.push(true);
                }
            } else {
                if (meta.select.filters.concentration.includes(false)) {
                    meta.select.filters.concentration.splice(meta.select.filters.concentration.indexOf(false), 1)
                } else {
                    meta.select.filters.concentration.push(false);
                }
            }
        }
        // filter by school
        if (tag.id == "school") {
            if(!meta.select.filters.schools.includes(tag.value)) {
                meta.select.filters.schools.push(tag.value);
                let list = document.getElementById("curr-filter-table").children[1].children[0].children[0];
                list.innerHTML += "<div><button class='filter-button' onclick='unfilter(this)'>\&#8212 " + tag.value + "</button></div>";
            }
        }
        // filter by level
        if (tag.id == "level") {
            let filt = parseInt(tag.value);
            if(!meta.select.filters.levels.includes(filt)) {
                meta.select.filters.levels.push(filt);
                let list = document.getElementById("curr-filter-table").children[1].children[0].children[1];
                list.innerHTML += "<div><button class='filter-button' onclick='unfilter(this)'>\&#8212 " + tag.value + "</button></div>";
            }
        }
        // filter by casting time
        if (tag.id == "casting time") {
            if(!meta.select.filters['casting times'].includes(tag.value)) {
                meta.select.filters['casting times'].push(tag.value);
                let list = document.getElementById("curr-filter-table").children[1].children[0].children[2];
                list.innerHTML += "<div><button class='filter-button' onclick='unfilter(this)'>\&#8212 " + tag.value + "</button></div>";
            }
        }
        // filter by range
        if (tag.id == "range") {
            if(!meta.select.filters.ranges.includes(tag.value)) {
                meta.select.filters.ranges.push(tag.value);
                let list = document.getElementById("curr-filter-table").children[1].children[0].children[3];
                list.innerHTML += "<div><button class='filter-button' onclick='unfilter(this)'>\&#8212 " + tag.value + "</button></div>";
            }
        }
        // filter by duration
        if (tag.id == "duration") {
            if(!meta.select.filters.durations.includes(tag.value)) {
                meta.select.filters.durations.push(tag.value);
                let list = document.getElementById("curr-filter-table").children[1].children[0].children[4];
                list.innerHTML += "<div><button class='filter-button' onclick='unfilter(this)'>\&#8212 " + tag.value + "</button></div>";
            }
        }
    }
    for (let i = 0; i < meta.select.spells.length; i++) {
        let spell = meta.select.spells[i];
        if (
            inClass(spell) &&
            inSchool(spell) &&
            inLevel(spell) &&
            inName(spell) &&
            inConcentration(spell) &&
            inDuration(spell) &&
            inCastingTime(spell) &&
            inRange(spell)) {
            meta.select.spellsTable.append(buildSpell(spell));
        }
    }
}

function unfilter(node) {
    if (['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'].includes(node.innerHTML.substring(2))) {
        meta.select.filters.schools.splice(meta.select.filters.schools.indexOf(node.innerHTML.substring(2), 1))
    }
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(node.innerHTML.substring(2)))) {
        meta.select.filters.levels.splice(meta.select.filters.levels.indexOf(node.value), 1);
    }
    if (['1 action', '1 bonus action', '1 reaction', '1 minute', '10 minutes', '1 hour'].includes(node.innerHTML.substring(2))) {
        meta.select.filters['casting times'].splice(meta.select.filters['casting times'].indexOf(node.innerHTML.substring(2), 1))
    }
    if (['Self', 'Touch', 'Sight', '5 feet', '10 feet', '30 feet', '60 feet', '90 feet', '100 feet', '120 feet', '150 feet', '300 feet', '500 feet', '1 mile'].includes(node.innerHTML.substring(2))) {
        meta.select.filters.ranges.splice(meta.select.filters.ranges.indexOf(node.innerHTML.substring(2), 1));
    }
    if (['Instantaneous', '1 round', '1 minute', '10 minutes', '1 hour', '8 hours', '24 hours', '7 days', '30 days', 'Until Dispelled', 'Special'].includes(node.innerHTML.substring(2))) {
        meta.select.filters.durations.splice(meta.select.filters.durations.indexOf(node.innerHTML.substring(2), 1));

    }
    node.parentNode.remove();
    fillTable(null);
}

function selectAll() {
    let spellBoxes = document.querySelectorAll(".spell-list-checkbox");
    if(document.getElementById("list-select-all").checked) {    
        for (box of spellBoxes) {
            box.checked = true;
        }
    } else {
        for (box of spellBoxes) {
            box.checked = false;
        }
    }
}

function addToSpellList() {
    let spellBoxes = document.querySelectorAll(".spell-list-checkbox");
    let added = new Map()
    for(box of spellBoxes) {
        if(box.checked) {
            for (let i = 0; i < meta.select.spells.length; i++) {
                if(meta.select.spells[i].name == box.parentNode.parentNode.children[1].innerHTML) {
                    added.set(i, prepareSpellBlock(i));
                }
            }
        }
    }
    meta.select.spellBlocks = merge(added)
}
function merge(map2) {
    for(key of map2.keys()) {
        if (!meta.select.spellBlocks.has(key)) {
            meta.select.spellBlocks.set(key, map2.get(key));
        }
    }
    return meta.select.spellBlocks;
}

async function prepareSpellBlock(index) {
    let spell = meta.select.spells[index];
    meta.select.spellBlocks.set(index, buildCard(spell));
}

function buildCard(spell) {
    // create container
    let card = document.createElement("div");
    card.setAttribute("class", "card-container");

    // create content and append it to container
    let header = createHeader(spell);
    let body = createBody(spell);

    card.append(header, body);

    if (spell['upcast'] != null) {
        let footer = createFooter(spell);
        card.append(footer);
    }

    return card;
}

function createHeader(spell) {
    let header = document.createElement("div");
    header.setAttribute("class", "header");

    // name
    let name = document.createElement("div");
    name.setAttribute("class", "name");
    name.innerHTML = spell["name"];
    header.append(name);

    //school level ritual
    let slr = document.createElement("div");
    slr.setAttribute("class", "divider");
    slr.innerText = spell["school and level"];
    header.append(slr);

    //header table
    let headerTable = document.createElement("table");
    headerTable.setAttribute("class", "header-table");
    headerTable.setAttribute("cellspacing", "0");
    headerTable.setAttribute("cellpadding", "0");

    let r1 = document.createElement("tr");
    r1.innerHTML =
        '<td class="data"><span class="header-table-title">Casting Time</span><br>' + spell['casting time'] + '</td>'
        + '<td class="data"><span class="header-table-title">Range</span><br>' + spell['range'] + '</td>';
    headerTable.append(r1);

    let r2 = document.createElement("tr");
    r2.innerHTML =
        '<td class="data"><span class="header-table-title">Components</span><br>' + spell['components'] + '</td>'
        + '<td class="data"><span class="header-table-title">Range</span><br>' + spell['duration'] + ((spell['concentration'] == false) ? "" : "&nbsp&nbsp<div class='concentration'>C</div>") + '</td>';
    headerTable.append(r2);
    header.append(headerTable);

    // material/reaction if applicable
    let sep = document.createElement("div");
    sep.setAttribute("class", "divider");
    sep.setAttribute("style", "color: var(--color)");
    sep.innerText = "_";
    header.append(sep);
    return header;
}

function createBody(spell) {
    let body = document.createElement("div");
    body.setAttribute("class", "spell-body");
    if (spell['material']) {
        let mat = document.createElement("div");
        mat.setAttribute("class", "material");
        mat.innerHTML = "<strong>Material:</strong> " + spell['material'];
        body.append(mat);
    }
    if (spell['reaction']) {
        let trig = document.createElement("div");
        trig.setAttribute("class", "material");
        trig.innerHTML = "<strong>Trigger:</strong> " + spell['reaction'];
        body.append(trig);
    }
    spell['description'] = String(spell['description']).replace("<table class=\"wiki-content-table\">", "<table class=\"body-table\" cellspacing=\"0\" cellpadding=\"0\">");
    body.innerHTML += spell['description'];
    return body;
}

function createFooter(spell) {
    let foot = document.createElement("div");
    foot.setAttribute("class", "footer");
    foot.innerHTML = "<div class='divider'><strong>At Higher Levels</strong></div>";
    let upcast = document.createElement("div");
    upcast.setAttribute("class", "upcast");
    if (String(spell['upcast']).charAt(0) == '.') {
        upcast.innerText = String(spell['upcast']).substring(2)
    } else {
        upcast.innerHTML = spell['upcast'];
    }
    foot.append(upcast);
    return foot;
}