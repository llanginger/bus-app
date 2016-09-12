var $ = require("jQuery");
import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import DisplayArea from "./DisplayArea";
import BusAnim from "./BusAnim";

var time = {
  early       : "#0074D9",
  onTime      : "#2ECC40",
  littleLate  : "#FF851B",
  late        : "#FF4136",
  veryLate    : "#85144b"
}


var timeToStop;

var params = {};

var myPos = {
  lat   : "47.668674",
  lon   : "-122.376324"
}

var marketStop = {
  code: "13721",
  direction: "S",
  id: "1_13721",
  lat: 47.668907,
  locationType: 0,
  lon: -122.376312,
  name: "15th Ave NW & NW Market St",
  routeIds:
  [
    "1_100044",
    "1_100350",
    "1_102581"
  ],
  wheelchairBoarding: "UNKNOWN"
}

var allRoutes = "route-ids-for-agency/1"

var oneBusKey = "4f368d44-acaf-4922-8930-12a607f4ef44"

var route = "trips-for-route/"

var D_LINE_ID = "1_102581"

var oneBusUrl = "http://api.pugetsound.onebusaway.org/api/where/" + route + D_LINE_ID + ".json?key=" + oneBusKey + "&includeStatus=true";

var marketStreetTestUrl = "http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/" + marketStop.id + ".json?key=" + oneBusKey


var apiButton = "<button class='apiButton'>Test API</button>";

var apiButton2 = "<button class='apiButton2'>Test Market Street API</button>";

$(".box1").append([apiButton, apiButton2]);

var nextArrival = {};
var delayedBy;




// $(".apiButton").click(function() {
//   $.ajax({
//     url: oneBusUrl,
//     dataType: "jsonp",
//   })
//   .done(function(busData) {
//     // console.log(oneBusUrl);
//     // console.log(busData);
//
//
//   })
//   .fail(function() {
//     console.log("error");
//   })
//   .always(function() {
//     console.log("complete");
//   });
// })
//
//


class App extends React.Component {



  render() {
    return (
      <div>
        <DisplayArea />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
