import { getPreferences } from "@/services/preferenceService";
import { getProfile } from "@/services/userService";
import { useEffect, useState } from "react"


export const useProfile=()=>{
    const[profile, setProfile]=useState(null);
    const[preferences, setPreferences]=useState(null);
    const[loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const[profileData, preferencesData]= await Promise.all([getProfile(), getPreferences()]);
                setProfile(profileData);
                setPreferences(preferencesData);
            }
            catch(error){
                console.log("Lỗi fetch dữ liệu user: ",error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    },[])

    return {loading, profile,preferences, setPreferences, setProfile};
}
