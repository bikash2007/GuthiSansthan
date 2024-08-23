import { useState } from "react";
import { BranchArticles } from "./BranchArticles";
import { BranchFestival } from "./BranchFestival";
import { BranchHeader } from "./BranchHeader";
import { BranchNotice } from "./BranchNotice";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import BranchTeams from "./BranchTeams";

export const EachBranchInfo = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [section, setSection] = useState("article");
  const loc = useLocation();

  return (
    <div className="flex flex-col items-center gap-3">
      <BranchHeader
        branchName={loc.state.name}
        branchImg={loc.state.img}
        branchHead={loc.state.branchHead}
        branchId={loc.state.branchId}
      />
      <div className="w-full">
        <div className="w-full py-4 flex justify-start bg-gray-600/80  gap-8 pl-16 shadow-sm blur-border">
          <button
            onClick={() => setSection("article")}
            className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
              section === "article" ? " border-red-600 " : "border-none"
            } `}
          >
            Article
          </button>
          <button
            onClick={() => setSection("notice")}
            className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
              section === "notice" ? " border-red-600 " : "border-none"
            } `}
          >
            Notices
          </button>
          <button
            onClick={() => setSection("festival")}
            className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
              section === "festival" ? " border-red-600 " : "border-none"
            } `}
          >
            Festivals
          </button>
          <button
            onClick={() => setSection("teams")}
            className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
              section === "teams" ? " border-red-600 " : "border-none"
            } `}
          >
            Teams
          </button>
        </div>
        <div className="w-full flex items-center justify-center">
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
          {section === "teams" && <BranchTeams branchName={loc.state.name} />}
        </div>
      </div>
    </div>
  );
};
