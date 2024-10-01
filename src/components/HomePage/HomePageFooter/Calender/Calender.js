import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import img from "../../../../media/DonationPage/5.png";
import { useEditing } from "../../../../context/EditingProvider";
import AddJatraParva from "./AddJatraParva";
export const Calendar = () => {
  const [calendarData, setCalendarData] = useState(null);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [today, setToday] = useState(null);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const { isEditing } = useEditing();
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
          `${baseUrl}api/calendar/?year=2081&month=5`
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
        `${baseUrl}api/calendar/?year=${fetchYear}&month=${fetchMonth}`
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
        <div key={`empty-${i}`} className="py-2 text-center border-2"></div>
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
      <div className="grid grid-cols-7 gap-2 p-3 md:gap-4 md:p-6">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="py-1 text-sm font-semibold text-center border-2 rounded-md md:text-lg border-cyan-400 bg-slate-200"
          >
            {day.slice(0, 3)}
          </div>
        ))}
        {calendarGrid}
      </div>
    );
  };

  // Filter upcoming holidays
  const renderUpcomingHolidays = () => {
    if (!calendarData) return null;

    const upcomingFestivals = calendarData.festivals.filter((festival) => {
      const startDate = new Date(festival.start_date).getDate();
      return startDate >= today;
    });

    if (upcomingFestivals.length === 0) {
      return <p>No upcoming holidays this month.</p>;
    }

    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Upcoming Holidays:</h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          {upcomingFestivals.map((festival, index) => {
            const startDate = new Date(festival.start_date).getDate();
            const daysLeft = startDate - today;

            return (
              <li key={index} className="text-sm">
                <strong>{festival.name}</strong> - {festival.start_date}
                {daysLeft >= 0 ? (
                  <span className="ml-2 text-gray-500">
                    ({daysLeft} days left)
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const [isJatraOpen, setJatraOpen] = useState(false);
  return (
    <div className="flex flex-col items-start justify-center min-h-screen py-4 bg-gray-100/10 md:items-center">
      {isEditing && (
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => {
              setJatraOpen(true);
            }}
            className="bg-green-700 hover:bg-green-800 rounded-md px-3 py-1"
          >
            Add Jatra/Parva
          </button>
        </div>
      )}
      {isJatraOpen && <AddJatraParva setJatraOpen={setJatraOpen} />}
      <div className="flex flex-wrap items-start justify-center w-full p-4 mx-auto md:w-3/4 lg:w-2/3">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full md:w-1/2  flex flex-col">
          <img src={img} className="w-full" />
          <div className="flex items-center justify-between px-6 py-3 bg-cyan-600">
            <div>
              <FontAwesomeIcon
                size="2x"
                icon={faArrowLeft}
                className="text-white cursor-pointer"
                onClick={handlePrev}
              />
            </div>
            <div className="flex gap-3">
              <h2 className="text-lg text-white">{year}</h2>
              <h2 className="text-lg text-white">{nepaliMonth[month]}</h2>
            </div>
            <div>
              <FontAwesomeIcon
                size="2x"
                icon={faArrowRight}
                className="text-white cursor-pointer"
                onClick={handleNext}
              />
            </div>
          </div>
          {error && (
            <div className="py-2 text-center text-red-500">{error}</div>
          )}
          {renderCalendar()}
        </div>

        <div className="flex flex-col items-center justify-start w-full h-[100%] mt-4 md:w-1/2 p-4 text-gray-800 bg-white shadow-xl rounded-lg">
          {selectedEvent && (
            <>
              <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
              <img
                src={`${selectedEvent.image}`}
                alt={selectedEvent.name}
                className="w-1/2 h-auto mt-4 rounded-lg shadow"
              />
              <p className="mt-2 text-sm">{selectedEvent.description}</p>
            </>
          )}

          {renderUpcomingHolidays()}
        </div>
      </div>
    </div>
  );
};
