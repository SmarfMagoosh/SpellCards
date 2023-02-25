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
if(meta.select.spellBlocks.size == 0) {
    meta.div.innerHTML = "<p> You have not selected any spells yet, please go to the \"Pick Your Spells\" page and make some selections.";
} else {
    meta.div.innerHTML = "<table class='spell-list-table' cellspacing='0'id='0'><thead><th>Spell</th><th>Remove</th></thead><tbody></tbody></table><table class='spell-list-table' cellspacing='0' id='1'><thead><th>Spell</th><th>Remove</th></thead><tbody></tbody></table>";
    let numCards = -1
    for (let i = 0; i < meta.select.spells.length; i++) {
        if (meta.select.spellBlocks.has(i)) {
            numCards++;
            let row = document.getElementById(String(numCards % 2)).children[1].insertRow();
            row.innerHTML = "<td>" + meta.select.spells[i].name + "</td><td><button onclick='removeSpell(this)' class='list-button' id='index" + i + "'>Remove</button></td>"
        }
    }
}

function removeSpell(node) {
    meta.select.spellBlocks.delete(parseInt(node.id.substring(5)));
    node.parentNode.parentNode.remove();
}