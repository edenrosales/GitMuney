import React, {useContext,useState,useEffect} from "react";
import PocketBase from 'pocketbase';
import { ThemeContext } from "react-navigation";
// import PocketBase from 'pocketbasea'

const PBContext = React.createContext() 
const PBUpdateContext = React.createContext() 

export function usePB() { 
    return useContext(PBContext)
}
export function usePBUpdate() { 
    return useContext(PBUpdateContext)
}

export function ThemeProvider({children}) { 
    useEffect(()=>{
        pbUpdate(new PocketBase('https://edenrosales.loca.lt'))
    },[])
//http://10.0.2.2:8090/
//'http://127.0.0.1:8090'
    const [pb,setPb] = useState()
    const pbUpdate = (value) => {
        setPb(()=>{
            return value
        })
    }
    // pbUpdate("this works")
    // console.log(pb)
    return(
        <PBContext.Provider value = {pb}>
            <PBUpdateContext.Provider value = {pbUpdate}>
                {children}
            </PBUpdateContext.Provider>
        </PBContext.Provider>
    )
}