import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ServiceInstance } from './ServiceInstance';
import { ServiceAddition } from './ServiceAddition';
import { useEditing } from '../../../../context/EditingProvider';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../../AlertLoader';
import { setDynamicServicePageWholeDetail } from '../../../../state/HomePageSlices/ServiceSlice';
import { EditService } from './EditService';
export const Service = () => {
    const serviceDetail=useSelector(state=>state.serviceDetail)
    const {isEditing,setIsEditing}=useEditing()
    const baseUrl=useSelector(state=>state.baseUrl).backend
    const dispatch=useDispatch()
    useEffect(() => {
        if(!serviceDetail.isDynamicFetched) fetchService();
    }, []);

    const fetchService = async () => {
        try {
            const response = await axios.get(baseUrl+serviceDetail.dynamicUrl);
            console.log(response.data)
            dispatch(setDynamicServicePageWholeDetail(response.data))
        } catch (error) {
            showAlert(error,'red')
            console.log(error)
        }
    };

    return (
        <div className="w-full h-full pb-3 flex flex-col relative">
            <h1 className="text-white z-10 text-[60px]">Service</h1>
            <div className="relative flex w-full h-full justify-center overflow-auto">
                <div className=" w-[90%] flex h-fit flex-wrap gap-4 lg:gap-16 items-center justify-center">
                    {serviceDetail.dynamicDetails.map((service,index) => (
                        <ServiceInstance
                            serviceId={service.id}
                            fetchAllService={fetchService}
                            url={service.url}
                            index={index}
                            key={service.id}
                            img={service.image}
                            name={service.name}
                            detail={service.description}
                        />
                    ))}
                    {isEditing&&<ServiceAddition fetchService={fetchService}/>}
                   
                </div>
            </div>
        </div>
    );
};
