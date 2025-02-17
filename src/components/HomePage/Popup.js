import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const Popup = () => {
  const [notices, setNotices] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const popupRef = useRef(null);

  useEffect(() => {
    fetch(`${baseUrl}api/notices/`)
      .then((res) => res.json())
      .then((data) => {
        const popupNotices = data.filter((notice) => notice.display_popup);
        setNotices(popupNotices);
        setIsOpen(popupNotices.length > 0);
      })
      .catch((err) => console.error("Error fetching notices:", err));
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  // If only one notice, disable infinite loop & dots
  const sliderSettings = {
    dots: notices.length > 1,
    infinite: notices.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-2xl flex justify-center items-center z-50">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative animate-fadeIn min-h-[250px] flex flex-col justify-center"
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          ✕
        </button>

        {/* Notice Slider */}
        {notices.length > 1 ? (
          <Slider {...sliderSettings}>
            {notices.map((notice) => (
              <div key={notice.id} className="text-center p-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {notice.title}
                </h2>
                <p className="text-gray-700 mt-2">{notice.text}</p>
                {notice.image && (
                  <a
                    href={notice.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={notice.image}
                      alt="Notice"
                      className="w-full max-h-64 object-cover mt-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                    />
                  </a>
                )}
              </div>
            ))}
          </Slider>
        ) : (
          // When only 1 notice, show it directly (no slider)
          notices.length === 1 && (
            <div className="text-center p-4">
              <h2 className="text-xl font-bold text-gray-900">
                {notices[0].title}
              </h2>
              <p className="text-gray-700 mt-2">{notices[0].text}</p>
              {notices[0].image && (
                <a
                  href={notices[0].image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={notices[0].image}
                    alt="Notice"
                    className="w-full max-h-64 object-cover mt-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                  />
                </a>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Popup;
