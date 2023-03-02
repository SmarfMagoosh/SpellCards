meta.filters = {
    "schools": [],
    "levels": [],
    "classes": [],
    "name": "",
    "ranges": [],
    "durations": [],
    "concentration": [],
    "casting times": [],
};
meta.data = [];
meta.div.innerHTML = "";

if (meta.spellBlocks.size == 0) {
    meta.div.innerHTML = `
    <p class='announce'>You haven't selected any spells yet! Please go to the "Pick your spells" page to make your
    spell list, then return to this page to print your cards off</p>`;
} else {
    meta.div.innerHTML = `
    <table id='cards' class='ext'>
    </table>`;
    let tab = document.getElementById("cards");
    let numCards = -1;
    for (let i = 0; i < meta.spells.length; i++) {
        if (meta.spellBlocks.has(i)) {
            numCards++;
            if (numCards % 3 == 0) {
                let row = tab.insertRow()
                row.setAttribute("id", String(numCards / 3));
                row.setAttribute("class", "ext");
            }
            let cell = tab.rows[tab.rows.length - 1].insertCell();
            cell.setAttribute("class", "ext");
            addBlock(cell, i)
        }
    }
    console.log("finished");
}

async function addBlock(cell, i) {
    await cell.append(meta.spellBlocks.get(i));
    let card = cell.children[0];
    card.style.visibility = "hidden";
    let height = (card.children[2] === undefined) ? 216 : 150;
    setTimeout(() => {
        // see if initial font doesn't work
        if (card.children[1].clientHeight > height) {
            let high = 60;
            let low = 0;
            do {
                let middle = Math.floor((high + low) / 2);
                card.children[1].style.fontSize = binToSize(middle) + "px";
                if (card.children[1].clientHeight > height) {
                    high = middle;
                } else {
                    low = middle;
                }
            } while (high - low > 1);
            card.children[1].style.fontSize = binToSize(high) + "px";
            if (card.children[1].clientHeight > height) {
                card.children[1].style.fontSize = binToSize(low) + "px";
            }
            card.style.visibility = "visible";
        } else {
            card.style.visibility = "visible";
        }
    }, 10)
}

function binToSize(bin) {
    return (bin / 10) + 4;
}