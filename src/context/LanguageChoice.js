import { createContext, useContext, useState } from "react";

const languageContext = createContext();
export const LanguageChoice = ({ children }) => {
  const [selectLanguage, setSelectLanguage] = useState("Nepali");
  return (
    <>
      <languageContext.Provider value={{ selectLanguage, setSelectLanguage }}>
        {children}
      </languageContext.Provider>
    </>
  );
};
export const useSelectLanguage = () => useContext(languageContext);
