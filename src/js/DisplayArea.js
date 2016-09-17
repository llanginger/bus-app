import React from "react";
import BusAnim from "./BusAnim";
import Button from "./Button";
import JumboTron from "./JumboTron";
import classNames from "classnames";
import $ from "jQuery";
import Dropdown from "./Dropdown";


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

class DisplayArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color               : "green",
      delay               : ""
    }
  }

  setDelay(delay, timeToStop) {
    // delayedBy = 200
    console.log("set delay called")
    if (delay >= 0) {
      return {
        color: "onTime-bg-color",
        delay: "On Time",
        delayedBy: delay,
        timeToStop: timeToStop
      }
    } else if (delay > 120) {
      return {
        color: "littleLate-bg-color",
        delay: "A Little Late",
        delayedBy: delay,
        timeToStop: timeToStop
      }
    } else if (delay > 300) {
      return {
        color: "late-bg-color",
        delay: "Late",
        delayedBy: delay,
        timeToStop: timeToStop
      }
    } else if (delay > 1000) {
      return {
        color: "varyLate-bg-color",
        delay: "On Time",
        delayedBy: delay,
        timeToStop: timeToStop
      }
    } else if (delay < 0) {
      return {
        color: "early-bg-color",
        delay: "Early!",
        delayedBy: delay,
        timeToStop: timeToStop
      }
    }
  }


  reactMarketApi() {

    runRecursive = false;
    runRecursive = true;

    let recCall = () => {
      $.ajax({
        url: marketStreetTestUrl,
        dataType: "jsonp",
      })
      .done((busData) => {
        // console.log(marketStreetTestUrl);
        // console.log(busData);

        // TODO Figure out why this date stuff isn't working! (It's because it should be figuring out the difference and only presenting minutes instead of a full time!!)

        let nextArrival       = busData.data.entry.arrivalsAndDepartures[0];
        let delayedBy         = nextArrival.tripStatus.scheduleDeviation;
        let predictedArrival  = nextArrival.predictedArrivalTime;

        let now     = new Date();
        let busDate = new Date(predictedArrival);

        console.log("Full data:")
        console.log(nextArrival)

        console.log("----------------------------")

        console.log("Now: " + now)
        console.log("Predicted Arrival: " + busDate)

        let nowHours = now.getHours();
        let nowMinutes = now.getMinutes();
        let nowSeconds = now.getSeconds();

        let busHours = busDate.getHours();
        let busMinutes = busDate.getMinutes();
        let busSeconds = busDate.getSeconds();

        // console.log("testing new time formatting")
        // console.log((busHours - nowHours) + " Hours and " + (busMinutes - nowMinutes) + " Minutes and " + (busSeconds - nowSeconds) + " Seconds away")






        let timeToStop = ((busDate - now)/1000);

        // let hours     =       timeToStop.getHours();
        // let minutes   = "0" + timeToStop.getMinutes();
        // let seconds   = "0" + timeToStop.getSeconds();
        //
        // var formattedTimeToStop = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

        // console.log(formattedTimeToStop);



        $(".box-text").text("Bus is delayed by: " + Math.round(delayedBy / 60) + " minutes");

        console.log("Delayed by: " + delayedBy / 60 + " minutes")

        console.log("----------------------")
        console.log(delayedBy)


        this.setState(this.setDelay(delayedBy, timeToStop));
        console.log(this.state)

        if (runRecursive === true) {
          // Recurse
          setTimeout(() => {
            recCall();
          }, 1000)
        }


      })
      .fail(function() {
        console.log("error");
      })
    }

    recCall()
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
