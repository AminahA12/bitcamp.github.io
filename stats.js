var countyData = [];
// 0:hurr, 1:sev. storm, 2:snowst, 3:flood, 4:torna, 5:mu/land, 6:fire, 7:sub hous risk rank, 8:pov rate, 9:med income, 10:num fed sub prop, 11:delta hpi, 12:hpi2018, 13:hpi 2022, 14:name



$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "/data4.2.3.csv",
        dataType: "text",
        success: function(data) {
            console.log('pageload');
            var urlParams = new URLSearchParams(window.location.search);
            var fip = urlParams.get('fips');
            console.log('getting data');
            getData(data,fip);

            console.log(countyData);
            consolte.log("fip: " + fip);
            document.getElementById('county').innerHTML = "Data for " + countyData[14];
            document.getElementById('disasters').innerHTML = "Natural Disasters, past 5 years: <br> Hurricanes: " + countyData[0] + " <br> Severe Storms: " + countyData[1] + " <br> Snowstorms: " + countyData[2] + " <br>Floods: " + countyData[3] + " <br>Tornadoes: " + countyData[4] + " <br>Mud/Landslides: " + countyData[5] + " <br>Fires: " + countyData[6];
            document.getElementById('risk-rank').innerHTML = "Subsidized Housing Risk Rank: <br> " + countyData[7] + "<br> of <br> 3143 <br>";
            document.getElementById('poverty-rate').innerHTML = (Math.round(countyData[8] * 100) / 10) + "%";
            document.getElementById('income-properties-hpi').innerHTML = "Median household income: " + countyData[9] + " <br> Number of Federally Subsidized Properties: " + countyData[10] + " <br> Change in HPI, 2018-2022: " + countyData[11] + " <br>";
            document.getElementById('2018').innerHTML = countyData[12];
            document.getElementById('2022').innerHTML = countyData[13];
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
            countyData.push(line[8]); //hurr
            countyData.push(line[9]); //sev storm
            countyData.push(line[10]); //snow
            countyData.push(line[7]); //flood
            countyData.push(line[11]); //torn
            countyData.push(line[12]); //mud/land
            countyData.push(line[13]); //fire
            countyData.push(line[20]); //sub hous risk rank
            countyData.push(line[15]); //pov rate
            countyData.push(line[6]); //med income
            countyData.push(line[18]); //num fed sub prop
            countyData.push(line[23]); //delta hpi
            countyData.push(line[21]); //hpi2108
            countyData.push(line[22]); //hpi2022
            countyData.push(line[3]); //name
            break;
        }
    }
    console.log(countyData);
}



