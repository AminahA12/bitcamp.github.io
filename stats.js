var data = [];
// 0:hurr, 1:sev. storm, 2:snowst, 3:flood, 4:torna, 5:mu/land, 6:fire, 7:sub hous risk rank, 8:pov rate, 9:med income, 10:num fed sub prop, 11:delta hpi, 12:hpi2018, 13:hpi 2022



$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data4.2.3.csv",
        dataType: "text",
        success: function(data) {getData("1001");}
     });
});

function getData(fipsCode) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var line = [];

    for (var i=1; i<allTextLines.length; i++) {
        var line = allTextLines[i].split(',');
        if (line[0] == fipsCode) {
            data.push(line[22]);
            data.push(line[21]);
            data.push(line[23]);
            data.push(line[18]);
            data.push(line[6]);
            data.push(line[5]);
            data.push(line[20]);
            data.push(line[20]);
            data.push(line[13]);
            data.push(line[12]);
            data.push(line[11]);
            data.push(line[7]);
            data.push(line[10]);
            data.push(line[9]);
            data.push(line[8]);
            break;
        }
    }
    console.log(data);
}



