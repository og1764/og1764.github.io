/**
 * Sets all venue checkboxes to be selected.
 * @param {*} checked 
 */
function select_all_venue(checked = true) {
    console.log("select_all_venues");
    const cbs = document.querySelectorAll('input[name="Venues"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox32").setAttribute("onClick", "javascript: deselect_all_venue();");

}

/**
 * Sets all venue checkboxes to be deselected.
 * @param {*} checked 
 */
function deselect_all_venue(checked = false) {
    console.log("deselect_all_venues");
    const cbs = document.querySelectorAll('input[name="Venues"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox32").setAttribute("onClick", "javascript: select_all_venue();");
}

/**
 * Sets all WAVL teams to be selected.
 * @param {*} checked 
 */
function select_all_wavl(checked = true) {
    console.log("select_all_wavl");
    const cbs = document.querySelectorAll('input[name="WAVL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox33").setAttribute("onClick", "javascript: deselect_all_wavl();");

}

/**
 * Sets all WAVL teams to be deselected.
 * @param {*} checked 
 */
function deselect_all_wavl(checked = false) {
    console.log("deselect_all_wavl");
    const cbs = document.querySelectorAll('input[name="WAVL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox33").setAttribute("onClick", "javascript: select_all_wavl();");
}

/**
 * Sets all WAVjL teams to be selected.
 * @param {*} checked 
 */
function select_all_wavjl(checked = true) {
    console.log("select_all_wavjl");
    const cbs = document.querySelectorAll('input[name="WAVjL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox34").setAttribute("onClick", "javascript: deselect_all_wavjl();");

}

/**
 * Sets all WAVjL teams to be deselected.
 * @param {*} checked 
 */
function deselect_all_wavjl(checked = false) {
    console.log("deselect_all_wavjl");
    const cbs = document.querySelectorAll('input[name="WAVjL_teams"]');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
    document.getElementById("Checkbox34").setAttribute("onClick", "javascript: select_all_wavjl();");
}

/**
 * NOT USED
 * 
 * Enable all WAVL buttons

function enable_button() {
    document.getElementById("WAVL").disabled = false;
}
*/

/**
 * Initialises loading dots.
 */
var dots = window.setInterval(function() {
    var wait = document.getElementById("Button4");
    if (wait.value.length < 16)
        wait.value += ".";
    else if (wait.value.length < 17)
        wait.value = "Please Wait";
}, 1000);



/**
 * Gets values from webpage and calls pdf_init.
 */
function WAVL_ONLINE() {
    console.log("WAVL_ONLINE");
    var venues = []
    var wavjl = []
    var wavl = []
    
    // Get all selected venues.
    document.getElementsByName("Venues").forEach((checkbox) => {
        if (document.getElementById(checkbox.id).checked) {
            venues.push(document.getElementById(checkbox.id).title)
        }
    })

    // Get all selected WAVL teams
    document.getElementsByName("WAVL_teams").forEach((checkbox) => {
        if (document.getElementById(checkbox.id).checked) {
            wavl.push(document.getElementById(checkbox.id).title)
        }
    })

    // Get all selected WAVjL teams
    document.getElementsByName("WAVjL_teams").forEach((checkbox) => {
        if (document.getElementById(checkbox.id).checked) {
            wavjl.push(document.getElementById(checkbox.id).title)
        }
    })

    // Update webpage to disable button and display a "Please Wait".
    document.getElementById("Button4").value = "Please Wait";
    window.setInterval(dots)
    document.getElementById("Button4").style.backgroundColor = "gold";
    document.getElementById("Button4").style.color = "black";
    document.getElementById("Button4").disabled = true;

    let dates = getDates()

    pdf_init(venues, wavl, wavjl, dates)
}

/**
 * Gets Start, End, and Selected date, and returns them in an array.
 * @returns String[] [start_date, end_date, initial_date]
 */
function getDates(){
    console.log("getDates");
    let initial_date = $("#DatePicker2").datepicker("option", "dateFormat", "yy-mm-dd").val();
    var temp_end_date = $("#DatePicker2").datepicker("getDate");
    
    temp_end_date.setTime(temp_end_date.getTime() + (1 * (24*60*60*1000)));
   
    var mon = temp_end_date.getMonth() + 1;
    var end_date = temp_end_date.getFullYear().toString().split(-2) + "-" +
                        mon.toString().padStart(2, '0') + "-" +
                        temp_end_date.getDate().toString().padStart(2, '0');
    
    var temp_start_date = $("#DatePicker2").datepicker("getDate");

    // If Checkbox is ticked, get all values for the past week.
    if (document.getElementById("Checkbox99").checked) {
        temp_start_date.setTime(temp_start_date.getTime() + (-6 * (24*60*60*1000)));
    }
    
    var month = temp_start_date.getMonth() + 1;
    var start_date = temp_start_date.getFullYear().toString().split(-2) + "-" +
                        month.toString().padStart(2, '0') + "-" +
                        temp_start_date.getDate().toString().padStart(2, '0');
    
    return [start_date, end_date, initial_date]
}

/**
 * Axios request to get csv of all players.
 * @returns CSV
 */
async function getPlayerList() {
    axios;
    const head = 'https://cors-anywhere-og-v5kf.onrender.com/vwa.bracketpal.com/leaders/season/';
    var url = head + SEASON_ID + "?csv=1";
    console.log("get_player_list: " + url);
    return await axios.get(url);
}

/**
 * Parses the Season Leaders webpage, sorts all players into their teams alphabetically, then updates the fixtures.
 * @param {Array} players_list 
 * @param {Fixture} upd_fixtures 
 * @returns Updated Fixture with Team Lists
 */
function parsePlayerList(players_list, upd_fixtures) {
    let dict = {};

    // Split the CSV into an Array
    let player_data = players_list[0].data.split("\n").map(function (line) {
        return line.split(",");
    });

    // Update Keys and Dict.
    for (i = 1; i < player_data.length; i++) {
        let name = player_data[i][0];
        let team_id = player_data[i][2].split(" ")[0];

        if (!(Object.keys(dict).includes(team_id))) {
            dict[team_id] = [split_name(name.trim())]
        } else {
            dict[team_id].push(split_name(name.trim()))
        }
    }

    for (i = 0; i < upd_fixtures.length; i++) {
        let team_a = upd_fixtures[i][6].split(" ")[0];
        let team_b = upd_fixtures[i][7].split(" ")[0];
        if (Object.keys(dict).includes(team_a) && Object.keys(dict).includes(team_b)) {
            upd_fixtures[i][17] = dict[team_a];
            upd_fixtures[i][18] = dict[team_b];
        }
    }
    return upd_fixtures;
}

/**
 * "Parent" function that basically everything else flows through. 
 * @param {String[]}    venues      Array of selected venues
 * @param {String[]}    wavl        Array of selected WAVL divisions
 * @param {String[]}    wavjl       Array of selected WAVjL divisions
 * @param {String[]}    dates       Array of yy-mm-dd strings indicating start, end, and selected dates.
 */
function pdf_init(venues, wavl, wavjl, dates) {
    console.log("pdf_init");
    // Get config data from selected teams, and add to an array
    var leagues = [];
    var fixtures = [];

    for (var i = 0; i < wavl.length; i++) {
        leagues.push([__CONFIG__.wavl[wavl[i]].long, __CONFIG__.wavl[wavl[i]].short, __CONFIG__.wavl[wavl[i]].id])
    }
    for (var i = 0; i < wavjl.length; i++) {
        leagues.push([__CONFIG__.jl[wavjl[i]].long, __CONFIG__.jl[wavjl[i]].short, __CONFIG__.jl[wavjl[i]].id])
    }

    var indiv = get_single_fixture(dates[0], dates[1]);
    fixtures.push(indiv);

    Promise.all(fixtures).then(fix_val => {
        var team_list = []

        var upd_fixtures = html_to_fixture(venues, leagues, dates[2], fix_val);
        var player_List = getPlayerList();
        Promise.all([player_List]).then(players_list => {
            let finalised_fixtures = parsePlayerList(players_list, upd_fixtures);
            modifyPdf(finalised_fixtures, dates[2]).then(value => {
                Promise.all(value).then(value_3 => {
                    mergePDFDocuments(value_3).then(value_2 => {
                        let filename = "Scoresheets " + dates[2].toString() + ".pdf"
                        
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
}

/**
 * Axios request to get fixture.
 * @param {String} start_date   First date in range
 * @param {String} end_date     Second date in range
 * @returns 
 */
async function get_single_fixture(start_date, end_date) {
    axios;
    const head = 'https://cors-anywhere-og-v5kf.onrender.com/vwa.bracketpal.com/dailyform/range?start_date=';
    var url = head + start_date.toString() + "&end_date=" + end_date.toString();
    console.log("get_single_fixture: " + url);
    return await axios.get(url);
}

/**
 * NOT USED
 * 
 * Axios request to get single team list.
 * @param {Integer} team_id Team ID
 * @returns 
 */
async function get_single_team_list_html(team_id) {
    axios;
    const head = 'https://cors-anywhere-og-v5kf.onrender.com/vwa.bracketpal.com/teaminfo/';
    var url = head + team_id.toString();
    // console.log("get_single_fixture: " + url);
    return await axios.get(url);
}

/**
 * NOT USED
 * 
 * Parse Team List HTML and add to relevant fixture. 
 * @param {HTML[]} player_names_html 
 * @param {Fixtures[]} fixtures 
 * @returns {Fixtures[]} Updated array of fixtures
 */
function addTeamList(player_names_html, fixtures) {
    console.log("addTeamList");
    let j = 0;

    // Loop over each match (hence i+2)
    for (i = 0; i < player_names_html.length; i = i + 2){

        // Ensure that the fixture lines up with the player names. 
        // No need to check as the order the fixtures were added is the same order that the player HTML was added
        while (fixtures[j][9][0][0] != "D" && fixtures[j][9][0][0] != "S") {j = j + 1};
        
        // Parse Team A
        var Aparser = new DOMParser();
	    var Adoc = Aparser.parseFromString(player_names_html[i].request.responseText, "text/html");
        let Aselector = '[class^="team_roster_player wfid_temp"]';
        var Aelements = Adoc.querySelectorAll(Aselector);
	    const Anames = [...Aelements];
        console.log(Anames);
        console.log(Aelements);
        let Aplayer_names = Anames.map((tmp => split_name(tmp.innerText.trim())));

        // Parse Team B
        var Bparser = new DOMParser();
	    var Bdoc = Bparser.parseFromString(player_names_html[i+1].request.responseText, "text/html");
        let Bselector = '[class^="team_roster_player wfid_temp"]';
        var Belements = Bdoc.querySelectorAll(Bselector);
	    const Bnames = [...Belements];
        console.log(Bnames);
        console.log(Belements);
        let Bplayer_names = Bnames.map((tmp => split_name(tmp.innerText.trim())));

        fixtures[j][17] = Aplayer_names;
        fixtures[j][18] = Bplayer_names;
        j = j + 1;
    }
    return fixtures;
}

/**
 * Sort fixtures based on sorting string
 * yyyy mm dd venue court hour
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function sorting(a, b) {
    // console.log("sorting");
    if (a[15] === b[15]) {
        return 0;
    } else {
        return (a[15] < b[15]) ? -1 : 1;
    }
}

/**
 * Sort fixtures based on TIME sorting string
 * yyyy mm dd venue hour court
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function time_sorting(a, b) {
    // console.log("time_sorting");
    if (a[16] === b[16]) {
        return 0;
    } else {
        return (a[16] < b[16]) ? -1 : 1;
    }
}

// [zero_venue_split, _venue_0, _venue_1, _venue_2, _venue_full, _court, _team_a, _team_b, _duty, _division, _date_dd, _date_mm, _date_yyyy, _time_hr, _time_min, _sorting, _time_sorting, [_a_List], [b_List]]
// [     0              1          2          3          4         5        6         7     8         9        10         11         12        13          14       15          16            17         18
/**
 * Read values from the Fixtures and update a PDF.
 * @param {Fixture[]} fix 
 * @param {String} dates 
 * @returns Array of PDF's (Base64Doc)
 */
async function modifyPdf(fix, dates) {
    console.log("modifyPdf");
    const {
        PDFDocument,
        StandardFonts,
        rgb
    } = PDFLib;
    var fixtures = fix;
    var total = new Array(fixtures.length);

    fixtures.sort(sorting);
    var WAVLurl = "https://og1764.github.io/static/def.pdf";
    var JLurl = "https://og1764.github.io/static/def_jl.pdf";

    const WAVLexistingPdfBytes = await fetch(WAVLurl).then(res => res.arrayBuffer());
    const JLexistingPdfBytes = await fetch(JLurl).then(resp => resp.arrayBuffer());

    for (var i = 0; i < fixtures.length; i++) {
        // Load WAVL and Junior League scoresheets
        var WAVLurl = "https://og1764.github.io/static/def.pdf";
        var JLurl = "https://og1764.github.io/static/def_jl.pdf";

        //var WAVLexistingPdfBytes = await fetch(WAVLurl).then(res => res.arrayBuffer());

        var WAVLpdfDoc = await PDFLib.PDFDocument.load(WAVLexistingPdfBytes);
        var WAVLhelveticaFont = await WAVLpdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        var WAVLhelveticaBold = await WAVLpdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
        var WAVLpages = await WAVLpdfDoc.getPages();
        var WAVLfirstPage = await WAVLpages[0];

        //var JLexistingPdfBytes = await fetch(JLurl).then(resp => resp.arrayBuffer());

        var JLpdfDoc = await PDFLib.PDFDocument.load(JLexistingPdfBytes);
        var JLhelveticaFont = await JLpdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        var JLhelveticaBold = await JLpdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
        var JLpages = await JLpdfDoc.getPages();
        var JLfirstPage = await JLpages[0];

        // If WAVL Game (Divisions or State League)
        if (fixtures[i][9][0][0] == "D" || fixtures[i][9][0][0] == "S") {

            // Team A Team List
            await WAVLfirstPage.drawText(fixtures[i][6], {
                x: 471,
                y: 498,
                size: 12,
                font: WAVLhelveticaFont
            })

            // Team A Players
            for (var k = 0; k < fixtures[i][17].length; k++) {
                if (k < Math.ceil(fixtures[i][17].length / 2)) {
                    // first name, first column
                    await WAVLfirstPage.drawText(fixtures[i][17][k][0].toUpperCase(), {
                        x: 442,
                        y: 472-Math.floor((17*k)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })

                    // surname, first column
                    await WAVLfirstPage.drawText(fixtures[i][17][k][1].toUpperCase(), {
                        x: 442,
                        y: 472-Math.floor((17*k+8.5)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                } else {
                    // first name, second column
                    await WAVLfirstPage.drawText(fixtures[i][17][k][0].toUpperCase(), {
                        x: 541,
                        y: 472-Math.floor((17*(k-Math.ceil(fixtures[i][17].length / 2)))),
                        size: 6,
                        font: WAVLhelveticaFont
                    })

                    // surname, second column
                    await WAVLfirstPage.drawText(fixtures[i][17][k][1].toUpperCase(), {
                        x: 541,
                        y: 472-Math.floor((17*(k-Math.ceil(fixtures[i][17].length / 2))+8.5)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                }
                
            }

            // Team A, Second column numbers
            let line_y_a = 472-Math.floor(17*Math.ceil(fixtures[i][17].length /2)-6);
            if (fixtures[i][17].length > 18) {
                line_y_a = 274;
            }
            await WAVLfirstPage.drawLine({
                start: { x: 539, y: 478 },
                end: { x: 539, y: line_y_a },
                thickness: 0.5,
                color: rgb(0,0,0),
                opacity: 1
            })
            
            await WAVLfirstPage.drawLine({
                start: { x: 519, y: 478 },
                end: { x: 519, y: line_y_a },
                thickness: 0.5,
                color: rgb(0,0,0),
                opacity: 1
            })

            // Team B Team List
            await WAVLfirstPage.drawText(fixtures[i][7], {
                x: 672,
                y: 498,
                size: 12,
                font: WAVLhelveticaFont
            })

            // Team B Players
            for (var k = 0; k < fixtures[i][18].length; k++) {
                if (k < Math.ceil(fixtures[i][18].length / 2)) {
                    // first name, first column
                    await WAVLfirstPage.drawText(fixtures[i][18][k][0].toUpperCase(), {
                        x: 645,
                        y: 472-Math.floor((17*k)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })

                    // surname, first column
                    await WAVLfirstPage.drawText(fixtures[i][18][k][1].toUpperCase(), {
                        x: 645,
                        y: 472-Math.floor((17*k+8.5)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                } else {
                    // first name, second column
                    await WAVLfirstPage.drawText(fixtures[i][18][k][0].toUpperCase(), {
                        x: 745,
                        y: 472-Math.floor((17*(k-Math.ceil(fixtures[i][18].length / 2)))),
                        size: 6,
                        font: WAVLhelveticaFont
                    })

                    // surname, second column
                    await WAVLfirstPage.drawText(fixtures[i][18][k][1].toUpperCase(), {
                        x: 745,
                        y: 472-Math.floor((17*(k-Math.ceil(fixtures[i][18].length / 2))+8.5)),
                        size: 6,
                        font: WAVLhelveticaFont
                    })
                }
            }
            
            // Team B, second column numbers
            let line_y_b = 472-Math.floor(17*Math.ceil(fixtures[i][18].length /2)-6);
            if (fixtures[i][18].length > 18) {
                // If 2 rows or less remaining, just draw the lines to the bottom of the player list.
                line_y_b = 274;
            }
            await WAVLfirstPage.drawLine({
                start: { x: 743, y: 478 },
                end: { x: 743, y: line_y_b },
                thickness: 0.5,
                color: rgb(0,0,0),
                opacity: 1
            })
            
            await WAVLfirstPage.drawLine({
                start: { x: 723, y: 478 },
                end: { x: 723, y: line_y_b },
                thickness: 0.5,
                color: rgb(0,0,0),
                opacity: 1
            })

            // Venue 0
            await WAVLfirstPage.drawText(fixtures[i][1], {
                x: parseInt((310 - measureText(fixtures[i][1], 10)).toString()),
                y: 575,
                size: 10,
                font: WAVLhelveticaFont
            })
            // Venue 1
            await WAVLfirstPage.drawText(fixtures[i][2], {
                x: parseInt((310 - measureText(fixtures[i][2], 10)).toString()),
                y: 566,
                size: 10,
                font: WAVLhelveticaFont
            })
            // Venue 2
            await WAVLfirstPage.drawText(fixtures[i][3], {
                x: parseInt((310 - measureText(fixtures[i][3], 10)).toString()),
                y: 557,
                size: 10,
                font: WAVLhelveticaFont
            })

            try {
                // Court Number
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
                if (fixtures[i][13].toString().toLowerCase().substring(0, 3) != "tbc" && fixtures[i][14].toString().toLowerCase().substring(0, 3) != "tbc") {
                    if (parseInt(fixtures[i][13]).toString().length == 1) {
                        hour = " " + parseInt(fixtures[i][13]).toString()
                    } else {
                        hour = parseInt(fixtures[i][13]).toString()
                    }

                    // Time (hour hh)
                    await WAVLfirstPage.drawText(hour, {
                        x: parseInt((492 - measureBold(hour, 13) - measureBold(hour, 13)).toString()),
                        y: 557,
                        size: 13,
                        font: WAVLhelveticaBold
                    })

                    // Time (minute mm)
                    await WAVLfirstPage.drawText(fixtures[i][14], {
                        x: 500,
                        y: 557,
                        size: 13,
                        font: WAVLhelveticaBold
                    })
                  }
              }catch (e){console.log(e);}
              // catch - continue
              var dd = " ";
              if (parseInt(fixtures[i][10]).toString().length == 1) {
                  dd = " " + parseInt(fixtures[i][10]).toString()
              }else{dd = parseInt(fixtures[i][10]).toString()}
  
              await WAVLfirstPage.drawText(dd, {
                  x: parseInt((596 - measureBold(dd,13) - measureBold(dd,13)).toString()),
                  y: 557,
                  size: 13,
                  font: WAVLhelveticaBold
              })
              await WAVLfirstPage.drawText(parseInt(fixtures[i][11]).toString(), {
                  x: parseInt((613 - measureBold(fixtures[i][11],13)).toString()),
                  y: 557,
                  size: 13,
                  font: WAVLhelveticaBold
              })
              await WAVLfirstPage.drawText(fixtures[i][12].slice(2,4), {
                  x: 625,
                  y: 557,
                  size: 13,
                  font: WAVLhelveticaBold
              })
              await WAVLfirstPage.drawText(fixtures[i][9][1], {
                  x: parseInt((773 - measureBold(fixtures[i][9][1],13)).toString()),
                  y: 557.5,
                  size: 13,
                  font: WAVLhelveticaBold
              })
              await WAVLfirstPage.drawText(fixtures[i][8], {
                  x: parseInt((710 - measureText(fixtures[i][8],14)).toString()),
                  y: 528,
                  size: 14,
                  font: WAVLhelveticaFont
              })
              // if length > 18
              if(fixtures[i][6].length > 18 || fixtures[i][7].length > 18) {
                  await WAVLfirstPage.drawText(fixtures[i][6], {
                      x: parseInt((320 - measureText(fixtures[i][6],10)).toString()),
                      y: 527,
                      size: 10,
                      font: WAVLhelveticaFont
                  })
                  await WAVLfirstPage.drawText(fixtures[i][7], {
                      x: parseInt((460 - measureText(fixtures[i][7],10)).toString()),
                      y: 527,
                      size: 10,
                      font: WAVLhelveticaFont
                  })
              }else {
                  WAVLpdfDoc.TextAlignment = 1;
                  await WAVLfirstPage.drawText(fixtures[i][6], {
                      x: parseInt((320 - measureText(fixtures[i][6],14)).toString()),
                      y: 527,
                      size: 14,
                      font: WAVLhelveticaFont
                  })
                  await WAVLfirstPage.drawText(fixtures[i][7], {
                      x: parseInt((460 - measureText(fixtures[i][7],14)).toString()),
                      y: 527,
                      size: 14,
                      font: WAVLhelveticaFont
                  })
              }
              var saved = await WAVLpdfDoc.saveAsBase64();
          }else{
              // Junior League
              // full venue
              await JLfirstPage.drawText(fixtures[i][0], {
                  x: parseInt((180 - measureText(fixtures[i][0],13)).toString()),
                  y: 504,
                  size: 13,
                  font: JLhelveticaFont
              })
              // court
              await JLfirstPage.drawText(fixtures[i][5], {
                  x: parseInt((562 - measureText(fixtures[i][5],13)).toString()),
                  y: 504,
                  size: 13,
                  font: JLhelveticaFont
              })
              try{
                  // time
                  let time = " "
                  if (parseInt(fixtures[i][13]).toString().length == 1) {
                      time = " " + parseInt(fixtures[i][13]).toString() + ":" + fixtures[1][14];
                  }else{time = parseInt(fixtures[i][13]).toString() + ":" + fixtures[1][14];}
                  await JLfirstPage.drawText(time, {
                      x: 442,
                      y: 504,
                      size: 13,
                      font: JLhelveticaFont
                  })
              } catch (e) {console.log(e)}
              try{
                  // date
                  let dt = " ";
                  dt = parseInt(fixtures[i][10]).toString() + "/" + parseInt(fixtures[i][11]).toString() + "/" + fixtures[i][12]
                  await JLfirstPage.drawText(dt, {
                      x: 315,
                      y: 504,
                      size: 13,
                      font: JLhelveticaFont
                  })
              } catch (e) {console.log(e)}
              // division
              await JLfirstPage.drawText(fixtures[i][9][0], {
                  x: parseInt((720 - measureText(fixtures[i][9][0],13)).toString()),
                  y: 504,
                  size: 13,
                  font: JLhelveticaFont
              })
              // if length > 25
              if(fixtures[i][6].length > 25 || fixtures[i][7].length > 25) {
                  await JLfirstPage.drawText(fixtures[i][6], {
                      x: parseInt((250 - measureText(fixtures[i][6],10)).toString()),
                      y: 472,
                      size: 10,
                      font: JLhelveticaFont
                  })
                  await JLfirstPage.drawText(fixtures[i][7], {
                      x: parseInt((660 - measureText(fixtures[i][7],10)).toString()),
                      y: 472,
                      size: 10,
                      font: JLhelveticaFont
                  })
              }else {
                  JLpdfDoc.TextAlignment = 1;
                  await JLfirstPage.drawText(fixtures[i][6], {
                      x: parseInt((250 - measureText(fixtures[i][6],14)).toString()),
                      y: 472,
                      size: 14,
                      font: JLhelveticaFont
                  })
                  await JLfirstPage.drawText(fixtures[i][7], {
                      x: parseInt((660 - measureText(fixtures[i][7],14)).toString()),
                      y: 472,
                      size: 14,
                      font: JLhelveticaFont
                  })
              }
          var saved = await JLpdfDoc.saveAsBase64();
          }
          total[i] = saved;
      }
      //download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
      console.log(total);
      return await total;
  
  }
  
  async function mergePDFDocuments(documents) {
      console.log(documents);
      var mergedPdf = await PDFLib.PDFDocument.create();
      for(var i = 0; i < documents.length; i++) {
          console.log(i)
          var docone = await PDFLib.PDFDocument.load(await documents[i]);
          //var copiedPagesone = await mergedPdf.copyPages(docone, [0, 1]);
          //await mergedPdf.addPage(await copiedPagesone[0]);
          //await mergedPdf.addPage(await copiedPagesone[1]);
          var copiedPagesone = await mergedPdf.copyPages(docone, docone.getPageIndices());
          for(var j = 0; j < docone.getPageIndices().length; j++){
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
  
  
  function get_URLS(leagues, date){
      var all_urls = []
      for(var i = 0; i < leagues.length; i++){
          var url = head + leagues[k][2] + "/" + date.toString();
          all_urls.push(url)
      }
      return all_urls
  }
  
  function div_from_id(id){
      for(var i = 0; i < __CONFIG__.wavl.length; i++){
          if(__CONFIG__.wavl[i].id == id){
              return [__CONFIG__.wavl[i].long,__CONFIG__.wavl[i].short,__CONFIG__.wavl[i].id]
          }
      }
      for(var i = 0; i < __CONFIG__.jl.length; i++){
          if(__CONFIG__.jl[i].id == id) {
              return [__CONFIG__.jl[i].long, __CONFIG__.jl[i].short, __CONFIG__.jl[i].id]
          }
      }
      return false
  }
  
  function add_aliases(venues){
      var resultant = [];
      var low_venues = [];
      for(var j = 0; j < venues.length; j++){low_venues.push(venues[j].toLowerCase())}
  
      console.log(low_venues)
      for(var i = 0; i < __CONFIG__.venues.length; i++){
          console.log(__CONFIG__.venues[i].name.toLowerCase())
          if(low_venues.includes(__CONFIG__.venues[i].name.toLowerCase())){
              resultant.push(__CONFIG__.venues[i].name);
              for(var k = 0; k < __CONFIG__.venues[i].alias.length; k++){
                  var _alias = __CONFIG__.venues[i].alias[k];
                  resultant.push(_alias)
              }
          }
      }
      return resultant;
  }
  
  function html_to_fixture(venues, leagues, date, all_html) {
      let fixtures_list = []
      console.log(leagues);
      console.log(all_html);
      let venue_usage = add_aliases(venues);
      console.log(venue_usage)
      console.log("HERE HERE HERE")
      for(let x = 0; x < all_html.length; x++) {
          let parser = new DOMParser();
          let htmlDoc = parser.parseFromString(all_html[x].data, 'text/html');
          console.log(all_html[x].request.responseURL)
          try {
              let div_table = htmlDoc.getElementsByTagName("table")[1]
              console.log("***")
              console.log(div_table.rows.item(1).cells.item(2).innerText)
              let temp_div = DIVISIONS[div_table.rows.item(1).cells.item(2).innerText]
              console.log(temp_div)
              let table = htmlDoc.getElementsByTagName("table")[2]
              let rowLength = table.rows.length;
              for (let i = 1; i < rowLength; i++) {
                  let cells = table.rows.item(i).cells;
                  let venue = cells.item(1).innerText;
                  console.log(venue);
                  let venue_split = venue.split(" Ct")
                  let zero_venue_split = venue_split[0].replaceAll(" Ct", "");
                  console.log(venue_usage);
                  console.log(zero_venue_split);
                  if (venue_usage.includes(zero_venue_split)) {
                      let _court = cells.item(1).innerText.split("Ct")[1];
                      const _team_a = cells.item(2).innerText;
                      const _team_b = cells.item(5).innerText;
                      console.log(_team_a);
                      console.log(x)
                      let _duty = " ";
                      let _time_hr = " ";
                      let _time_min = " ";
                      try {
                          _duty = cells.item(7).innerText.slice(5);
                      } catch (e) {
                          console.log(e)
                          _duty = " ";
                      }
                      //var division = leagues[j];
                      let url = all_html[x].request.responseURL;
                      let split_url = url.split('/');
                      let _division = temp_div;
                      console.log(temp_div)
                      //let _division = __CONFIG__
                      //console.log(_division)
                      let _date = date.split('-');
                      let _date_dd = _date[2];
                      let _date_mm = _date[1];
                      let _date_yyyy = _date[0]
                      try {
                          let time = cells.item(0).innerText.split(":")
                          _time_hr = time[0].padStart(2, "0");
                          _time_min = time[1];
                      } catch (e) {
                          console.log(e);
                          _time_hr = " ";
                          _time_min = " ";
                      }
                      let _tmp_venue = VENUE_SPLIT[zero_venue_split.toLowerCase()].split("*");
                      const _venue_0 = _tmp_venue[0]
                      const _venue_1 = _tmp_venue[1]
                      const _venue_2 = _tmp_venue[2]
                      let _venue_full = VENUE_SPLIT[zero_venue_split.toLowerCase()].replaceAll("*", " ").trimLeft();
                      let _sorting = _venue_full + " " + _court + " " + _time_hr
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
                          _team_a, _team_b, _duty, _division, _date_dd, _date_mm, _date_yyyy, _time_hr, _time_min, _sorting])
                      console.log(fixtures_list)
  
                  } else {
                      console.log("UNUSED VENUE")
                      console.log(zero_venue_split)
                  }
  
              }
          } catch (e) {
              console.log(e)
          }
      }
      //console.log(fixtures_list);
      return fixtures_list
  }
  
  function measureText(string, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1546875,0.278125,0.4,0.721875,0.5609375,0.9609375,0.7203125,0.240625,0.4,0.4,0.48125,0.640625,0.278125,0.4,0.278125,0.4015625,0.5609375,0.55625,0.5609375,0.5609375,0.640625,0.5609375,0.5609375,0.5609375,0.5609375,0.5609375,0.278125,0.278125,0.640625,0.640625,0.640625,0.5609375,1.1203125,0.88125,0.7203125,0.8,0.7234375,0.7203125,0.640625,0.8,0.7234375,0.278125,0.5,0.8,0.640625,0.88125,0.7234375,0.8,0.7203125,0.8,0.8,0.7203125,0.640625,0.7234375,0.8015625,1.121875,0.8015625,0.8015625,0.721875,0.3203125,0.48125,0.3203125,0.48125,0.721875,0.334375,0.5609375,0.640625,0.5609375,0.5609375,0.5609375,0.48125,0.5609375,0.5609375,0.240625,0.321875,0.5609375,0.240625,0.88125,0.5609375,0.5609375,0.640625,0.5609375,0.4,0.5609375,0.4015625,0.5609375,0.6421875,0.88125,0.6421875,0.6421875,0.6421875,0.4,0.2609375,0.48125,0.640625]
      const avg = 0.5823026315789476
      try {
          var tmp = string
              .split('')
              .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
              .reduce((cur, acc) => acc + cur) * fontSize
          return tmp / 2;
      }catch{return 0}
  }
  
  function measureBold(string, fontSize = 10) {
      const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1265625,0.334375,0.409375,0.6421875,0.5609375,0.88125,0.8,0.18125,0.4,0.4,0.5,0.721875,0.25,0.4,0.25,0.4015625,0.5609375,0.5,0.5609375,0.5,0.5609375,0.5,0.5609375,0.5609375,0.5609375,0.5609375,0.278125,0.3203125,0.721875,0.721875,0.721875,0.48125,0.9609375,0.88125,0.8015625,0.7203125,0.88125,0.721875,0.721875,0.8,0.88125,0.4,0.5625,0.88125,0.721875,1.0421875,0.88125,0.8,0.721875,0.8,0.88125,0.5609375,0.640625,0.88125,0.88125,1.040625,0.88125,0.8,0.8015625,0.4,0.4015625,0.334375,0.6421875,0.6421875,0.334375,0.5609375,0.6421875,0.48125,0.5609375,0.48125,0.5609375,0.5609375,0.6421875,0.3203125,0.4390625,0.6421875,0.3203125,0.9625,0.6421875,0.5609375,0.6421875,0.5609375,0.48125,0.4,0.4015625,0.6421875,0.6421875,0.88125,0.6421875,0.6421875,0.5625,0.48125,0.2015625,0.48125,0.721875]
      const avg = 0.5999835526315791
      try {
          var tmp = string
              .split('')
              .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
              .reduce((cur, acc) => acc + cur) * fontSize
          return tmp / 2;
      }catch{return 0}
  }
  
  function generate_Table(){
      var venue_list = [];
      var wavl_list = [];
      var jl_list = [];
  
      var table = document.getElementById("Table1")
  
      //console.log(__CONFIG__.venues.length)
      //console.log(__CONFIG__.wavl.length)
      //console.log(__CONFIG__.jl.length)
      //console.log(__CONFIG__.jl[3].name)
      for(var i = 0; i < Math.max(__CONFIG__.venues.length, __CONFIG__.wavl.length, __CONFIG__.jl.length); i++){
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
              var venue = __CONFIG__.venues[i];
              cell1.classList.add("cell2")
              cell1.innerHTML = '<div id="venue_' + i.toString() + '" style="display:inline-block;width:16px;height:20px;z-index:56;">' +
                  '<input type="checkbox" id="checkvenue_'+ i.toString() + '" name="Venues" value="on" checked="" style="display:inline-block;opacity:0;" title="'+ venue.name +'">' +
                  '<label for="checkvenue_'+ i.toString() + '"></label>' +
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
  
          try{
              var wavl = __CONFIG__.wavl[i];
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
  
          try{
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
