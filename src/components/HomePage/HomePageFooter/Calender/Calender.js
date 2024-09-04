import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Calendar = () => {
  const [calendarData, setCalendarData] = useState(null);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [today, setToday] = useState(null);

  const nepaliMonth = [
    "",
    "Baisakh",
    "Jestha",
    "Ashad",
    "Shrawan",
    "Bhadra",
    "Asoj",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          `https://ingnepal.org.np/api/calendar/?year=2081&month=5`
        );
        const data = response.data;
        const [todayYear, todayMonth, todayDay] = data.today
          .split("/")
          .map(Number);
        setYear(todayYear);
        setMonth(todayMonth);
        setToday(todayDay);
        fetchCalendarData(todayYear, todayMonth);
      } catch (error) {
        setError("Error fetching initial calendar data");
      }
    };

    fetchInitialData();
  }, []);

  const handlePrev = async () => {
    if (month === 1) {
      setMonth(12);
      setYear((prevYear) => {
        const newYear = prevYear - 1;
        fetchCalendarData(newYear, 12);
        return newYear;
      });
    } else {
      const newMonth = month - 1;
      setMonth(newMonth);
      fetchCalendarData(year, newMonth);
    }
  };

  const handleNext = async () => {
    if (month === 12) {
      setMonth(1);
      setYear((prevYear) => {
        const newYear = prevYear + 1;
        fetchCalendarData(newYear, 1);
        return newYear;
      });
    } else {
      const newMonth = month + 1;
      setMonth(newMonth);
      fetchCalendarData(year, newMonth);
    }
  };

  const fetchCalendarData = async (fetchYear, fetchMonth) => {
    try {
      const response = await axios.get(
        `https://ingnepal.org.np/api/calendar/?year=${fetchYear}&month=${fetchMonth}`
      );
      setCalendarData(response.data);
    } catch (error) {
      setError("Error fetching calendar data");
    }
  };

  const handleDateClick = (day) => {
    const event = calendarData.festivals.find((festival) => {
      const startDate = new Date(festival.start_date).getDate();
      const endDate = new Date(festival.end_date).getDate();
      return day >= startDate && day <= endDate;
    });

    if (event) {
      setSelectedEvent(event);
    } else {
      setSelectedEvent(null);
    }
  };

  const renderCalendar = () => {
    if (!calendarData) return null;

    const daysInMonth = calendarData.max_days;
    const startDay = calendarData.start;
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const startDayIndex = daysOfWeek.indexOf(startDay);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const eventDates = {};
    calendarData.festivals.forEach((event) => {
      const startDate = new Date(event.start_date).getDate();
      const endDate = new Date(event.end_date).getDate();
      for (let date = startDate; date <= endDate; date++) {
        eventDates[date] = true;
      }
    });

    const calendarGrid = [];
    for (let i = 0; i < startDayIndex; i++) {
      calendarGrid.push(
        <div key={`empty-${i}`} className="py-2 text-center border-2 "></div>
      );
    }

    daysArray.forEach((day) => {
      calendarGrid.push(
        <div
          key={day}
          className={`text-center py-1 border border-black bg-white hover:bg-cyan-200 rounded-md cursor-pointer ${
            eventDates[day] ? "text-red-600 font-bold" : ""
          } ${day === today ? "bg-yellow-300" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    });

    return (
      <div className="grid grid-cols-7 gap-2 p-3 md:gap-3 md:p-4 ">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="py-1 text-sm font-semibold text-center border-2 rounded-md md:text-lg border-cyan-400 backdrop-blur-lg"
        >
          {day.slice(0, 3)}
        </div>
      ))}
      {calendarGrid}
    </div>
    
    );
  };

  return (
    <div className="flex items-start justify-center h-screen py-1 bg-zinc-600/15 backdrop-blur-sm md:items-center">
      <div className="flex flex-wrap items-start justify-center w-full p-4 mx-auto overflow-auto">
        <div className="bg-neutral-200 shadow-lg rounded-lg overflow-hidden w-[90%] text-black font-bold flex md:w-1/2 h-96 flex-col">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-700/50">
            <div>
              <FontAwesomeIcon
                size="2x"
                icon={faArrowLeft}
                onClick={handlePrev}
              />
            </div>
            <div className="flex gap-3">
              <h2 className="text-white">{year}</h2>
              <h2 className="text-white">{nepaliMonth[month]}</h2>
            </div>
            <div>
              <FontAwesomeIcon
                size="2x"
                icon={faArrowRight}
                onClick={handleNext}
              />
            </div>
          </div>
          {error && (
            <div className="py-2 text-center text-red-500">{error}</div>
          )}
          {renderCalendar()}
        </div>
        {selectedEvent && (
          <div className="flex flex-col items-center justify-start w-full p-2 mt-4 overflow-auto text-white bg-gray-800 rounded-lg h-96 aspect-video md:w-96">
            <h3 className="text-lg font-bold">{selectedEvent.name}</h3>
            <img
              src={`${selectedEvent.image}`}
              alt={selectedEvent.name}
              className="w-1/2 h-auto mt-2"
            />
            <p className="mt-2 leading-tight tracking-tighter">
              {selectedEvent.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
