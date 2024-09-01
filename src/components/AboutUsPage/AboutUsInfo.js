import React, { useState, useEffect } from "react";
import InstanceAboutUs from "./InstanceAboutUs";

const AboutUsInfo = () => {
  const [aboutUsData, setAboutUsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ingnepal.org.np/api/about-us/");
        const data = await response.json();
        setAboutUsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRemove = (id) => {
    // Assuming there's an API endpoint to delete an item
    fetch(`https://ingnepal.org.np/api/about-us/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setAboutUsData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
        } else {
          console.error("Error deleting item");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex px-3 gap-4 lg:gap-12 justify-evenly flex-wrap">
      {aboutUsData.map((item) => (
        <InstanceAboutUs
          key={item.id}
          img={item.image}
          title={item.title} // Adjust this if you want to show a different language
          text={item.text}
          id={item.id} // Adjust this if you want to show a different language
          onRemove={() => handleRemove(item.id)}
        />
      ))}
    </div>
  );
};

export default AboutUsInfo;
