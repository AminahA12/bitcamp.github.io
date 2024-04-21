var data = [];
// 0:hurr, 1:sev. storm, 2:snowst, 3:flood, 4:torna, 5:mu/land, 6:fire, 7:sub hous risk rank, 8:pov rate, 9:med income, 10:num fed sub prop, 11:delta hpi, 12:hpi2018, 13:hpi 2022



$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data4.2.3.csv",
        dataType: "text",
        success: function(data) {
            var urlParams = new URLSearchParams(window.location.search);
            var fip = urlParams.get('fips');
            getData(data,fip);
        }
     });
});

function getData(allText,fipsCode) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var line = [];

    for (var i=1; i<allTextLines.length; i++) {
        var line = allTextLines[i].split(',');
        if (line[0] == fipsCode) {
            data.push(line[8]); //hurr
            data.push(line[9]); //sev storm
            data.push(line[10]); //snow
            data.push(line[7]); //flood
            data.push(line[11]); //torn
            data.push(line[12]); //mud/land
            data.push(line[13]); //fire
            data.push(line[20]); //sub hous risk rank
            data.push(line[15]); //pov rate
            data.push(line[6]); //med income
            data.push(line[18]); //num fed sub prop
            data.push(line[23]); //delta hpi
            data.push(line[21]); //hpi2108
            data.push(line[22]); //hpi2022
            break;
        }
    }
    console.log(data);
}



