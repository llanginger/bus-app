import React from "react";
import BusAnim from "./BusAnim";
import Button from "./Button";
import JumboTron from "./JumboTron";
import classNames from "classnames";
import $ from "jQuery"


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

var oneBusUrl = OneBusApi.baseUrl + OneBusApi.route + OneBusApi.D_LINE_ID + ".json" + OneBusApi.key + "&includeStatus=true";

var marketStreetTestUrl = OneBusApi.baseUrl + OneBusApi.arrivalsDeparturesForStop + marketStop.id + ".json" + OneBusApi.key


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
        timeToStop: timeToStop
      }
    } else if (delay > 120) {
      return {
        color: "littleLate-bg-color",
        delay: "A Little Late",
        timeToStop: timeToStop
      }
    } else if (delay > 300) {
      return {
        color: "late-bg-color",
        delay: "Late",
        timeToStop: timeToStop
      }
    } else if (delay > 1000) {
      return {
        color: "varyLate-bg-color",
        delay: "On Time",
        timeToStop: timeToStop
      }
    } else if (delay < 0) {
      return {
        color: "early-bg-color",
        delay: "Early!",
        timeToStop: timeToStop
      }
    }
  }

  clickFunction() {
    console.log("clickfunction clicked");
  }



  reactMarketApi() {

    runRecursive = false;
    runRecursive = true;

    let recCall = () => {
      setTimeout(() => {
        $.ajax({
          url: marketStreetTestUrl,
          dataType: "jsonp",
        })
        .done((busData) => {
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



          $(".box-text").text("Bus is delayed by: " + Math.round(delayedBy / 60) + " minutes");
          console.log("Complete data:")
          console.log(nextArrival)
          console.log("Delayed by: " + delayedBy / 60 + " minutes")

          console.log("----------------------")
          console.log(delayedBy)

          // var recSetState

          var hi = () => {console.log("hi")}

          hi();


          this.setState(this.setDelay(delayedBy, formattedTimeToStop));
          console.log(this.state)

          if (runRecursive === true) {
            recCall();
          }

          // this.setState(this.setDelay(delayedBy, formattedTimeToStop));
          // console.log(this.state)
          // console.log(this.state)

        })
        .fail(function() {
          console.log("error");
        })
      }, 1000)

    }

    recCall()
  }

  killRecursive() {
    console.log("Recursion killed");
    runRecursive = false;
  }

  setRed() {
    console.log(this.state.color)
    if (this.state.color === "green") {
      return this.setState({color: "red"})
    } else {
      return this.setState({color: "green"})
    }

  }

  render() {
    // var daClass = classNames({
    //   "displayArea": true,
    //   this.state.color: this.state.color
    // })
    return(
      <div className={"displayArea" + " " + this.state.color} >
        <JumboTron delay={this.state.delay} timeToStop={this.state.timeToStop}/>
        <BusAnim />
        <Button name="Kill Recursion" clickFunc={this.killRecursive.bind(this)} />
        <Button name="Is the D on time?" clickFunc={this.reactMarketApi.bind(this)}/>
      </div>
    )
  }
}

export default DisplayArea;
