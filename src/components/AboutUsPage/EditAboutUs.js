import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "../AlertLoader";
import { activate_loader } from "../AlertLoader/LoaderBox";
import { setAboutUsPageWholeDetail } from "../../state/AboutUsPageSlice";

export const EditAboutUs = ({ content, toggleEditMode }) => {
  return <div className="w-full flex flex-col items-center p-4">hi</div>;
};
