import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import img from "../../../../media/DonationPage/5.png";
import { useEditing } from "../../../../context/EditingProvider";
import AddJatraParva from "./AddJatraParva";
import Modal from "react-modal";
import ParvaDetails from "./ParvaDetails";
import { Link, useNavigate } from "react-router-dom";

export const Calendar = () => {
  const [calendarData, setCalendarData] = useState(null);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [today, setToday] = useState(null); // Store today's date object
  const [isModalOpen, setIsModalOpen] = useState(false);
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

        // Set today with the format from the API (for comparison)
        const [todayYear, todayMonth, todayDay] = data.today
          .split("/")
          .map(Number);
        setYear(todayYear);
        setMonth(todayMonth);
        setToday({ year: todayYear, month: todayMonth, day: todayDay });

        fetchCalendarData(todayYear, todayMonth);
      } catch (error) {
        setError("Error fetching initial calendar data");
      }
    };

    fetchInitialData();
  }, []);

  const handlePrev = () => {
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

  const handleNext = () => {
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
      setIsModalOpen(true); // Open modal when event is clicked
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
      const isToday =
        today &&
        day === today.day &&
        month === today.month &&
        year === today.year;
      const isFestival = eventDates[day];

      calendarGrid.push(
        <div
          key={day}
          className={`text-center py-1 border border-black rounded-md cursor-pointer ${
            isFestival ? "bg-red-200 text-red-600 font-bold" : ""
          } ${isToday ? "bg-yellow-300" : ""} hover:bg-cyan-200`}
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
            className="px-1 text-sm font-semibold text-center border-2 rounded-md md:text-lg border-cyan-400 bg-slate-200"
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
      return startDate >= today.day;
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
            const daysLeft = startDate - today.day;

            return (
              <li
                key={index}
                className="text-sm cursor-pointer"
                onClick={() => handleDateClick(startDate)}
              >
                <strong className="font-semibold text-white text-sm ">
                  ({startDate})-
                  <span className="text-black text-lg font-abc">
                    {festival.name}
                  </span>
                </strong>
                {daysLeft >= 0 ? (
                  <span className="ml-2 text-zinc-800">
                    ({daysLeft} days left)
                  </span>
                ) : null}
                <br></br>
                <span>{festival.description}</span>
                {festival.parva.map((item) => (
                  <li>{item.name}</li>
                ))}
                <br></br>
                <Link to={"/jatra-parva"} className="">
                  see more..
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const [isJatraOpen, setJatraOpen] = useState(false);
  const [parvaDetails, setParvaDetails] = useState(false);
  return (
    <div className="flex flex-col items-start justify-center min-h-screen py-4 bg-gray-100/10 md:items-center">
      {isEditing && (
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => {
              setJatraOpen(true);
            }}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md px-3 py-1"
          >
            Add Jatra/Parva
          </button>
        </div>
      )}
      {isJatraOpen && <AddJatraParva setJatraOpen={setJatraOpen} />}
      <div className="flex flex-wrap items-start justify-start w-full  p-4 mx-auto gap-3">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full md:w-1/3  flex flex-wrap ">
          <img src={img} className="w-full" />
          <div className="flex items-center w-full justify-between px-6 py-3 bg-cyan-600">
            <div>
              <FontAwesomeIcon
                size="2x"
                icon={faArrowLeft}
                className="text-white cursor-pointer"
                onClick={handlePrev}
              />
            </div>
            <div className="flex gap-3">
              <h2 className="text-white font-semibold text-lg">{year}</h2>
              <h2 className="text-white font-semibold text-lg">
                {nepaliMonth[month]}
              </h2>
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
          {renderCalendar()}
        </div>

        <div className="w-full md:w-1/2 rounded-md bg-zinc-600/30 backdrop-blur-sm">
          {renderUpcomingHolidays()}
        </div>
      </div>
      <button
        onClick={() => {
          setParvaDetails(!parvaDetails);
        }}
        className={`${
          parvaDetails
            ? "bg-red-700 hover:bg-red-800"
            : "bg-green-700 hover:bg-green-800"
        } text-white font-semibold rounded-md px-3 py-1`}
      >
        {parvaDetails ? "cancel" : " veiw Parva Details"}
      </button>
      {parvaDetails && <ParvaDetails festival={calendarData} />}
      {/* Modal for showing event description */}
      {selectedEvent && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Event Description"
          className="modal"
          overlayClassName="overlay"
        >
          <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
          <p className="mt-2">{selectedEvent.description}</p>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-md"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};
