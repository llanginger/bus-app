import React from "react";
import BusAnim from "./BusAnim";
import Button from "./Button";
import JumboTron from "./JumboTron";
import classNames from "classnames";
import $ from "jQuery";
import Dropdown from "./Dropdown";
import AjaxDropdown from "./AjaxDropdown";


if (typeof window !== 'undefined') {
  window.React = React;
}

var timeToStop;

var params = {};

const myPos = {
  lat   : "47.668674",
  lon   : "-122.376324"
}

const marketStop = {
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

const OneBusApi = {
  baseUrl     : "http://api.pugetsound.onebusaway.org/api/where/",
  allRoutes   : "route-ids-for-agency/1",
  arrivalsDeparturesForStop : "arrivals-and-departures-for-stop/",
  route       : "trips-for-route/",
  key         : "?key=4f368d44-acaf-4922-8930-12a607f4ef44",
  D_LINE_ID   : "1_102581"
}


const oneBusUrl = OneBusApi.baseUrl + OneBusApi.route + OneBusApi.D_LINE_ID + ".json" + OneBusApi.key + "&includeStatus=true";

const marketStreetTestUrl = OneBusApi.baseUrl + OneBusApi.arrivalsDeparturesForStop + marketStop.id + ".json" + OneBusApi.key


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

      let nowDate     = new Date();
      let busDate     = new Date(predictedArrival);

      let now = {
        year    : nowDate.getFullYear(),
        hours   : nowDate.getHours(),
        minutes : nowDate.getMinutes(),
        seconds : nowDate.getSeconds(),
      }

      let bus = {
        year    : busDate.getFullYear(),
        hours   : busDate.getHours(),
        minutes : busDate.getMinutes(),
        seconds : busDate.getSeconds(),
      }

      // console.log("Now date info: " + now.year + " " + now.hours + " " + now.minutes + " " + now.seconds)
      //
      // console.log("Bus date info: " +  + bus.year + " " + bus.hours + " " + bus.minutes + " " + bus.seconds)

      let timeToStopFn = () => {
        if (now.year === bus.year) {
          let compMinutes = bus.minutes - now.minutes;
          let compSeconds = bus.seconds - now.seconds;
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


    })
    .fail(function(error) {
      console.log(error);
    })
  }


  _setDelay(delay, timeToStop) {
    console.log("delayed by: " + delay)
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

    const runAjax = () => {

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
        <AjaxDropdown ajaxUrl={"http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=TEST&lat=47.653435&lon=-122.305641&radius=200"} />
        <JumboTron delay={this.state.delay} timeToStop={this.state.timeToStop} delayedBy={this.state.delayedBy}/>
        <BusAnim />
        <Button name="Kill Recursion" class="topButton" clickFunc={this.killRecursive.bind(this)} />
        <Button name="Is the D on time?" clickFunc={this.reactMarketApi.bind(this)}/>
      </div>
    )
  }
}

export default DisplayArea;
