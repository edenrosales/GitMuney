import React, {useContext,useState,useEffect} from "react";
import { ThemeContext } from "react-navigation";
// import PocketBase from 'pocketbasea'

const FBContext = React.createContext() 
const FBUpdateContext = React.createContext() 

export function usePB() { 
    return useContext(FBContext)
}
export function usePBUpdate() { 
    return useContext(FBUpdateContext)
}

export function ThemeProvider({children}) { 
    // useEffect(()=>{
    //     pbUpdate('')
    // },[])
//http://10.0.2.2:8090/
//'http://127.0.0.1:8090'
    const [fb,setFb] = useState()
    
    const fbUpdate = (value) => {
        setFb(()=>{
            return value
        })
    }
    // pbUpdate("this works")
    // console.log(pb)
    return(
        <FBContext.Provider value = {fb}>
            <FBUpdateContext.Provider value = {fbUpdate}>
                {children}
            </FBUpdateContext.Provider>
        </FBContext.Provider>
    )
}