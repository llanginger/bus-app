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


$(".box1").css({
  "height"            : "300px",
  "width"             : "1000px",
  "background-color"  : time.onTime
})


var apiButton = "<button class='apiButton'>Test API</button>";

var apiButton2 = "<button class='apiButton2'>Test Market Street API</button>";

$(".box1").append([apiButton, apiButton2]);

var nextArrival = {};
var delayedBy;

$(".apiButton").click(function() {
  $.ajax({
    url: oneBusUrl,
    dataType: "jsonp",
  })
  .done(function(busData) {
    // console.log(oneBusUrl);
    // console.log(busData);


  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
})


$(".apiButton2").click(function() {
  $.ajax({
    url: marketStreetTestUrl,
    dataType: "jsonp",
  })
  .done(function(busData) {
    // console.log(marketStreetTestUrl);
    // console.log(busData);

    // TODO Figure out why this date stuff isn't working! (It's because it should be figuring out the difference and only presenting minutes instead of a full time!!)

    var nextArrival       = busData.data.entry.arrivalsAndDepartures[0];
    var delayedBy         = nextArrival.tripStatus.scheduleDeviation;
    var predictedArrival  = nextArrival.predictedArrivalTime;

    var now     = new Date().getTime()
    var busDate = new Date(predictedArrival)

    var timeToStop = new Date(busDate - now);

    var hours     =       timeToStop.getHours();
    var minutes   = "0" + timeToStop.getMinutes();
    var seconds   = "0" + timeToStop.getSeconds();

    var formattedTimeToStop = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    console.log(formattedTimeToStop);



    if (delayedBy >= 0) {
      $(".box1").css("background-color", time.onTime);
    } else if (delayedBy > 120) {
      $(".box1").css("background-color", time.littleLate);
    } else if (delayedBy > 300) {
      $(".box1").css("background-color", time.late);
    } else if (delayedBy > 1000) {
      $(".box1").css("background-color", time.veryLate);
    } else if (delayedBy < 0) {
      $(".box1").css("background-color", time.early);
    }

    $(".box-text").text("Bus is delayed by: " + Math.round(delayedBy / 60) + " minutes");
    console.log("Complete data:")
    console.log(nextArrival)
    console.log("Delayed by: " + delayedBy / 60 + " minutes")

  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
})


class App extends React.Component {

  clickFunction() {
    console.log("clickfunction clicked");
  }
  reactMarketApi() {
    $.ajax({
      url: marketStreetTestUrl,
      dataType: "jsonp",
    })
    .done(function(busData) {
      // console.log(marketStreetTestUrl);
      // console.log(busData);

      // TODO Figure out why this date stuff isn't working! (It's because it should be figuring out the difference and only presenting minutes instead of a full time!!)

      var nextArrival       = busData.data.entry.arrivalsAndDepartures[0];
      var delayedBy         = nextArrival.tripStatus.scheduleDeviation;
      var predictedArrival  = nextArrival.predictedArrivalTime;

      var now     = new Date().getTime()
      var busDate = new Date(predictedArrival)

      var timeToStop = new Date(busDate - now);

      var hours     =       timeToStop.getHours();
      var minutes   = "0" + timeToStop.getMinutes();
      var seconds   = "0" + timeToStop.getSeconds();

      var formattedTimeToStop = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

      console.log(formattedTimeToStop);



      if (delayedBy >= 0) {
        $(".box1").css("background-color", time.onTime);
      } else if (delayedBy > 120) {
        $(".box1").css("background-color", time.littleLate);
      } else if (delayedBy > 300) {
        $(".box1").css("background-color", time.late);
      } else if (delayedBy > 1000) {
        $(".box1").css("background-color", time.veryLate);
      } else if (delayedBy < 0) {
        $(".box1").css("background-color", time.early);
      }

      $(".box-text").text("Bus is delayed by: " + Math.round(delayedBy / 60) + " minutes");
      console.log("Complete data:")
      console.log(nextArrival)
      console.log("Delayed by: " + delayedBy / 60 + " minutes")

    })
    .fail(function() {
      console.log("error");
    })
  }

  render() {
    return (
      <div>
        <DisplayArea />
        <Button name="react market api" clickFunc={this.reactMarketApi}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
