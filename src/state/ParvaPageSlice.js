import { createSlice } from "@reduxjs/toolkit";

export const ParvaPageSlice = createSlice({
  name: "parvaPageSlice",
  initialState: {
    isFetched: false,
    isDynamicFetched: false,
    dynamicUrl: "api/festivals/",
    dynamicDetails: [],
    url: "api/pages/parva-page",
    details: [],
    "bg-img": { isFetched: false, imgSrc: "", id: "", actualImgSrc: "" },
  },
  reducers: {
    setParvaPageWholeDetails: (state, action) => {
      state.details = action.payload;
      state.isFetched = true;

      // Check if details have the required components
      if (action.payload.components && action.payload.components["bg-img"]) {
        const bgImgComponent = action.payload.components["bg-img"];
        state["bg-img"] = {
          isFetched: true,
          imgSrc: bgImgComponent.image,
          id: bgImgComponent.id,
          actualImgSrc: bgImgComponent.image,
        };
      }
    },
    setDynamicParvaPageWholeDetails: (state, action) => {
      state.isDynamicFetched = true;
      state.dynamicDetails = action.payload;
    },
    setBgImg: (state, action) => {
      state["bg-img"] = {
        isFetched: true,
        imgSrc: action.payload,
        id: state.details?.components?.["bg-img"]?.id || "",
        actualImgSrc: action.payload,
      };
    },
    setNewBgImg: (state, action) => {
      if (action.payload) {
        state["bg-img"].imgSrc = action.payload;
      } else {
        state["bg-img"].imgSrc = state["bg-img"].actualImgSrc;
      }
    },
  },
});

export default ParvaPageSlice.reducer;
export const {
  setParvaPageWholeDetails,
  setDynamicParvaPageWholeDetails,
  setBgImg,
  setNewBgImg,
} = ParvaPageSlice.actions;
