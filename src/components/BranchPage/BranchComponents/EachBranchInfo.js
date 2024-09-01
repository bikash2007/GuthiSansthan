import { useState } from "react";
import { BranchArticles } from "./BranchArticles";
import { BranchFestival } from "./BranchFestival";
import { BranchHeader } from "./BranchHeader";
import { BranchNotice } from "./BranchNotice";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import BranchTeams from "../BranchTeams/BranchTeams";
import BranchDarbandi from "./Darbandi/BranchDarbandi";
import BudgetKharcha from "./BudgetKharcha";
import BudgetNikasa from "./BudgetNikasa";
import SuchiDarta from "./SuchiDarta";
import Landdetails from "./LandDetails/Landdetails";
import Darbandi from "./Darbandi/Darbandi";
import { useEditing } from "../../../context/EditingProvider";

export const EachBranchInfo = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [section, setSection] = useState("article");
  const loc = useLocation();
  const { isEditing } = useEditing();
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="absolute top-0 w-full h-20 "></div>
      <BranchHeader
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
              <button
                onClick={() => setSection("land-detail")}
                className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-base lg:text-xl ${
                  section === "land-detail" ? "border-red-600" : "border-none"
                } `}
              >
                जग्गाको विवरण
              </button>
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
        </div>
      </div>
    </div>
  );
};
