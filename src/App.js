import "./App.css";
import { HeaderMain } from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import { Testing } from "./webpage";
import { AboutUs } from "./components/AboutUsPage/AboutUs";
import { HomePage } from "./components/HomePage/HomePage";
import { ContactUs } from "./webpage/ContactUs";
import { AlertBox, LoaderBox, showAlert } from "./components/AlertLoader";
import { ArticleDisplay } from "./components/HomePage/TempleDescription";
import { Login, Signin } from "./components/LoginSignin";
import { MoreDescriptionDiv } from "./components/DisplayInfo/MoreDescription";
import { ArticleMainSection } from "./components/Articles/ArticleMainSection";
import "./i18n";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setGlobalWholeDetail,
  setLngLogo,
  setGuthiSansthanLogo,
} from "./state/GlobalSlice";
import { fetchImageToURL } from "./components/ReuseableFunctions";
import { ArticleAddition } from "./components/Articles/ArticleAddition/ArticleAddition";
import { NoticeAddition } from "./components/Articles/ArticleAddition/NoticeAddition";
import { ShowArticle } from "./components/Articles/ArticleSection/ShowArticle";
import { ShowNotice } from "./components/Articles/NoticeSection/ShowNotice";
import NoticeForm from "./components/Articles/NoticeSection/NoticeForm";
import Popup from "./components/HomePage/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import EmployeeDetailsMain from "./components/EmployeeDetails/EmployeeDetailsMain";
import { ConfirmBox } from "./components/AlertLoader/ConfirmBox";
import { useEditing } from "./context/EditingProvider";
import { BranchMainPage } from "./components/BranchPage/BranchMainPage";
import { EachBranchInfo } from "./components/BranchPage/BranchComponents/EachBranchInfo";
import Report from "./components/HomePage/HomePageFooter/Report/Report";
import { ProfileSection } from "./components/User/Profile/ProfileSection";
import { SettingMainPage } from "./components/User/Setting/SettingMainPage";
import Darbandi from "./components/Darbandi/Darbandi";
import Headquarters from "./components/Headquaters/Headquaters";
import { InstanceNotice } from "./components/Articles/NoticeSection/InstanceNotice";
import AdminForm from "./components/AdminForm/AdminForm";
import JatraMandir from "./components/JataraMandir/JatraMandir";
import { AddTeam } from "./components/HomePage/HomePageFooter/Teams/AddTeam";
import InstantTeam from "./components/HomePage/HomePageFooter/Teams/InstantTeam";
import { Teams } from "./components/HomePage/HomePageFooter/Teams/Teams";
import Add from "./webpage/Contact US/EditLocation";

import Law from "./components/Articles/Law/InstanceLaw";
import Download from "./components/Articles/Download/Download";
import Budget from "./components/Articles/Budget/Budget";


function App() {
  const location = useLocation();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const globalDetail = useSelector((state) => state.globalDetail);
  const { isEditing, setIsEditing } = useEditing();
  const dispact = useDispatch();
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await axios.get(baseUrl + globalDetail.url);
        dispact(setGlobalWholeDetail(response.data));
        dispact(
          setGuthiSansthanLogo({
            imgSrc: baseUrl + response.data["guthi-sansthan-logo"].image,
            id: response.data["guthi-sansthan-logo"].id,
          })
        );
        const lngLogo = {};
        await Promise.all(
          Object.entries(response.data["lng-logo"]).map(
            async ([key, value]) => {
              lngLogo[key.split("-")[0]] = baseUrl + value.image.substr(1);
            }
          )
        );
        dispact(setLngLogo(lngLogo));
      } catch (error) {
        console.log(error);
        showAlert(error, "red");
      }
    };
    if (!globalDetail.isFetched) fetchGlobalData();
    setPopup(true);
  }, []);
  const [popup, setPopup] = useState(false);

  return (
    <div className={`App relative ${location.pathname === "" ? "" : ""}`}>
      <ConfirmBox />
      <AlertBox />
      <LoaderBox />
      <ArticleDisplay />
      <MoreDescriptionDiv />
      {popup && <Popup />}
      <HeaderMain />
      <div
        className={`${location.pathname === "/" ? "" : "mb-[100px]"} h-full `}
      >
        <Routes>
          <Route path="/testing" element={<Testing />} />
          <Route path="" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signin />} />
          <Route path="/articles" element={<ArticleMainSection />} />
          <Route path="/show-notice" element={<ShowNotice />} />

          <Route path="/show-article" element={<ShowArticle />} />
          <Route path="/jatra-parva" element={<JatraMandir />} />
          <Route path="/report" element={<Report />} />
          <Route path="/headquaters" element={<Headquarters />} />
          <Route path="/admin-form" element={<AdminForm />} />
          <Route path="/employee-details" element={<EmployeeDetailsMain />} />
          <Route path="/branches" element={<BranchMainPage />} />
          <Route path="/branche-full-info" element={<EachBranchInfo />} />
          <Route path="/addteam" element={<Teams />} />

          <Route path="/addcontact" element={<Add />} />
          <Route path="/law" element={<Law />} />
          <Route path="/download" element={<Download />} />
          <Route path="/budget" element={<Budget />} />
          
          <>
            <Route
              path="/super-user/add-articles"
              element={<ArticleAddition />}
            />
            <Route path="/super-user/add-notices" element={<NoticeForm />} />
          </>

          <>
            <Route path="/user/profile" element={<ProfileSection />} />
            <Route path="/user/setting" element={<SettingMainPage />} />
            <Route path="/darbandi" element={<Darbandi />} />
    
          </>
        </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
