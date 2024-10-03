import React, { useRef } from "react";
import bgImage from "../../media/LoginSignin/rectangle.png";
import nepalLandmark from "../../media/LoginSignin/nepalLandmark.png";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export const Login = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const { t } = useTranslation();
  const userRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  const handleSubmit = async () => {
    const username = userRef.current.value.trim();
    const password = passRef.current.value.trim();

    if (!username || !password) {
      toast.error("You haven't filled all data yet");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(baseUrl + "api/login/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      sessionStorage.setItem("token", result.token);
      console.log("token", result.token);
      console.log(result);
      sessionStorage.setItem("username", result.username);
      sessionStorage.setItem("email", result.email);
      sessionStorage.setItem("firstname", result.first_name);
      sessionStorage.setItem("lastname", result.last_name);
      sessionStorage.setItem("superUser", result.is_superuser);

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Invalid username or password");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      handleSubmit();
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="fixed h-screen w-screen -z-10 top-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className={`${
            isMobile ? "" : "h-[80vh]"
          } flex items-center justify-center gap-5 flex-col md:flex-row lg:flex-row`}
        >
          <div className={`${isMobile ? "w-[200px]" : "w-[500px]"}`}>
            <img src={nepalLandmark} alt="Nepal Landmark" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-white flex items-center justify-center">
              <h1 className="text-yellow-400 text-5xl mb-6 border-b-2 border-red-500">
                Welcome Back!
              </h1>
            </div>
            <div className="flex flex-col text-white">
              <div>
                <label className="items-start justify-start">Username</label>
              </div>
              <div>
                <input
                  ref={userRef}
                  type="text"
                  className="text-black w-[350px] h-10 rounded border  focus:outline-cyan-600"
                  onKeyDown={handleKeyDown} // Add keyDown event handler
                />
              </div>
              <div>
                <label>Password</label>
              </div>
              <div>
                <input
                  ref={passRef}
                  type="password"
                  className="text-black w-[350px] h-10 rounded focus:outline-cyan-600"
                  onKeyDown={handleKeyDown} // Add keyDown event handler
                />
              </div>
              <br />
              <div className="w-full items-center justify-center flex">
                <div className="bg-zinc-800 h-[1px] w-1/3"></div>
                <div className="mx-3 text-white"> Or</div>
                <div className="bg-zinc-800 h-[1px] w-1/3"></div>
              </div>
              <div className="items-end justify-end">
                <button
                  onClick={handleSubmit}
                  className="rounded-full px-4 py-1 font-bold text-white bg-cyan-500 font-abc text-align-center mt-2"
                >
                  <h5>{t("log-in")}</h5>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
