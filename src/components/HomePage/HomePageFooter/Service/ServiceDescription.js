import { useMediaQuery } from "@mui/material";
export const ServiceDescription=({img,name,detail})=>{
    const isMobile = useMediaQuery('(max-width:800px)');
    return(
        <>
            <div className="w-full py-2 bg-slate-600/40">
        <h1 className={`${isMobile ? 'text-[30px]' : 'text-[50px]'} text-white font-bold`}>
            {name}
        </h1>
    </div>
    <div className="flex flex-wrap w-full mt-2">
        <div className="w-full lg:w-1/3 flex items-center flex-col h-[30vh]">
            <img src={img} className="max-w-full max-h-full" alt={name} />
        </div>
        <div className="flex flex-col w-full px-2 mt-2 lg:w-2/3">
            <p className="font-medium text-preety text-neutral-200">{detail}</p>
        </div>
    </div>
        </>
    )
}