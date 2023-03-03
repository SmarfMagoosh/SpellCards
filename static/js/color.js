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
meta.div.innerHTML="";
meta.div.innerHTML = `
<span class='content-holder'>
    <canvas id='color-picker' width='360' height='360' style='border: solid black 2px; display: block; margin: auto'></canvas>
    <canvas id='hue-map' width='360' height='25'></canvas>
    <input type='range' min='0' max='360' id='hue-selector' value='0' oninput='updatePalette(this.value)'>
</span>
<span class='content-holder'>
    <div class='card-container'>
        <div class='header'>
            <div class='name'>
                Fireball
            </div>
            <div class='divider'>
                3rd-level evocation
            </div>
            <table class='header-table' cellspacing='0' cellpadding='0'>
                <tr>
                    <td class='data'>
                        <span class='header-table-title'>
                            Casting Time
                        </span>
                        <br>1 action
                    </td>
                    <td class='data'>
                        <span class='header-table-title'>
                            Range
                        </span>
                        <br>150 feet
                    </td>
                </tr>
                <tr>
                    <td class='data'>
                        <span class='header-table-title'>
                            Components
                        </span>
                        <br>V, S, M
                    </td>
                    <td class='data'>
                        <span class='header-table-title'>
                            Duration
                        </span>
                        <br>Instantaneous
                    </td>
                </tr>
            </table>
            <div class='divider' style='color: var(--color)'>
                _
            </div>
        </div>
        <div class='spell-body' style='font-size: 9.990234375px'>
            <div class='material'>
                <strong>
                    Material:
                </strong>
                 a tiny ball of bat guano and sulfur
            </div>
            <p>
                A bright streak flashes from your pointing finger to a point you choose within range then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot radius must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one. The fire spreads around corners. It ignites flammable objects in the area that aren’t being worn or carried.
            </p>
        </div>
        <div class='footer'>
            <div class='divider'>
                <strong>
                    At Higher Levels
                </strong>
            </div>
            <div class='upcast'>
                When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.
            </div>
        </div>
    </div>
</span>`;

meta.canvas = document.getElementById("color-picker");
meta.hueMap = document.getElementById("hue-map");
ctx = meta.canvas.getContext("2d");
hmctx = meta.hueMap.getContext("2d");
setTimeout(function() {
    for(let i = 0; i < 360; i++) {
        hmctx.moveTo(0,0);
        hmctx.fillStyle = "hsl(" + i + ", 100%, 50%)";
        hmctx.fillRect(i, 0, 1, 25);
    } 
}, 10);

updatePalette(0);
meta.canvas.addEventListener("mousemove", updateColor);

function updateColor(event) {
    if(event.buttons == 1) {
        let rect = meta.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let imgData = ctx.getImageData(x, y, 1, 1)
        meta.styler.innerHTML = ":root {--color: rgb(" + imgData.data[0] + ", " + imgData.data[1] + ", " + imgData.data[2] + ")}";
    }
}

function updatePalette(hue) {
    for(let i = 0; i < 360; i += 3) {
        for(let j = 0; j < 360; j += 3) {
            ctx.moveTo(i, j);
            ctx.fillStyle = hsl(hue, ((360-i))/3.6, ((360-j))/3.6);
            ctx.fillRect(i, j, 3, 3);
        }
    }
}

function hsl(hsvH, hsvS, hsvV) {
	const hslL = (200 - hsvS) * hsvV / 100;
	const [ hslS, hslV ] = [
		hslL === 0 || hslL === 200 ? 0 : hsvS * hsvV / 100 / (hslL <= 100 ? hslL : 200 - hslL) * 100,
		hslL * 5 / 10
	];
	return "hsl(" + hsvH + ", " + hslS + "%, " + hslV + "%)";
}