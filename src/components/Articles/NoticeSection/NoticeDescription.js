import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NoticeDescription = ({ img, name, detail }) => {
    const [isVisible, setIsVisible] = useState(true);
    const isMobile = useMediaQuery('(max-width:800px)');
    const isTablet = useMediaQuery('(min-width:801px) and (max-width:1200px)');

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="flex items-center justify-center">
        <div className="fixed inset-y-[160px] md:inset-x-[80px] z-50 flex items-start justify-center p-4">
            <div className="relative w-full max-w-6xl shadow-lg bg-slate-500/50 rounded-2xl backdrop-blur-md">
                <div className="flex justify-end px-4 py-2">
                    <FontAwesomeIcon
                        icon={faTimes}
                        size="2x"
                        className="text-red-600 cursor-pointer"
                        onClick={handleClose}
                    />
                </div>
                <div className="px-4 py-2 bg-slate-600/40 rounded-t-2xl">
                    <h1 className={`${isMobile ? 'text-[24px]' : isTablet ? 'text-[36px]' : 'text-[50px]'} text-white font-bold text-center`}>
                        {name}
                    </h1>
                </div>
                <div className="flex flex-col p-4 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
                    <div className="flex justify-center lg:w-1/3">
                    <a href={`${img}`}>
                        <img 
                            src={img} 
                            className="object-cover w-full h-full max-w-xs max-h-64 rounded-3xl" 
                            alt={name} 
                        />
                        </a>
                        
                    </div>
                    <div className="flex flex-col lg:w-2/3 text-neutral-200">
                        <p className="font-medium text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
                            {detail}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};
