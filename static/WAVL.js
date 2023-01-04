// Front Facing Config. Aliases are when there are multiple names for the one venue.
// Also need to add those aliases / new venues to ~ line 466

// VENUE_SPLIT should show how to parse every venue that is shown ON BRACKETPAL
// __CONFIG__ is used for front end to braketpal parse.


function WAVL_MAIN() {
    // POST to python URL
    const url = '/WAVL/PUT';

    //var token = generate_token();
    var force = document.getElementById("Checkbox99").checked;
    document.getElementById("Button4").value = "Please Wait";
    window.setInterval(dots)
    document.getElementById("Button4").style.backgroundColor = "gold"
    document.getElementById("Button4").style.color = "black";
    document.getElementById("Button4").disabled = true;

    //console.log(token)
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            document.getElementById("Button4").value = "Downloading Scoresheets";
            document.getElementById("Button4").style.backgroundColor = "green";
            document.getElementById("Button4").style.color = "white";
            document.getElementById("Button4").style.fontSize = "20px";
            window.clearInterval(dots);
            //download(token);
            document.getElementById("Button4").value = "Generate Scoresheets";
            document.getElementById("Button4").style.backgroundColor = "#3370B7";
            document.getElementById("Button4").disabled = false;
            //document.getElementById("Button1").disabled = false;
            //document.getElementById("Button1").setAttribute( "onClick", "javascript: download('"+this.responseText+"');" );
        } else if (this.readyState == 4 && this.status == 408) {
            console.log("timeout :(");
            document.getElementById("Button4").disabled = false;
            document.getElementById("Button4").value = "Request Timeout. Try again?";
            document.getElementById("Button4").style.color = "white";
            document.getElementById("Button4").style.backgroundColor = "red";
            document.getElementById("Button4").style.fontSize = "15px";
            window.clearInterval(dots);
        } else if (this.readyState == 4 && this.status != 200) {
            console.log("timeout :(");
            document.getElementById("Button4").disabled = false;
            document.getElementById("Button4").value = "Error code: " + this.status + ". Try again?";
            document.getElementById("Button4").style.color = "white";
            document.getElementById("Button4").style.backgroundColor = "red";
            document.getElementById("Button4").style.fontSize = "15px";
            window.clearInterval(dots);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "*");
    //xhttp.setRequestHeader("TOKEN", token);
    xhttp.setRequestHeader("FORCE", force);
    xhttp.send();
    var dots = window.setInterval(function() {
        var wait = document.getElementById("Button4");
        console.log(wait.value)
        if (wait.value.length < 16)
            wait.value += ".";
        else if (wait.value.length < 17)
            wait.value = "Please Wait";
    }, 1000);
}

function select_all_venue(checked = true) {
    const cbs = document.querySelectorAll('input[name="Venues"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox32").setAttribute("onClick", "javascript: deselect_all_venue();");

}

function deselect_all_venue(checked = false) {
    const cbs = document.querySelectorAll('input[name="Venues"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox32").setAttribute("onClick", "javascript: select_all_venue();");
}

function select_all_wavl(checked = true) {
    const cbs = document.querySelectorAll('input[name="WAVL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox33").setAttribute("onClick", "javascript: deselect_all_wavl();");

}

function deselect_all_wavl(checked = false) {
    const cbs = document.querySelectorAll('input[name="WAVL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox33").setAttribute("onClick", "javascript: select_all_wavl();");
}

function select_all_wavjl(checked = true) {
    const cbs = document.querySelectorAll('input[name="WAVjL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox34").setAttribute("onClick", "javascript: deselect_all_wavjl();");

}

function deselect_all_wavjl(checked = false) {
    const cbs = document.querySelectorAll('input[name="WAVjL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox34").setAttribute("onClick", "javascript: select_all_wavjl();");
}

function enable_button() {
    document.getElementById("WAVL").disabled = false;
}

function token_download(token) {
    var url = '/WAVL/download/' + token
    // GET to python URL
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display:none";
    a.href = url;
    a.download = "Scoresheets.pdf";
    a.click();
    a.remove();

    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("done")
            cleanup();
        }
    }
    xhttp.send();
}


function cleanup() {
    var url = '/cleanup'
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {}
    }
    xhttp.send();
}



class Fixture {
    constructor(venue, venue_0, venue_1, venue_2, venue_full, court, team_a, team_b, duty, division, date_dd, date_mm,
        date_yyyy, time_hr, time_min, sorting, time_sorting) {
        self.venue = venue
        self.venue_0 = venue_0
        self.venue_1 = venue_1
        self.venue_2 = venue_2
        self.venue_full = venue_full
        self.court = court
        self.team_a = team_a
        self.team_b = team_b
        self.duty = duty
        self.division = division
        self.date_dd = date_dd
        self.date_mm = date_mm
        self.date_yyyy = date_yyyy
        self.time_hr = time_hr
        self.time_min = time_min
        self.sorting = sorting
        self.time_sorting = time_sorting;
    }

    get venue() {
        return self.venue
    }
    get venue_0() {
        return self.venue_0
    }
    get venue_1() {
        return self.venue_1
    }
    get venue_2() {
        return self.venue_2
    }
    get venue_full() {
        return self.venue_full
    }
    get court() {
        return self.court
    }
    get team_a() {
        return self.team_a
    }
    get team_b() {
        return self.team_b
    }
    get duty() {
        return self.duty
    }
    get division() {
        return self.division
    }
    get date_dd() {
        return self.date_dd
    }
    get date_mm() {
        return self.date_mm
    }
    get date_yyyy() {
        return self.date_yyyy
    }
    get time_hr() {
        return self.time_hr
    }
    get time_min() {
        return self.time_min
    }
    get sorting() {
        return self.sorting
    }
    get time_sorting() {
        return self.time_sorting
    }
}




var dots = window.setInterval(function() {
    var wait = document.getElementById("Button4");
    console.log(wait.value)
    if (wait.value.length < 16)
        wait.value += ".";
    else if (wait.value.length < 17)
        wait.value = "Please Wait";
}, 1000);




function WAVL_ONLINE() {
    var venues = []
    var wavjl = []
    var wavl = []
    let date = $("#DatePicker2").datepicker("option", "dateFormat", "yy-mm-dd").val()
    //var date = $("#DatePicker2").datepicker("option", "dateFormat", "yy-mm-dd").val()
    document.getElementsByName("Venues").forEach((checkbox) => {
        if (document.getElementById(checkbox.id).checked) {
            venues.push(document.getElementById(checkbox.id).title)
        }
    })
    document.getElementsByName("WAVL_teams").forEach((checkbox) => {
        if (document.getElementById(checkbox.id).checked) {
            wavjl.push(document.getElementById(checkbox.id).title)
        }
    })
    document.getElementsByName("WAVjL_teams").forEach((checkbox) => {
        if (document.getElementById(checkbox.id).checked) {
            wavl.push(document.getElementById(checkbox.id).title)
        }
    })



    document.getElementById("Button4").value = "Please Wait";
    window.setInterval(dots)
    document.getElementById("Button4").style.backgroundColor = "gold";
    document.getElementById("Button4").style.color = "black";
    document.getElementById("Button4").disabled = true;

    pdf_init(venues, wavl, wavjl, date)
    //document.getElementById("Button1").disabled = false;
    //document.getElementById("Button1").setAttribute( "onClick", "javascript: download('"+this.responseText+"');" );

    //pdf_init(venues, wavl, wavjl, date)
}

function pdf_init(venues, wavl, wavjl, date_init) {
    var concatted = wavl.concat(wavjl)
    var leagues = []
    console.log(concatted)
    console.log("*")
    for (var i = 0; i < concatted.length; i++) {
        leagues.push(DIVISIONS[concatted[i]])
    }
    console.log("*")
    console.log(leagues)

    var fixtures = []
    //modifyPdf(fixtures[0]).then(value => {mix.push(value)})
    //modifyPdf(fixtures[1]).then(value => {mix.push(value)})
    
    var temp_end_date = $("#DatePicker2").datepicker("getDate");
    
    temp_end_date.setTime(temp_end_date.getTime() + (1 * (24*60*60*1000)));
   
    var mon = temp_end_date.getMonth() + 1;
    var end_date = temp_end_date.getFullYear().toString().split(-2) + "-" +
                        mon.toString().padStart(2, '0') + "-" +
                        temp_end_date.getDate().toString().padStart(2, '0');
    
    console.log(end_date);

    var temp_start_date = $("#DatePicker2").datepicker("getDate");

    if (document.getElementById("Checkbox99").checked) {
        temp_start_date.setTime(temp_start_date.getTime() + (-6 * (24*60*60*1000)));
    }
    
    var month = temp_start_date.getMonth() + 1;
    var start_date = temp_start_date.getFullYear().toString().split(-2) + "-" +
                        month.toString().padStart(2, '0') + "-" +
                        temp_start_date.getDate().toString().padStart(2, '0');
    
    console.log(start_date);

    var indiv = get_single_fixture(start_date, end_date);
    console.log(indiv);
    fixtures.push(indiv);

    //Promise.all(get_fixtures(venues, leagues, date)).then(fix_val => {
    Promise.all(fixtures).then(fix_val => {
        var upd_fixtures = html_to_fixture(venues, leagues, date_init, fix_val);

        var team_list = []
        for (i = 0; i < upd_fixtures.length; i++){
            if (upd_fixtures[i][9][0][0] == "D" || upd_fixtures[i][9][0][0] == "S"){
                var a_team = TEAM_ID[upd_fixtures[i][6]][2];
                var b_team = TEAM_ID[upd_fixtures[i][7]][2];
                
                var upd_a = get_single_team_list_html(a_team);
                team_list.push(upd_a);
                var upd_b = get_single_team_list_html(b_team);
                team_list.push(upd_b);
            }
        }

        Promise.all(team_list).then(player_names => {
            let finalised_fixtures = addTeamList(player_names, upd_fixtures);

            modifyPdf(finalised_fixtures, venues, leagues, date_init).then(value => {
                Promise.all(value).then(value_3 => {
                    mergePDFDocuments(value_3).then(value_2 => {
                        console.log(value_2);
                        let filename = "Scoresheets " + date_init.toString() + ".pdf"
                        download(value_2, filename, "application/pdf");
                        window.clearInterval(dots);
                        document.getElementById("Button4").value = "Generate Scoresheets";
                        document.getElementById("Button4").style.backgroundColor = "#3370B7";
                        document.getElementById("Button4").style.color = "#FFFFFF"
                        document.getElementById("Button4").disabled = false;
                    })
                })
            })
        })


        
    })
    //download(res, "pdf-lib_creation_example.pdf", "application/pdf");

    //var existing = gen_PDF(fixtures)

    //console.log(existing)
    //var merged = merge_PDF(existing)
    //download(existing, "pdf-lib_modification_example.pdf", "application/pdf");
}


async function get_single_fixture(start_date, end_date) {
    const {
        PDFDocument,
        StandardFonts,
        rgb
    } = PDFLib;
    axios;
    //const head = 'https://calm-sea-71189.herokuapp.com/vwa.bracketpal.com/dailyform/';
    const head = 'https://cors-anywhere-og-v5kf.onrender.com/vwa.bracketpal.com/dailyform/range?start_date=';

    var url = head + start_date.toString() + "&end_date=" + end_date.toString();
    return await axios.get(url);
}

async function get_single_team_list_html(team_id) {
    const {
        PDFDocument,
        StandardFonts,
        rgb
    } = PDFLib;
    axios;
    //const head = 'https://calm-sea-71189.herokuapp.com/vwa.bracketpal.com/dailyform/';
    const head = 'https://cors-anywhere-og-v5kf.onrender.com/vwa.bracketpal.com/teaminfo/';

    var url = head + team_id.toString();
    return await axios.get(url);
}

function addTeamList(player_names_html, fixtures) {
    let j = 0;

    for (i = 0; i < player_names_html.length; i = i + 2){
        var Aparser = new DOMParser();
	    var Adoc = Aparser.parseFromString(player_names_html[i].request.responseText, "text/html");
        let Aselector = '[class^="team_roster_player wfid_temp"]'
        var Aelements = Adoc.querySelectorAll(Aselector);
	    const Anames = [...Aelements];
        let Aplayer_names = Anames.map((tmp => split_name(tmp.innerText.substring(2))));

        var Bparser = new DOMParser();
	    var Bdoc = Bparser.parseFromString(player_names_html[i+1].request.responseText, "text/html");
        let Bselector = '[class^="team_roster_player wfid_temp"]'
        var Belements = Bdoc.querySelectorAll(Bselector);
	    const Bnames = [...Belements];
        let Bplayer_names = Bnames.map((tmp => split_name(tmp.innerText.substring(2))));


        fixtures[j][17] = Aplayer_names;
        fixtures[j][18] = Bplayer_names;
        console.log(Bplayer_names);
        j = j + 1;
    }

    return fixtures;
}

function sorting(a, b) {
    if (a[15] === b[15]) {
        return 0;
    } else {
        return (a[15] < b[15]) ? -1 : 1;
    }
}

function time_sorting(a, b) {
    if (a[16] === b[16]) {
        return 0;
    } else {
        return (a[16] < b[16]) ? -1 : 1;
    }
}

// [zero_venue_split, _venue_0, _venue_1, _venue_2, _venue_full, _court, _team_a, _team_b, _duty, _division, _date_dd, _date_mm, _date_yyyy, _time_hr, _time_min, _sorting, _time_sorting, [_a_List], [b_List]]
// [     0              1          2          3          4         5        6         7     8         9        10         11         12        13          14       15          16            17         18
async function modifyPdf(fix, venues, leagues, dates) {
    console.log(venues);
    console.log(leagues);
    var fixtures = fix;
    console.log(fixtures)
    fixtures.sort(sorting);
    console.log(fixtures);
    const {
        PDFDocument,
        StandardFonts,
        rgb
    } = PDFLib;
    var total = new Array(fixtures.length);
    console.log(fixtures)
    for (var i = 0; i < fixtures.length; i++) {
        var WAVLurl = "https://og1764.github.io/static/def.pdf";
        var JLurl = "https://og1764.github.io/static/def_jl.pdf";
        //var WAVLurl = "./static/def.pdf"
        //var JLurl = "./static/def_jl.pdf";

        var WAVLexistingPdfBytes = await fetch(WAVLurl).then(res => res.arrayBuffer())

        var WAVLpdfDoc = await PDFLib.PDFDocument.load(WAVLexistingPdfBytes)
        var WAVLhelveticaFont = await WAVLpdfDoc.embedFont(PDFLib.StandardFonts.Helvetica)
        var WAVLhelveticaBold = await WAVLpdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold)
        var WAVLpages = await WAVLpdfDoc.getPages()
        var WAVLfirstPage = await WAVLpages[0]

        var JLexistingPdfBytes = await fetch(JLurl).then(resp => resp.arrayBuffer())

        var JLpdfDoc = await PDFLib.PDFDocument.load(JLexistingPdfBytes)
        var JLhelveticaFont = await JLpdfDoc.embedFont(PDFLib.StandardFonts.Helvetica)
        var JLhelveticaBold = await JLpdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold)
        var JLpages = await JLpdfDoc.getPages()
        var JLfirstPage = await JLpages[0]

        if (fixtures[i][9][0][0] == "D" || fixtures[i][9][0][0] == "S") {

            await WAVLfirstPage.drawText(fixtures[i][6], {
                x: 471,
                y: 498,
                size: 12,
                font: WAVLhelveticaFont
            })

            for (var k = 0; k < fixtures[i][17].length; k++) {
                if (k < Math.ceil(fixtures[i][17].length / 2)) {
                    await WAVLfirstPage.drawText(fixtures[i][17][k][0].toUpperCase(), {
                        x: 442,
                        y: 472-Math.floor((17*k)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                    await WAVLfirstPage.drawText(fixtures[i][17][k][1].toUpperCase(), {
                        x: 442,
                        y: 472-Math.floor((17*k+8.5)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                } else {
                    await WAVLfirstPage.drawText(fixtures[i][17][k][0].toUpperCase(), {
                        x: 541,
                        y: 472-Math.floor((17*(k-Math.ceil(fixtures[i][17].length / 2)))),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                    await WAVLfirstPage.drawText(fixtures[i][17][k][1].toUpperCase(), {
                        x: 541,
                        y: 472-Math.floor((17*(k-Math.ceil(fixtures[i][17].length / 2))+8.5)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                }
                
            }

            await WAVLfirstPage.drawText(fixtures[i][7], {
                x: 672,
                y: 498,
                size: 12,
                font: WAVLhelveticaFont
            })

            for (var k = 0; k < fixtures[i][18].length; k++) {
                if (k < Math.ceil(fixtures[i][18].length / 2)) {
                    await WAVLfirstPage.drawText(fixtures[i][18][k][0].toUpperCase(), {
                        x: 645,
                        y: 472-Math.floor((17*k)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                    await WAVLfirstPage.drawText(fixtures[i][18][k][1].toUpperCase(), {
                        x: 645,
                        y: 472-Math.floor((17*k+8.5)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                } else {
                    await WAVLfirstPage.drawText(fixtures[i][18][k][0].toUpperCase(), {
                        x: 745,
                        y: 472-Math.floor((17*(k-Math.ceil(fixtures[i][18].length / 2)))),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                    await WAVLfirstPage.drawText(fixtures[i][18][k][1].toUpperCase(), {
                        x: 745,
                        y: 472-Math.floor((17*(k-Math.ceil(fixtures[i][18].length / 2))+8.5)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                }
            }

            await WAVLfirstPage.drawLine({
                start: { x: 539, y: 478 },
                end: { x: 539, y: 472-Math.floor(17*Math.ceil(fixtures[i][17].length /2)-6) },
                thickness: 0.5,
                color: rgb(0,0,0),
                opacity: 1,
            })
            
            await WAVLfirstPage.drawLine({
                start: { x: 519, y: 478 },
                end: { x: 519, y: 472-Math.floor(17*Math.ceil(fixtures[i][17].length /2)-6) },
                thickness: 0.5,
                color: rgb(0,0,0),
                opacity: 1,
            })
            
            await WAVLfirstPage.drawLine({
                start: { x: 743, y: 478 },
                end: { x: 743, y: 472-Math.floor(17*Math.ceil(fixtures[i][18].length /2)-6) },
                thickness: 0.5,
                color: rgb(0,0,0),
                opacity: 1,
            })
            
            await WAVLfirstPage.drawLine({
                start: { x: 723, y: 478 },
                end: { x: 723, y: 472-Math.floor(17*Math.ceil(fixtures[i][18].length /2)-6) },
                thickness: 0.5,
                color: rgb(0,0,0),
                opacity: 1,
            })

            await WAVLfirstPage.drawText(fixtures[i][1], {
                x: parseInt((310 - measureText(fixtures[i][1], 10)).toString()),
                y: 575,
                size: 10,
                font: WAVLhelveticaFont
            })
            await WAVLfirstPage.drawText(fixtures[i][2], {
                x: parseInt((310 - measureText(fixtures[i][2], 10)).toString()),
                y: 566,
                size: 10,
                font: WAVLhelveticaFont
            })
            await WAVLfirstPage.drawText(fixtures[i][3], {
                x: parseInt((310 - measureText(fixtures[i][3], 10)).toString()),
                y: 557,
                size: 10,
                font: WAVLhelveticaFont
            })
            try {
                // court
                await WAVLfirstPage.drawText(fixtures[i][5], {
                    x: parseInt((400 - measureBold(fixtures[i][5], 13).toString()).toString()),
                    y: 557,
                    size: 13,
                    font: WAVLhelveticaBold
                })
            } catch (e) {
                console.log(e);
            }
            try {
                var hour = " ";
                if (fixtures[i][13].toString().toLowerCase().substring(0, 3) != "tbc") {
                    if (parseInt(fixtures[i][13]).toString().length == 1) {
                        hour = " " + parseInt(fixtures[i][13]).toString()
                    } else {
                        hour = parseInt(fixtures[i][13]).toString()
                    }
                    await WAVLfirstPage.drawText(hour, {
                        x: parseInt((492 - measureBold(hour, 13) - measureBold(hour, 13)).toString()),
                        y: 557,
                        size: 13,
                        font: WAVLhelveticaBold
                    })
                    await WAVLfirstPage.drawText(fixtures[i][14], {
                        x: 500,
                        y: 557,
                        size: 13,
                        font: WAVLhelveticaBold
                    })
                }
            } catch (e) {
                console.log(e);
            }
            // catch - continue
            var dd = " ";
            if (parseInt(fixtures[i][10]).toString().length == 1) {
                dd = " " + parseInt(fixtures[i][10]).toString()
            } else {
                dd = parseInt(fixtures[i][10]).toString()
            }

            await WAVLfirstPage.drawText(dd, {
                x: parseInt((596 - measureBold(dd, 13) - measureBold(dd, 13)).toString()),
                y: 557,
                size: 13,
                font: WAVLhelveticaBold
            })
            await WAVLfirstPage.drawText(parseInt(fixtures[i][11]).toString(), {
                x: parseInt((613 - measureBold(fixtures[i][11], 13)).toString()),
                y: 557,
                size: 13,
                font: WAVLhelveticaBold
            })
            await WAVLfirstPage.drawText(fixtures[i][12].slice(2, 4), {
                x: 625,
                y: 557,
                size: 13,
                font: WAVLhelveticaBold
            })
            await WAVLfirstPage.drawText(fixtures[i][9][1], {
                x: parseInt((773 - measureBold(fixtures[i][9][1], 13)).toString()),
                y: 557.5,
                size: 13,
                font: WAVLhelveticaBold
            })
            await WAVLfirstPage.drawText(fixtures[i][8], {
                x: parseInt((710 - measureText(fixtures[i][8], 14)).toString()),
                y: 528,
                size: 14,
                font: WAVLhelveticaFont
            })
            // if length > 18
            if (fixtures[i][6].length > 18 || fixtures[i][7].length > 18) {
                await WAVLfirstPage.drawText(fixtures[i][6], {
                    x: parseInt((320 - measureText(fixtures[i][6], 10)).toString()),
                    y: 527,
                    size: 10,
                    font: WAVLhelveticaFont
                })
                await WAVLfirstPage.drawText(fixtures[i][7], {
                    x: parseInt((460 - measureText(fixtures[i][7], 10)).toString()),
                    y: 527,
                    size: 10,
                    font: WAVLhelveticaFont
                })
            } else {
                WAVLpdfDoc.TextAlignment = 1;
                await WAVLfirstPage.drawText(fixtures[i][6], {
                    x: parseInt((320 - measureText(fixtures[i][6], 14)).toString()),
                    y: 527,
                    size: 14,
                    font: WAVLhelveticaFont
                })
                await WAVLfirstPage.drawText(fixtures[i][7], {
                    x: parseInt((460 - measureText(fixtures[i][7], 14)).toString()),
                    y: 527,
                    size: 14,
                    font: WAVLhelveticaFont
                })
            }
            var saved = await WAVLpdfDoc.saveAsBase64();
        } else {
            // Junior League
            // full venue
            //console.log(fixtures[i]);
            await JLfirstPage.drawText(fixtures[i][4], {
                x: parseInt((180 - measureText(fixtures[i][4], 13)).toString()),
                y: 504,
                size: 13,
                font: JLhelveticaFont
            })
            // court
            await JLfirstPage.drawText(fixtures[i][5], {
                x: parseInt((562 - measureText(fixtures[i][5], 13)).toString()),
                y: 504,
                size: 13,
                font: JLhelveticaFont
            })
            try {
                // time
                let time = " "
                if (parseInt(fixtures[i][13]).toString().length == 1) {
                    time = " " + parseInt(fixtures[i][13]).toString() + ":" + fixtures[1][14];
                } else {
                    time = parseInt(fixtures[i][13]).toString() + ":" + fixtures[1][14];
                }
                await JLfirstPage.drawText(time, {
                    x: 442,
                    y: 504,
                    size: 13,
                    font: JLhelveticaFont
                })
            } catch (e) {
                console.log(e)
            }
            try {
                // date
                let dt = " ";
                dt = parseInt(fixtures[i][10]).toString() + "/" + parseInt(fixtures[i][11]).toString() + "/" + fixtures[i][12]
                await JLfirstPage.drawText(dt, {
                    x: 315,
                    y: 504,
                    size: 13,
                    font: JLhelveticaFont
                })
            } catch (e) {
                console.log(e)
            }
            // division
            await JLfirstPage.drawText(fixtures[i][9][0], {
                x: parseInt((720 - measureText(fixtures[i][9][0], 13)).toString()),
                y: 504,
                size: 13,
                font: JLhelveticaFont
            })
            // if length > 25
            if (fixtures[i][6].length > 25 || fixtures[i][7].length > 25) {
                await JLfirstPage.drawText(fixtures[i][6], {
                    x: parseInt((250 - measureText(fixtures[i][6], 10)).toString()),
                    y: 472,
                    size: 10,
                    font: JLhelveticaFont
                })
                await JLfirstPage.drawText(fixtures[i][7], {
                    x: parseInt((660 - measureText(fixtures[i][7], 10)).toString()),
                    y: 472,
                    size: 10,
                    font: JLhelveticaFont
                })
            } else {
                JLpdfDoc.TextAlignment = 1;
                await JLfirstPage.drawText(fixtures[i][6], {
                    x: parseInt((250 - measureText(fixtures[i][6], 14)).toString()),
                    y: 472,
                    size: 14,
                    font: JLhelveticaFont
                })
                await JLfirstPage.drawText(fixtures[i][7], {
                    x: parseInt((660 - measureText(fixtures[i][7], 14)).toString()),
                    y: 472,
                    size: 14,
                    font: JLhelveticaFont
                })
            }
            var saved = await JLpdfDoc.saveAsBase64();
        }
        total[i] = saved;
    }
    console.log("End of modifyPdf");
    console.log(document.getElementById("Checkbox99").checked);
    if (document.getElementById("Checkbox99").checked) {
        var csv = [
            ["WAVL 2022", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["Date", "Venue", "Time", "Div", "Court", "Team A", "Team B", "Duty Team", "Time", "Sets", "Referee 1st", "Qualifications", "Referee 2nd", "Qualifications", "Assessor"]
        ];
        fixtures.sort(time_sorting);
        for (var i = 0; i < fixtures.length; i++) {
            let date = fixtures[i][10] + "/" + fixtures[i][11] + "/" + fixtures[i][12];
            let full_time = fixtures[i][13] + ":" + fixtures[i][14];
            let crt = fixtures[i][5];
            if (!(crt)) {
                crt = "";
            } else {
                crt = crt.trim();
            }
            csv.push([date, fixtures[i][4], full_time, fixtures[i][9][1], crt, fixtures[i][6], fixtures[i][7], fixtures[i][8], "", "", "", "", "", "", ""]);
        }
        console.log("fixtures x2");
        //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
        try {
            console.log(csv);
            let csvContent = "data:text/csv;charset=utf-8," + csv.map(e => e.join(",")).join("\n");
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            let filename = "Runsheet" + dates + ".csv";
            link.setAttribute("download", filename);
            document.body.appendChild(link); // Required for FF

            link.click();
        } catch (e) {
            console.log(e)
        }
    }
    console.log(total);
    console.log("???");
    return await total;

}

async function mergePDFDocuments(documents) {
    console.log(documents);
    var mergedPdf = await PDFLib.PDFDocument.create();
    for (var i = 0; i < documents.length; i++) {
        //console.log(i)
        var docone = await PDFLib.PDFDocument.load(await documents[i]);
        //var copiedPagesone = await mergedPdf.copyPages(docone, [0, 1]);
        //await mergedPdf.addPage(await copiedPagesone[0]);
        //await mergedPdf.addPage(await copiedPagesone[1]);
        var copiedPagesone = await mergedPdf.copyPages(docone, docone.getPageIndices());
        for (var j = 0; j < docone.getPageIndices().length; j++) {
            mergedPdf.addPage(await copiedPagesone[j]);
        }
    }
    var saved = await mergedPdf.save();

    return await saved;

    //download(await mergedPdf, "pdf-lib_creation_example.pdf", "application/pdf");
}

async function merge_PDF(existing) {
    const mergedPdf = await PDFLib.PDFDocument.create();
    console.log(await existing)
    for (var i = 0; i < await existing.length; i++) {
        var doc = await PDFLib.PDFDocument.load(await existing[1]);
        var copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    return await mergedPdf.save();
}


function get_URLS(leagues, date) {
    var all_urls = []
    for (var i = 0; i < leagues.length; i++) {
        var url = head + leagues[k][2] + "/" + date.toString();
        all_urls.push(url)
    }
    return all_urls
}

function div_from_id(id) {
    let wavl_keys = Object.keys(__CONFIG__.wavl);
    for (var i = 0; i < wavl_keys.length; i++) {
        if (__CONFIG__.wavl[wavl_keys[i]].id == id) {
            return [__CONFIG__.wavl[wavl_keys[i]].long, __CONFIG__.wavl[wavl_keys[i]].short, __CONFIG__.wavl[wavl_keys[i]].id]
        }
    }
    for (var i = 0; i < __CONFIG__.jl.length; i++) {
        if (__CONFIG__.jl[i].id == id) {
            return [__CONFIG__.jl[i].long, __CONFIG__.jl[i].short, __CONFIG__.jl[i].id]
        }
    }
    return false
}

function add_aliases(venues) {
    let resultant = [];
    var low_venues = [];
    let alias_layer = {};

    
    for (var j = 0; j < venues.length; j++) {
        low_venues.push(venues[j].toLowerCase())
    }

    let all_venues = Object.keys(__CONFIG__.venues);
    for (var i = 0; i < all_venues.length; i++) {
        if (low_venues.includes(__CONFIG__.venues[all_venues[i]].name.toLowerCase())) {
            resultant.push(__CONFIG__.venues[all_venues[i]].name);
            for (var k = 0; k < __CONFIG__.venues[all_venues[i]].alias.length; k++) {
                var _alias = __CONFIG__.venues[all_venues[i]].alias[k];
                resultant.push(_alias)
                alias_layer[_alias] = __CONFIG__.venues[[all_venues[i]]].name;
            }
            alias_layer[__CONFIG__.venues[[all_venues[i]]].name] = __CONFIG__.venues[[all_venues[i]]].name;
        }
    }
    return [resultant, alias_layer];
}

function html_to_fixture(venues, leagues, date, all_html) {
    let fixtures_list = []
    console.log(leagues);
    console.log(all_html);
    let temporary = add_aliases(venues);
    let alias_layer = temporary[1];
    let venue_usage = temporary[0];
    console.log(alias_layer);
    console.log(venue_usage)
    console.log("HERE HERE HERE")
    console.log(leagues.flat())
    const NamesArr = leagues.flat();
    for (let x = 0; x < all_html.length; x++) {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(all_html[x].request.responseText, 'text/html');
        //console.log(all_html.request.responseURL)
        //let dt = all_html.request.responseURL.slice(-10);
        console.log(htmlDoc);
        console.log("test");
        let all_tables = htmlDoc.getElementsByTagName("table")
        console.log(all_tables);
        let numFix = all_tables.length;
        for (let y = 0; y < numFix; y = y + 3) {
            let meta = y + 1;
            let data = y + 2;
            
            let meta_table = all_tables[meta];
            let data_table = all_tables[data];
            console.log(meta_table);
            let dt = meta_table.rows.item(1).cells.item(0).innerText;
            let match_division = meta_table.rows.item(1).cells.item(2).innerText;
            
            if (!(NamesArr.includes(match_division))) {
                console.log(match_division);
                console.log(NamesArr);
                continue;
            }

            console.log("inputDate");
            console.log(date);
            if ((!(dt === date)) && (!(document.getElementById("Checkbox99").checked))){
                console.log("BREAK DUE TO DATE DIFFERENCE");
                console.log(dt);
                continue;
            }
            console.log(dt);
            console.log(match_division);

            try {
                //let div_table = htmlDoc.getElementsByTagName("table")[1]
                //console.log("***")
                //console.log(div_table.rows.item(1).cells.item(2).innerText)
                //let temp_div = DIVISIONS[div_table.rows.item(1).cells.item(2).innerText]
                //console.log(temp_div)
                //let table = htmlDoc.getElementsByTagName("table")[2]
                let rowLength = data_table.rows.length;
                for (let i = 1; i < rowLength; i++) {
                    let cells = data_table.rows.item(i).cells;
                    let venue = cells.item(1).innerText;
                    console.log(venue);
                    let venue_split = venue.split(" Ct")
                    let zero_venue_split = venue_split[0].replaceAll(" Ct", "");
                    console.log(venue_usage);
                    console.log(zero_venue_split);
                    if (venue_usage.includes(zero_venue_split)) {
                        let _court = "";
                        try {
                            _court = cells.item(1).innerText.split("Ct")[1];
                        } catch (e) {
                            _court = "";
                        }
                        if (_court == null) {
                            _court = "";
                        }
                        console.log(_court);
                        const _team_a = cells.item(2).innerText;
                        const _team_b = cells.item(5).innerText;
                        console.log(_team_a);
                        //console.log(x)
                        let _duty = " ";
                        let _time_hr = " ";
                        let _time_min = " ";
                        try {
                            _duty = cells.item(7).innerText.slice(5);
                        } catch (e) {
                            console.log(e)
                            _duty = " ";
                        }
                        
                        
                        if (FINALS_DATES.includes(dt) && _duty.length < 4) {
                            _duty = "Previous Loser";
                        }
                        
                        //var division = leagues[j];
                        //let url = all_html[x].request.responseURL;
                        //let split_url = url.split('/');
                        //let _division = temp_div;
                        let _division = DIVISIONS[match_division];
                        console.log(_division);

                        //console.log(temp_div)
                        //let _division = __CONFIG__
                        //console.log(_division)
                        //let _date = date.split('-');
                        console.log(dt);
                        let _date = dt.split('-');
                        console.log(_date);
                        let _date_dd = _date[2];
                        let _date_mm = _date[1];
                        let _date_yyyy = _date[0];
                        try {
                            let time = cells.item(0).innerText.split(":")
                            _time_hr = time[0].padStart(2, "0");
                            _time_min = time[1];
                        } catch (e) {
                            console.log(e);
                            _time_hr = " ";
                            _time_min = " ";
                        }
                        //let _tmp_venue = VENUE_SPLIT[zero_venue_split.toLowerCase()].split("*");
                        console.log(zero_venue_split);
                        console.log(alias_layer);
                        let venue_realname = alias_layer[zero_venue_split];
                        console.log(venue_realname);
                        const _venue_0 = __CONFIG__.venues[venue_realname].top;
                        const _venue_1 = __CONFIG__.venues[venue_realname].mid;
                        const _venue_2 = __CONFIG__.venues[venue_realname].bot;
                        //console.log(VENUE_SPLIT);
                        console.log(zero_venue_split);
                        //let _venue_full = VENUE_SPLIT[zero_venue_split.toLowerCase()].replaceAll("*", " ").trimLeft();
                        let _venue_full = __CONFIG__.venues[venue_realname].name;
                        let _sorting = _date_yyyy + " " + _date_mm + " " + _date_dd + " " + _venue_full + " " + _court + " " + _time_hr
                        let _time_sorting = _date_yyyy + " " + _date_mm + " " + _date_dd + " " + _venue_full + " " + _time_hr + " " + _court;
                        /*fix['venue'] = zero_venue_split;
                        fix['venue_0'] = _venue_0
                        fix['venue_1'] = _venue_1
                        fix['venue_2'] = _venue_2
                        fix['venue_full'] = _venue_full
                        fix['court'] = _court
                        fix['team_a'] = _team_a
                        fix['team_b'] = _team_b
                        fix['duty'] = _duty
                        fix['division'] = _division
                        fix['date_dd'] = _date_dd
                        fix['date_mm'] = _date_mm
                        fix['date_yyyy'] = _date_yyyy
                        fix['time_hr'] = _time_hr
                        fix['time_min'] = _time_min
                        fix['sorting'] = _sorting
    */
                        //console.log(zero_venue_split)
                        //console.log(_venue_0)
                        //console.log(_venue_1)
                        //console.log(_venue_2)
                        //console.log(_team_a)
                        //console.log(_team_b)
                        //console.log(_duty)

                        //const fix = new Fixture(zero_venue_split, _venue_0, _venue_1, _venue_2, _venue_full, _court,
                        //    _team_a, _team_b, _duty, _division, _date_dd, _date_mm, _date_yyyy, _time_hr, _time_min, _sorting)
                        //console.log(fix)
                        fixtures_list.push([zero_venue_split, _venue_0, _venue_1, _venue_2, _venue_full, _court,
                            _team_a, _team_b, _duty, _division, _date_dd, _date_mm, _date_yyyy, _time_hr, _time_min, _sorting, _time_sorting, [], []
                        ])
                        //console.log(fixtures_list)

                    } else {
                        /*
                        try{
                        if(cells.item(3).innerText != "BYE") {
                            console.log("UNUSED VENUE\n***")
                            console.log(zero_venue_split)
                            console.log("***")
                        }
                        } catch (e) {console.log(e); console.log(zero_venue_split);}*/
                        try {
                            if (Number.isInteger(parseInt(zero_venue_split.substring(0, 2).trim()))) {
                                console.log("BYE: " + zero_venue_split);
                            } else {
                                console.log("UNUSED VENUE\n***")
                                console.log(zero_venue_split)
                                console.log("***")
                            }
                        } catch (e) {
                            console.log("UNUSED VENUE\n***")
                            console.log(zero_venue_split)
                            console.log("***")
                        }

                    }
                    console.log(fixtures_list);
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    console.log(fixtures_list);
    return fixtures_list
}



function split_name(name){
    let myArray = name.split(" ");
    let comparator = 99999;
    let front = "";
    let back = "";

    for (let i = 0; i < myArray.length-1; i++) {
        let fr = myArray.slice(0, i+1).join(" ");
        let bk = myArray.slice(i+1).join(" ");
        let diff = Math.abs(fr.length - bk.length);

        if (diff < comparator){
            front = fr;
            back = bk;
            comparator = diff;
        }
    }

    console.log(comparator);

    return [front, back];
}

function measureText(string, fontSize = 10) {
    const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1546875, 0.278125, 0.4, 0.721875, 0.5609375, 0.9609375, 0.7203125, 0.240625, 0.4, 0.4, 0.48125, 0.640625, 0.278125, 0.4, 0.278125, 0.4015625, 0.5609375, 0.55625, 0.5609375, 0.5609375, 0.640625, 0.5609375, 0.5609375, 0.5609375, 0.5609375, 0.5609375, 0.278125, 0.278125, 0.640625, 0.640625, 0.640625, 0.5609375, 1.1203125, 0.88125, 0.7203125, 0.8, 0.7234375, 0.7203125, 0.640625, 0.8, 0.7234375, 0.278125, 0.5, 0.8, 0.640625, 0.88125, 0.7234375, 0.8, 0.7203125, 0.8, 0.8, 0.7203125, 0.640625, 0.7234375, 0.8015625, 1.121875, 0.8015625, 0.8015625, 0.721875, 0.3203125, 0.48125, 0.3203125, 0.48125, 0.721875, 0.334375, 0.5609375, 0.640625, 0.5609375, 0.5609375, 0.5609375, 0.48125, 0.5609375, 0.5609375, 0.240625, 0.321875, 0.5609375, 0.240625, 0.88125, 0.5609375, 0.5609375, 0.640625, 0.5609375, 0.4, 0.5609375, 0.4015625, 0.5609375, 0.6421875, 0.88125, 0.6421875, 0.6421875, 0.6421875, 0.4, 0.2609375, 0.48125, 0.640625]
    const avg = 0.5823026315789476
    try {
        var tmp = string
            .split('')
            .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
            .reduce((cur, acc) => acc + cur) * fontSize
        return tmp / 2;
    } catch {
        return 0
    }
}

function measureBold(string, fontSize = 10) {
    const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1265625, 0.334375, 0.409375, 0.6421875, 0.5609375, 0.88125, 0.8, 0.18125, 0.4, 0.4, 0.5, 0.721875, 0.25, 0.4, 0.25, 0.4015625, 0.5609375, 0.5, 0.5609375, 0.5, 0.5609375, 0.5, 0.5609375, 0.5609375, 0.5609375, 0.5609375, 0.278125, 0.3203125, 0.721875, 0.721875, 0.721875, 0.48125, 0.9609375, 0.88125, 0.8015625, 0.7203125, 0.88125, 0.721875, 0.721875, 0.8, 0.88125, 0.4, 0.5625, 0.88125, 0.721875, 1.0421875, 0.88125, 0.8, 0.721875, 0.8, 0.88125, 0.5609375, 0.640625, 0.88125, 0.88125, 1.040625, 0.88125, 0.8, 0.8015625, 0.4, 0.4015625, 0.334375, 0.6421875, 0.6421875, 0.334375, 0.5609375, 0.6421875, 0.48125, 0.5609375, 0.48125, 0.5609375, 0.5609375, 0.6421875, 0.3203125, 0.4390625, 0.6421875, 0.3203125, 0.9625, 0.6421875, 0.5609375, 0.6421875, 0.5609375, 0.48125, 0.4, 0.4015625, 0.6421875, 0.6421875, 0.88125, 0.6421875, 0.6421875, 0.5625, 0.48125, 0.2015625, 0.48125, 0.721875]
    const avg = 0.5999835526315791
    try {
        var tmp = string
            .split('')
            .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
            .reduce((cur, acc) => acc + cur) * fontSize
        return tmp / 2;
    } catch {
        return 0
    }
}

function generate_Table() {
    var venue_list = [];
    var wavl_list = [];
    var jl_list = [];

    var table = document.getElementById("Table1")
    var all_venues = Object.keys(__CONFIG__.venues);
    console.log(all_venues);
    //console.log(__CONFIG__.venues.length)
    //console.log(__CONFIG__.wavl.length)
    //console.log(__CONFIG__.jl.length)
    //console.log(__CONFIG__.jl[3].name)
    var wavl_keys = Object.keys(__CONFIG__.wavl)
    for (var i = 0; i < Math.max(all_venues.length, wavl_keys.length, __CONFIG__.jl.length); i++) {
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);
        var cell8 = row.insertCell(8);
        var cell9 = row.insertCell(9);

        // venue
        cell0.classList.add("cell12");
        cell0.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'

        try {
            var venue = __CONFIG__.venues[all_venues[i]];
            console.log(venue);
            cell1.classList.add("cell2")
            cell1.innerHTML = '<div id="venue_' + i.toString() + '" style="display:inline-block;width:16px;height:20px;z-index:56;">' +
                '<input type="checkbox" id="checkvenue_' + i.toString() + '" name="Venues" value="on" checked="" style="display:inline-block;opacity:0;" title="' + venue.name + '">' +
                '<label for="checkvenue_' + i.toString() + '"></label>' +
                '</div>'

            cell2.classList.add("cell9")
            cell2.innerHTML = '<div id="wb_Text8">' +
                '<span style="color:#000000;font-family:Arial;font-size:16px;">' + venue.name + '</span>' +
                '</div>'
        } catch (e) {
            //console.log(e)
            cell1.classList.add("cell10")
            cell1.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
            cell2.classList.add("cell11")
            cell2.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
        }

        cell3.classList.add("cell1")
        cell3.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'

        try {
            var wavl = __CONFIG__.wavl[wavl_keys[i]];
            cell4.classList.add("cell2")
            cell4.innerHTML = '<div id="wavl_' + i.toString() + '" style="display:inline-block;width:16px;height:20px;z-index:58;">' +
                '<input type="checkbox" id="checkwavl_' + i.toString() + '" name="WAVL_teams" value="on" checked="" style="display:inline-block;opacity:0;" title="' + wavl.long + '">' +
                '<label for="checkwavl_' + i.toString() + '"></label>' +
                '</div>'

            cell5.classList.add("cell9")
            cell5.innerHTML = '<div id="wb_Text32">' +
                '<span style="color:#000000;font-family:Arial;font-size:16px;">' + wavl.long + '</span>' +
                '</div>'
        } catch (e) {
            //console.log(e)
            //console.log(i)
            cell4.classList.add("cell10")
            cell4.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
            cell5.classList.add("cell11")
            cell5.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
        }

        cell6.classList.add("cell1")
        cell6.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'

        try {
            var jl = __CONFIG__.jl[i]
            cell7.classList.add("cell2")
            cell7.innerHTML = '<div id="wavjl_' + i.toString() + '" style="display:inline-block;width:16px;height:20px;z-index:60;">' +
                '<input type="checkbox" id="checkwavjl_' + i.toString() + '" name="WAVjL_teams" value="on" checked="" style="display:inline-block;opacity:0;" title="' + jl.long + '">' +
                '<label for="checkwavjl_' + i.toString() + '"></label>' +
                '</div>'

            cell8.classList.add("cell9")
            cell8.innerHTML = '<div id="wb_Text49">' +
                '<span style="color:#000000;font-family:Arial;font-size:16px;">' + jl.long + '</span>' +
                '</div>'
        } catch (e) {
            //console.log(e)
            //console.log(i)
            cell7.classList.add("cell10")
            cell7.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'
            cell8.classList.add("cell11")
            cell8.innerHTML = '<p style="font-size:8px;line-height:9.5px;">&nbsp;</p>'

        }
    }
    var fin_row = table.insertRow(-1);
    var fin_cell = fin_row.insertCell(0);
    fin_cell.classList.add("cell99")
}

generate_Table()
