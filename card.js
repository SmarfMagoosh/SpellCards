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

meta.div.innerHTML = "";

if (meta.select.spellBlocks.size == 0) {
    meta.div.innerHTML = `
    <p class='announce'>You haven't selected any spells yet! Please go to the "Pick your spells" page to make your
    spell list, then return to this page to print your cards off</p>`;
} else {
    meta.div.innerHTML = `
    <table id='cards' class='ext'>
    </table>`;
    let tab = document.getElementById("cards");
    let numCards = -1;
    for (let i = 0; i < meta.select.spells.length; i++) {
        if (meta.select.spellBlocks.has(i)) {
            numCards++;
            if (numCards % 3 == 0) {
                let row = document.createElement("tr");
                row.setAttribute("id", String(numCards / 3));
                row.setAttribute("class", "ext");
                tab.append(row);
            }
            let row = document.getElementById(String((numCards / 3) | 0));
            let cell = row.insertCell();
            cell.setAttribute("class", "ext");
            cell.append(meta.select.spellBlocks.get(i));
            // fix font size for large spells
            let body = cell.children[0].children[1];
            let bodyHeight = (cell.children[0].children[2] == null) ? 212 : 141;
            let bHigh = 10;
            let bLow = 4;
            do {
                let bTest = (bHigh + bLow) / 2;
                body.setAttribute("style", "font-size: " + bTest + "px;");
                if (body.clientHeight > bodyHeight) {
                    bHigh = bTest;
                } else {
                    bLow = bTest;
                }
            } while (bHigh - bLow > 0.1);
            body.setAttribute("style", "font-size: " + bLow + "px;");

            // fix name if too long
            let nameDiv = cell.children[0].children[0].children[0];
            if (nameDiv.clientHeight > 20) {
                nameDiv.setAttribute("style", "font-size: 12px; height: 20px");
            }
        }
    }
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