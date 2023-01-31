import { useEffect, useState } from "react";
import { getStockEvents } from "../utils/api";
import moment from "moment";
import { easeBack } from "d3";

const StockCalendar = ({ticker}) => {
  
  const [calendar, setCalendar] = useState([]);
  useEffect(() => {

    getStockEvents(ticker).then((response) => {
      const eventsArr = response.map((arr) => {
        return arr[2];
      });

      setCalendar(eventsArr);
    });
  }, []);

  return (
    <div className="calendar">
      {calendar.map((event, index) => {
        if (index === 1) {
          const earningsDate = new Date(event);
          const momentEarning = moment(earningsDate);
          const daysUntilEarnings = momentEarning.diff(
            moment().startOf("day"),
            "days"
          );
          return (
            <div className="upcoming-earnings">
              <h2
                className={daysUntilEarnings <= 10 ? "upcoming-event" : "event"}
              >
                In {daysUntilEarnings} days <br></br>
                <span
                  style={{
                    display: "inline",
                    fontWeight: "normal",
                    fontSize: "0.7em",
                    color: "gray",
                  }}
                >
                  UPCOMING EARNINGS
                </span>
              </h2>
            </div>
          );
        }
      })}
    </div>
  );
};

export default StockCalendar;
