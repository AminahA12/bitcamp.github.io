var categories = []
var sorted_data = []

// 0:hurr, 1:sev. storm, 2:snowst, 3:flood, 4:torna, 5:mu/land, 6:fire, 7:sub hous risk rank, 8:pov rate, 9:med income, 10:num fed sub prop, 11:delta hpi, 12:hpi2018, 13:hpi 2022
window.onload = function() {
    document.querySelector('.embed-container').style.opacity = '1';  // Set to opaque when the page is loaded
  };
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data4.2.3.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    for (var i=0;i<lines.length; i++) {
        categories.push(lines[i][3].split(':')[1]);
        sorted_data.push(lines[i]);
    }
    categories.sort();
    sorted_data.sort(function(a, b) {
      var nameA = a[3].toUpperCase(); // Convert to uppercase to ensure case-insensitive comparison
      var nameB = b[3].toUpperCase(); // Convert to uppercase for comparison
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
}

function sortNestedList(nestedList) {
  nestedList.sort(function(a, b) {
    return a[3] - b[3];
  });
  return nestedList;
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus = -1;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        var autocompleted_items = 0
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            autocompleted_items++;
            /*create nb nm a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
            if (autocompleted_items == 9 || arr[i+1].substr(0, val.length).toUpperCase() != val.toUpperCase()) {
                b.setAttribute("style", "border-bottom-right-radius:8px; border-bottom-left-radius:8px");
                break;
            }
          }

        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        console.log(x);
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

function showAllCategoriesOnClick(inp, arr) {

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    inp.addEventListener("focus", function() {
        var categoryList, listItem, i, val = this.value;
        var categoryList = document.createElement("DIV");
        categoryList.setAttribute("id", "autocomplete-list");
        categoryList.setAttribute("class", "autocomplete-items");
        for (var i = 0; i < Math.min(arr.length, 10); i++) {
            var listItem = document.createElement("DIV");
            console.log(i);
            if (i == Math.min(arr.length, 10) - 1) {
                listItem.setAttribute("style", "border-bottom-right-radius:8px; border-bottom-left-radius:8px");
            }
            /*make the matching letters bold:*/
            listItem.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            listItem.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            listItem.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            listItem.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            categoryList.appendChild(listItem);
        }
        this.parentNode.appendChild(categoryList);
    });
}

function changePage(inp) {
    inp.addEventListener("click", function() {
        var input = document.getElementById("myInput").value
        console.log(input);
        var index = categories.indexOf(input);
        console.log(categories);
        console.log(index);
        console.log(sorted_data);
        var fips = sorted_data[index][0].split(":")[1];
        window.location.href = "/bitcamp.github.io/stats?fips="+fips;
    });
}

var texts = [
  "The map to the right shows which areas (at a county-level) have their respective housing markets most at risk to natural disasters and poverty. The risk index utilized incorporates and combines data regarding the poverty rate and number of natural disasters that have occurred in each U.S. county. \r\n\r\n The map highlights some major hotspots for housing market risk; Lousiana and northern Florida are the most evident ones. Other notable but lesser hotspots include southern Florida, North and South Carolina, and Missisippi.",
  "This map details areas of federally-assisted housing by quantity on a county level. \r\n\r\n Overall, federally-assisted rental housing appears in much higher concentrations for the top 4 counties compared to the rest - New York County at 114,167 homes, Bronx County at 111,768 homes, Los Angeles County at 108,388 homes, and Cook County at 92,983 homes respectively. The next highest county is Harris County at 60,733 homes, with a sizable negative margin of -32,250 homes compared to Cook County.",
  "This map showcases the percent change in housing price index (HPI) by county from 2018 to 2022. \r\n\r\n On a state level, Florida counties have experienced the highest change in HPI on average. From a broader perspective though, there is a clear hotspot for HPI change which includes Tennessee, northern Georgia, and the westmost of North Carolina. On average, counties on the west of the U.S. experienced a higher change in HPI than counties on the east of the U.S.",
  "The map to the right measures counties by number of hurricane disaster declarations from 2018-2022. \r\n\r\n The counties that have experienced hurricane disaster declarations are mostly concentrated in the southeast of the country, with Louisiana having the most declarations by a fair margin.",
  "This map measures counties based on a Housing Risk Index, calculated by taking the number of federally assisted rental homes multiplied by the total number of disasters and computing the log of this value. \r\n\r\n Areas of most notable risk based on this index are Florida, California, Louisiana, and the general northeast of New England."
]

var maps = [
  ["//none6cf7dfe0feaf.maps.arcgis.com/apps/Embed/index.html?webmap=67c2bbfe845446ada0f5432a19e4aa0f&extent=-168.0768,3.6039,-42.4811,61.6912&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light", "County Risk Indices"],
  ["//none6cf7dfe0feaf.maps.arcgis.com/apps/Embed/index.html?webmap=4815a801b10b4cedbb905764934eae8c&extent=-144.3903,-5.482,-49.82,57.0183&home=true&zoom=true&previewImage=false&scale=true&legend=true&disable_scroll=true&theme=light", "US Federally Assisted Housing Distribution"],
  ["//none6cf7dfe0feaf.maps.arcgis.com/apps/Embed/index.html?webmap=7d561f37ca02424490ba5aebf9d4610e&extent=-142.5446,10.0149,-47.9743,64.5685&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=false&legend=true&disable_scroll=true&theme=light", "Change in HPI by County, 2018-2022"],
  ["//none6cf7dfe0feaf.maps.arcgis.com/apps/Embed/index.html?webmap=dc6f8795ca074634b64cdcc85eb7c30c&extent=-99.1039,24.914,-67.705,40.6537&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&legend=true&disable_scroll=true&theme=light","Hurricane Disaster Declarations by County, 2018-22"],
  ["//none6cf7dfe0feaf.maps.arcgis.com/apps/Embed/index.html?webmap=3fac09100d5049b38829b04919a2a2c4&extent=-144.3024,6.6237,-49.7321,63.0562&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&legend=true&disable_scroll=true&theme=light","Housing Risk Index by County"]
]

var curr_index = 0;

function move_left() {
  curr_index--;
  if (curr_index < 0) {
    curr_index = 5;
  }
  change_content();
}

function move_right() {
  curr_index++;
  if (curr_index > 4) {
    curr_index = 0;
  }
  change_content();
}

function change_content() {
  document.getElementsByClassName("main-body-text")[0].innerText = texts[curr_index];
  document.getElementsByTagName("iframe")[0].src = maps[curr_index][0]
  document.getElementsByTagName("iframe")[0].title = maps[curr_index][1]
}
$(function() {
  $("#table").load("Data.html");
});
