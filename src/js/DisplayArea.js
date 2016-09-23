import React from "react";
import BusAnim from "./BusAnim";
import Button from "./Button";
import JumboTron from "./JumboTron";
import classNames from "classnames";
import $ from "jQuery";
import Dropdown from "./Dropdown";
// import testFunc from "./testFunc";


if (typeof window !== 'undefined') {
  window.React = React;
}


let listItems = ["Thing 1", "thing 2", "another thing", "One more"]

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

let OneBusApi = {
  baseUrl     : "http://api.pugetsound.onebusaway.org/api/where/",
  allRoutes   : "route-ids-for-agency/1",
  arrivalsDeparturesForStop : "arrivals-and-departures-for-stop/",
  route       : "trips-for-route/",
  key         : "?key=4f368d44-acaf-4922-8930-12a607f4ef44",
  D_LINE_ID   : "1_102581"
}

// var allRoutes = "route-ids-for-agency/1"

// var oneBusKey = "4f368d44-acaf-4922-8930-12a607f4ef44"

// var route = "trips-for-route/"

// var D_LINE_ID = "1_102581"

let oneBusUrl = OneBusApi.baseUrl + OneBusApi.route + OneBusApi.D_LINE_ID + ".json" + OneBusApi.key + "&includeStatus=true";

let marketStreetTestUrl = OneBusApi.baseUrl + OneBusApi.arrivalsDeparturesForStop + marketStop.id + ".json" + OneBusApi.key


var nextArrival = {};
var delayedBy;

let runRecursive = true;

// let recCall = () => {
//   doAjaxRequest( function(result) {
//     console.log("New ajax function result: ")
//     console.log(result)
//     return result;
//   })
//
// }




// TODO Refactor this code so that the .done has a callback function that returns the data so that in the main "recCall" function I have a function that modifies a property


class DisplayArea extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      color               : "green",
      delay               : ""
    }
    this._setDelay = this._setDelay.bind(this)
  }

  doAjaxRequest() {
    $.ajax({
      url: marketStreetTestUrl,
      dataType: "jsonp",
    })
    .done((busData) => {

      let nextArrival       = busData.data.entry.arrivalsAndDepartures[0];
      let delayedBy         = nextArrival.tripStatus.scheduleDeviation;
      let predictedArrival  = nextArrival.predictedArrivalTime;

      let now     = new Date();
      let busDate = new Date(predictedArrival);

      let nowYear = now.getFullYear();
      let nowHours = now.getHours();
      let nowMinutes = now.getMinutes();
      let nowSeconds = now.getSeconds();

      let busYear = busDate.getFullYear();
      let busHours = busDate.getHours();
      let busMinutes = busDate.getMinutes();
      let busSeconds = busDate.getSeconds();


      // console.log("Now date info: " + nowYear + " " + nowHours + " " + nowMinutes + " " + nowSeconds)
      //
      // console.log("Bus date info: " +  + busYear + " " + busHours + " " + busMinutes + " " + busSeconds)

      let timeToStopFn = () => {
        if (nowYear === busYear) {
          let compMinutes = busMinutes - nowMinutes;
          let compSeconds = busSeconds - nowSeconds;
          if (compSeconds < 0) {
            compMinutes -= 1;
            compSeconds += 60;
          }
          // if (compMinutes < 0) {
          //   compMinutes += 60;
          // }
          // console.log("Comp Minutes : " + compMinutes)
          return compMinutes + " minutes and " + compSeconds + " seconds";
        }
      }

      let timeToStop = (timeToStopFn());

      this.setState(this._setDelay(delayedBy, timeToStop));
      console.log(this.state)




      // console.log("Full data:")
      // console.log(nextArrival)





    })
    .fail(function(error) {
      console.log(error);
    })
  }


  _setDelay(delay, timeToStop) {
    // delayedBy = 200
    // console.log("set delay called")
    // console.log("delayed by: " + delay)
    if (delay >= 0 && delay < 120) {
      return {
        color: "onTime-bg-color",
        delay: "On Time",
        delayedBy: Math.round(delay / 60),
        timeToStop: timeToStop
      }
    } else if (delay > 120 && delay < 300) {
      return {
        color: "littleLate-bg-color",
        delay: "A Little Late",
        delayedBy: Math.round(delay / 60),
        timeToStop: timeToStop
      }
    } else if (delay > 300 && delay < 999) {
      return {
        color: "late-bg-color",
        delay: "Late",
        delayedBy: Math.round(delay / 60),
        timeToStop: timeToStop
      }
    } else if (delay > 1000) {
      return {
        color: "veryLate-bg-color",
        delay: "Very Late!",
        delayedBy: Math.round(delay / 60),
        timeToStop: timeToStop
      }
    } else if (delay < 0) {
      return {
        color: "early-bg-color",
        delay: "Early!",
        delayedBy: Math.round(delay / 60),
        timeToStop: timeToStop
      }
    }
  }






  reactMarketApi() {


    runRecursive = false;
    runRecursive = true;

    let runAjax = () => {

      this.doAjaxRequest();

      if (runRecursive === true) {
        // Recurse
        setTimeout(() => {
          runAjax();
        }, 1000)
      }
    }

    runAjax();

  }

  killRecursive() {
    console.log("Recursion killed");
    runRecursive = false;
  }


  render() {

    return(
      <div className={"displayArea" + " " + this.state.color} >
        <JumboTron delay={this.state.delay} timeToStop={this.state.timeToStop} delayedBy={this.state.delayedBy}/>
        <BusAnim />
        <Button name="Kill Recursion" class="topButton" clickFunc={this.killRecursive.bind(this)} />
        <Button name="Is the D on time?" clickFunc={this.reactMarketApi.bind(this)}/>
        <Dropdown listContent={listItems}/>
      </div>
    )
  }
}

export default DisplayArea;
