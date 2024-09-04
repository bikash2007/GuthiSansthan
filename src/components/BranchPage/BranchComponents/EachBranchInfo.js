import { useState } from "react";
import { BranchArticles } from "./BranchArticles";
import { BranchFestival } from "./BranchFestival";
import { BranchHeader } from "./BranchHeader";
import { BranchNotice } from "./BranchNotice";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import BranchTeams from "../BranchTeams/BranchTeams";
import Raitani from './LandDetails/Raitani/Raitani'
import Adhinash from './LandDetails/Adhinasth/Adhinasth'
import Tainathi from './LandDetails/Tainathi/Tainathi';

import BudgetKharcha from "./BudgetKharcha/BudgetKharcha";
import BudgetNikasa from "./BudgetNikasa/BudgetNikasa";
import SuchiDarta from "./SuchiDarta";
import Landdetails from "./LandDetails/Landdetails";
import Darbandi from "./Darbandi/Darbandi";
import { useEditing } from "../../../context/EditingProvider";

export const EachBranchInfo = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [activeComponent, setActiveComponent] = useState(null);
  const [section, setSection] = useState("article");
  const loc = useLocation();
  const { isEditing } = useEditing();
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="absolute top-0 w-full h-20 "></div>
      <BranchHeader
        branchDetails={loc.state.branchDetails}
        branchName={loc.state.name}
        branchImg={loc.state.img}
        branchHead={loc.state.branchHead}
        branchId={loc.state.branchId}
      />
      <div className="w-full">
        <div
          style={{ background: "linear-gradient(135deg, #001f3f,#00ffff)" }}
          className={`w-full py-4 flex ${
            isMobile ? "justify-evenly" : "justify-start gap-8 pl-16"
          } text-cyan-400 shadow-sm blur-border flex-wrap`}
        >
          <button
            onClick={() => setSection("article")}
            className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
              section === "article" ? "border-red-600" : "border-none"
            } `}
          >
            लेखहरू
          </button>
          <button
            onClick={() => setSection("notice")}
            className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
              section === "notice" ? "border-red-600" : "border-none"
            } `}
          >
            सूचना
          </button>
          <button
            onClick={() => setSection("festival")}
            className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
              section === "festival" ? "border-red-600" : "border-none"
            } `}
          >
            जात्रा पर्व
          </button>
          <button
            onClick={() => setSection("teams")}
            className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
              section === "teams" ? "border-red-600" : "border-none"
            } `}
          >
            कर्मचारी
          </button>
          {isEditing && (
            <>
              <button
                onClick={() => setSection("branch-darbandi")}
                className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
                  section === "branch-darbandi"
                    ? "border-red-600"
                    : "border-none"
                } `}
              >
                दरबन्दी
              </button>
              <button
                onClick={() => setSection("budget-nikasa")}
                className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
                  section === "budget-nikasa" ? "border-red-600" : "border-none"
                } `}
              >
                बजेट निकसा
              </button>
              <button
                onClick={() => setSection("budget-kharcha")}
                className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
                  section === "budget-kharcha"
                    ? "border-red-600"
                    : "border-none"
                } `}
              >
                बजेट खर्च
              </button>
              <button
                onClick={() => setSection("suchi-darta")}
                className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
                  section === "suchi-darta" ? "border-red-600" : "border-none"
                } `}
              >
                सूची दर्ता
              </button>
              <div class="dropdown">
  <button     className={`font-bold border-b-2 hover:border-red-600 transition-all dropdown-toggle duration-200 ease-linear text-white text-base lg:text-xl ${
                  section === "land-detail" ? "border-red-600" : "border-none"
                } `} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
         जग्गाको विवरण
  </button>
  <ul className=" dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <button
                onClick={() => setSection("tainathi")}
                className={`font-semibold border-b-2 text-center ms-2 mt-1 hover:border-red-600 transition-all duration-200 ease-linear text-black text-base  ${
                  section === "tainathi" ? "border-red-600" : "border-none"
                } `}
              >
               तैनाथी
              </button>
              <br/>
              <button
                onClick={() => setSection("raitani")}
                className={`font-semibold border-b-2 ms-2 mt-1 hover:border-red-600 transition-all duration-200 ease-linear text-black text-base  ${
                  section === "raitani" ? "border-red-600" : "border-none"
                } `}
              >
             रैतानी
              </button>
              <br/>
              <button
                onClick={() => setSection("adhinash")}
                className={`font-semibold border-b-2 ms-2 mt-1 hover:border-red-600 transition-all duration-200 ease-linear text-black text-base  ${
                  section === "adhinash" ? "border-red-600" : "border-none"
                } `}
              >
              अधिनस्थ
              </button>
  </ul>
</div>

             
            </>
          )}
        </div>
        <div className="flex items-center justify-center w-full pt-8">
          {section === "article" && (
            <BranchArticles
              articles={loc.state.articles}
              branchName={loc.state.name}
            />
          )}
          {section === "notice" && (
            <BranchNotice
              notices={loc.state.notices}
              branchName={loc.state.name}
            />
          )}
          {section === "festival" && (
            <BranchFestival
              festival={loc.state.festivals}
              branchName={loc.state.name}
            />
          )}
          {section === "teams" && (
            <BranchTeams
              branchName={loc.state.name}
              branchId={loc.state.branchId}
            />
          )}
          {section === "branch-darbandi" && (
            <Darbandi
            // branchName={loc.state.name}
            // branchId={loc.state.branchId}
            />
          )}
          {section === "budget-kharcha" && (
            <BudgetKharcha
            // branchName={loc.state.name}
            // branchId={loc.state.branchId}
            />
          )}
          {section === "budget-nikasa" && (
            <BudgetNikasa
            // branchName={loc.state.name}
            // branchId={loc.state.branchId}
            />
          )}
          {section === "suchi-darta" && (
            <SuchiDarta
            // branchName={loc.state.name}
            // branchId={loc.state.branchId}
            />
          )}
          {section === "land-detail" && (
            <Landdetails
            // branchName={loc.state.name}
            // branchId={loc.state.branchId}
            />
          )}
            {section === "raitani" && (
            <Raitani
            // branchName={loc.state.name}
            // branchId={loc.state.branchId}
            />
          )}
            {section === "tainathi" && (
            <Tainathi
            // branchName={loc.state.name}
            // branchId={loc.state.branchId}
            />
          )}
            {section === "adhinash" && (
            <Adhinash
            // branchName={loc.state.name}
            // branchId={loc.state.branchId}
            />
          )}


        </div>
      </div>
    </div>
  );
};
